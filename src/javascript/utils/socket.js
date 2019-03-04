// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
import util from 'utils'
import render from 'render'
import config from 'config'
import pako from 'pako'
const BrowserWebSocket = window.WebSocket || window.MozWebSocket;
const wsConfig = config.socket;
let socket;

const dataIDMap = { }; // key: 根据订阅时请求数据生成的hash - value: 对应订阅数据的dataID
const subCache = { }; // key: 根据订阅时请求数据生成的hash - value: 对应的请求数据
const callbackMap = { }; // key: 订阅数据的dataID - value: 一个对象，key为socketID, 值为处理订阅数据的回调函数
const sendPromise = { }; // key: 发送单次 socket req 请求的 uid - value: 处理返回数据回调函数
const renderMap = { }; // key: uid 或 dataID - value: 处理返回数据的 render todo uid 和 dataID 的确会有可能冲突，但可能性很小，暂不处理

/**
 * 准备 WebSocker 连接，设置错误处理函数
 * @param errorHandler
 * @returns {Promise<any>}
 */
function getReady(errorHandler = () => {}) {
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
    if (socket && socket.readyState === 1) {
      resolve(true);
    }
    // 如果状态为连接中，则每500毫秒再试一次
    if (socket && socket.readyState === 0) {
      util.wait(500).then(() => {
        return getReady(errorHandler)
      }).then(() => {
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    }
    // 如果状态为未连接或已断开，则重新连接
    if (!socket || socket.readyState === 3 || socket.readyState === 2) {
      socket = new BrowserWebSocket(wsConfig.protal + '://' + wsConfig.host + wsConfig.basePath);
    }
    socket.binaryType = 'arraybuffer';
    socket.onopen = (event) => {
      util.logSuccess('WebSocket', 'Connection Open');
      resolve(event)
    };
    socket.onclose = (event) => {
      util.logSuccess('WebSocket', 'Connection Close');
      return getReady().then(() => {
        // 对断线前缓存的订阅请求进行重新订阅
        const keys = Object.keys(subCache);
        if (!keys) return;
        keys.map(item => {
          subCache[item]['id'] = util.uniqid();
          subCache[item]['reqType'] = 'sub';
          socket.send(JSON.stringify(subCache[item]));
          util.logSuccess('Reconnecting', subCache[item]['api'], subCache[item]);
        });
      });
    };
    socket.onmessage = (event) => onMessage(event, errorHandler);
    socket.onerror = function(error) {
      util.logError('WS:ERROR', 'Connection Error', error);
      errorHandler(error);
      reject(error)
    };
  })
}

/**
 * 数据预处理
 * @param event
 * @param errorHandler
 */
function onMessage(event, errorHandler) {

    // 尝试对Gzip数据进行解析
    let decodeData;
    try {
        decodeData = pako.inflate(event.data, { to: 'string'} )
    } catch (e) {
        decodeData = event.data;
    }

  const data = JSON.parse(decodeData);
  const id = data.id;
  const dataID = data.dataId;
  const apiKey = data.api;
  const error = data.code && data.code !== 0;

  // 检查sendPromise是否有登记对应的回调函数，如有则将数据交给Promise，并删除映射
  if (sendPromise[id]) {
    try {
      const promise = sendPromise[id];
      const render = renderMap[id];
      if (promise && error) {
        promise.reject(error);
      } else if (promise) {
        let renderData = render(data.data);
        if (!renderData) renderData = {};
        renderData['dataId'] = dataID;
        promise.resolve(renderData);
        util.logSuccess('⬇', id, renderData);
      }
      delete sendPromise[id];
      delete renderMap[id];
    } catch (e) {
      // socket请求返回的数据出现未知问题，则放弃该次返回的处理
      util.logError('Abandon', id, data)
    }
  }

  // 检查是否有订阅的回调函数，如有则将数据依次传给登记的函数
  if (dataID !== 0 && callbackMap[dataID] && Object.keys(callbackMap[dataID]).length >= 1) {
    try {
      const render = renderMap[dataID];
      const renderData = render(data);
      const callbackList = callbackMap[dataID];
      for (let socketID in callbackList) {
        const callback = callbackList[socketID];
        callback(renderData);
      }
      util.logSuccess('⬇', apiKey, renderData)
    } catch (e) {
      // 如果订阅回来的数据出了问题，则放弃该次返回的处理
      util.logError('Abandon', apiKey, data);
    }
  }

  // 响应服务器Ping
  if (data.ping) {
    checkHeartBeat(data.ping, data.time);
    util.logSuccess('⬇', 'Server Ping', data)
  }

  // 日志数据及打印
  if (error) {
    util.logError('⬇', id, data.msg);
    errorHandler(data.msg);
  }
}

/**
 * 心跳检测(维持socket连接)
 */
function checkHeartBeat(uid = null, timeStr = null) {
  if (uid && timeStr) {
    const data = {pong: uid, time: timeStr};
    socket.send(JSON.stringify(data));
    util.logSuccess('⬆', 'Client Pong', data)
  } else {
    const stamp = new Date().getTime() / 1000;
    const timeStr = util.date('Y-m-dTH:i:s.000+0800', stamp);
    const uid = util.uniqid();
    const data = {ping: uid, time: timeStr};
    socket.send(JSON.stringify(data));
    util.logSuccess('⬆', 'Client Ping', data)
  }
}

export default class {
  constructor() {
    this.socketID = util.uniqid();
    // socket 错误处理
    this.wsErrorHandler = () => { };
  }

  /**
   * 发送订阅请求
   * @param req
   * @param func 事件处理函数
   */
  wsSubscribe(req, func) {
    const data = req.data;
    const dataRender = req.render;
    const hash = JSON.stringify(data);
    const dataID = dataIDMap[hash];
    const key = data['api'];
    if (!dataID) {
      // 执行订阅
      const uid = util.uniqid();
      data['id'] = uid;
      data['reqType'] = 'sub';
      socket.send(JSON.stringify(data));
      logSuccess('Subscribe(1)', key, data);
      new Promise((resolve, reject) => {
        sendPromise[uid] = {resolve, reject}
        renderMap[uid] = render._default;
      }).then(res => {
        const dataID = res.dataId;
        renderMap[dataID] = dataRender;
        dataIDMap[hash] = dataID;
        subCache[hash] = req.data; // 缓存当前订阅的请求数据，用于断线重连
        callbackMap[dataID] = Object.assign({}, callbackMap[dataID]);
        callbackMap[dataID][this.socketID] = func;
      });
    } else {
      callbackMap[dataID][this.socketID] = func;
      const length = Object.keys(callbackMap[dataID]).length;
      logSuccess('Subscribe(' + length + ')', key, data);
    }
  }

  /**
   * 发送取消订阅请求
   * @param req
   * @returns {Promise<any>}
   */
  wsUnSubscribe(req) {
    const data = req.data;
    const hash = JSON.stringify(data);
    const dataID = dataIDMap[hash];
    const key = data['api'];
    const callbackList = callbackMap[dataID] || {};
    delete callbackList[this.socketID];
    const length = Object.keys(callbackList).length;
    logSuccess('unSubscribe(' + length + ')', key, data);
    if (length === 0) {
      delete dataIDMap[hash];
      delete subCache[hash];
      const uid = util.uniqid();
      data['id'] = uid;
      data['reqType'] = 'unsub';
      socket.send(JSON.stringify(data));
      return new Promise((resolve, reject) => {
        sendPromise[uid] = {resolve, reject};
        renderMap[uid] = render._default;
      });
    }
  }

  /**
   * 发送单次请求
   * @param req
   * @returns {Promise<any>}
   */
  wsSend(req) {
    const data = req.data;
    const render = req.render;
    const uid = util.uniqid();
    data['id'] = uid;
    data['reqType'] = 'req';
    socket.send(JSON.stringify(data));
    renderMap[uid] = render;
    logSuccess('⬆', uid, data);
    return new Promise((resolve, reject) => {
      sendPromise[uid] = {resolve, reject};
    });
  }

  getApi() {
    getReady();
    return {
      getReady: getReady,
      kline: {
        subscribe: (data, func) => {
          getReady().then(() => {
            this.wsSubscribe({
              render: render.contract.kline,
              data: {
                api: 'api/market/v1/kline',
                period: data.period,
                coinId: data.coinId,
                valuationCoinId: data.valuationCoinId,
                exchangeId: wsConfig.exchangeId
              }
            }, func)
          })
        },
        unsubscribe: (data) => {
          return getReady().then(() => {
            return this.wsUnSubscribe({
              render: render._default,
              data: {
                api: 'api/market/v1/kline',
                period: data.period,
                coinId: data.coinId,
                valuationCoinId: data.valuationCoinId,
                exchangeId: wsConfig.exchangeId
              }
            })
          })
        },
        send: (data) => {
          return getReady().then(() => {
            return this.wsSend({
              render: render.contract.kline,
              data: {
                api: 'api/market/v1/kline',
                period: data.period,
                coinId: data.coinId,
                valuationCoinId: data.valuationCoinId,
                exchangeId: wsConfig.exchangeId,
                pagingSize: data.pageSize || 1000
              }
            })
          })
        }
      },
      ticker: {
        send: (data) => {
          return getReady().then(() => {
            return this.wsSend({
              render: render.market.ticker,
              data: {
                api: 'api/market/v1/kline/merged',
                coinId: data.coinId,
                valuationCoinId: data.valuationCoinId,
                exchangeId: wsConfig.exchangeId
              }
            })
          })
        }
      },
      price: {
        send: (data) => {
          return getReady().then(() => {
            return this.wsSend({
              render: render.market.price,
              data: {
                api: 'api/market/v1/latest/prices',
                quotationCoinIds: data.quotationCoinIds,
                exchangeId: wsConfig.exchangeId
              }
            })
          })
        }
      }
    }
  }
}
