/**
 * 对接 Node 端 API 接口
 */

import axios from 'axios';
import Utils from './utils';
import Render from './render';
import Config from './config';
import JSONBig from 'json-bigint';

// API接口配置信息
const config = Config.api;
const apiMap = {
    'test': 'api/index',
    'wechat': {
        'signature': 'wechat/signature',
        'cardSignature': 'wechat/cardSignature',
        'webToken': 'wechat/webToken',
        'userInfo': 'wechat/userInfo',
        'decryptCode': 'wechat/decryptCode',
    }
};

/**
 * axios 请求实例
 * @type {AxiosInstance}
 */
let axiosInstance = axios.create({
    timeout: config.timeout,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
    transformResponse: [
        (data) => { return JSONBig({'storeAsString': true}).parse(data) }
    ]
});

/**
 * 构造请求URL
 * @param api
 * @returns {string}
 */
const createUrl = (api) => {
    const port = !config.port || Number(config.port) === 80 ? '' : ':' + config.port;
    return config.protal + '://' + config.host + port + config.basePath + api
};

/**
 * 发送请求主方法
 * 请求预处理和返回结果预处理
 * @param obj
 * @returns {Promise<T>}
 */
const request = (obj) => {
    const map = obj.url;
    const render = obj.render ? obj.render : Render._default;
    obj.url = createUrl(obj.url);
    delete obj.render;
    return axiosInstance.request(obj).catch(err => {
        Utils.logError('请求失败', err, obj);
        return Promise.reject(err)
    }).then(res => {
        const method = obj.method;
        if (res.data.success) {
            const ret = render(res.data.data);
            Utils.logSuccess(method, map, ret);
            return Promise.resolve(ret);
        } else {
            Utils.logError(method, map, res.data.message);
            return Promise.reject(res.data.message)
        }
    }).catch(err => {
        return Promise.reject(err)
    })
};

export default {

    test(){
        return request({
            method: 'GET',
            url: apiMap.test,
            render: Render._default,
            params: {
                hello: 'world'
            },
            data: {}
        });
    },

    wechat: {

        appid: 'wx77a523ecb62d13bb',

        /**
         * 获取JS-SDK权限验证配置
         *
         * @returns {Promise}
         */
        signature(apiList){
            return request({
                method: 'GET',
                url: apiMap.wechat.signature,
                render: Render._default,
                params: {
                    url: window.location.href
                },
                data: {}
            }).then(res => {
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名
                    jsApiList: apiList // 必填，需要使用的JS接口列表
                });
            });
        },

        /**
         * 获取卡券配置信息
         *
         * @returns {Promise}
         */
        cardSignature(cardID = '', code = '', openID = ''){
            return request({
                method: 'GET',
                url: apiMap.wechat.cardSignature,
                render: Render._default,
                params: { cardID, code, openID },
                data: {}
            })
        },

        /**
         * 获取网页授权access_token
         *
         * @returns {Promise}
         */
        webToken() {
            // 如果缓存中有 token 则使用缓存的 token
            let token = sessionStorage.getItem('token');
            token = JSON.parse(token);
            if (token) return Promise.resolve(token);

            // 缓存没有 token 则获取 code 请求 webToken接口
            let self = this, code = Utils.getUrlParam('code');
            if (!code) return self.redirect();

            return request({
                method: 'GET',
                url: apiMap.wechat.webToken,
                render: Render._default,
                params: { code },
                data: {}
            }).then(token => {
                sessionStorage.setItem('token',  JSON.stringify(token));
                return Promise.resolve(token);
            }).catch(err => {
                console.error(err);
                self.redirect();
            });
        },

        /**
         * 跳转至授权页面同意授权
         */
        redirect(){
            let url = "https://open.weixin.qq.com/connect/oauth2/authorize";
            let data = {
                'appid': this.appid,
                'redirect_uri': Utils.urlencode(window.location.href),
                'response_type': 'code',
                'scope': 'snsapi_userinfo',
                'connect_redirect': '1#wechat_redirect'
            };
            let query = Utils.http_build_query(data);
            url = url + '?' + query;
            window.location = url;
        },

        /**
         * 获取用户信息
         *
         * @returns {Promise.<TResult>}
         */
        userinfo(){
            return this.webToken().then(res =>{
                return request({
                    method: 'GET',
                    url: apiMap.wechat.userInfo,
                    render: Render._default,
                    params: {
                        token: res.access_token,
                        openid: res.openid
                    },
                    data: { }
                });
            })
        },

        /**
         * 解析 code 中带的信息
         * @param encryptCode
         * @returns {Promise<T>}
         */
        decryptCode(encryptCode){
            return request({
                method: 'POST',
                url: apiMap.wechat.decryptCode,
                render: Render._default,
                params: { },
                data: {
                    encrypt: encryptCode
                }
            })
        },

    }

}