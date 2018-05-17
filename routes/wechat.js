const express = require('express');
const router = express.Router();
const WeChatAPI = require('../utils/wechat');
const Utils = require('../utils/utils');
const WeChatRouteHandler = require('wechat');

const log = require('../utils/log').getLogger('Routes-WeChat');
const config = WeChatAPI.config;

/* 样例首页 */
router.get('/index', (req, res, next) => {
    log.info("首页被访问 - 来自log4js的DEBUG信息");
    res.render('wechat',{});
});

/* 获取JS-SDK权限验证配置 */
router.get('/signature', (req, res, next) => {
    let url = req.query.url;
    if (!url) res.send(Utils.buildResp(null, '缺少参数url', false));
    url = Utils.urldecode(url);
    WeChatAPI.getSignature(url).then((data)=>{
        res.send(Utils.buildResp(data));
    }).catch(err => {
        res.send(Utils.buildResp(null, JSON.stringify(err), false));
    });
});

/* 获取卡券配置信息 */
router.get('/cardSignature', (req, res, next) => {
    let cardID = req.query.cardID || '';
    let code = req.query.code || '';
    let openID = req.query.openID || '';
    WeChatAPI.getCardSignature(cardID, code, openID).then(data =>{
        res.send(Utils.buildResp(data));
    }).catch(err => {
        res.send(Utils.buildResp(null, JSON.stringify(err), false));
    });
});

/* 对卡券的加密code进行解码 */
router.post('/decryptCode', (req, res, next) => {
    let encryptCode = req.query.encrypt;
    WeChatAPI.decryptCardCode(encryptCode).then(data =>{
        res.send(Utils.buildResp(data))
    }).catch(err => {
        res.send(Utils.buildResp(null, JSON.stringify(err), false));
    });
});

/* 获取网页授权调用凭证 */
router.get('/webToken', (req, res, next) =>{
    let code = req.query.code;
    if (!code) return res.send(Utils.buildResp(null, '缺少参数code', false));
    WeChatAPI.getWebAccessToken(code).then((data)=>{
        if (!data.errcode) return res.send(Utils.buildResp(data));
            else return res.send(Utils.buildResp(null, data.errmsg, false))
    }).catch(err => {
        res.send(Utils.buildResp(null, JSON.stringify(err), false));
    });
});

/* 获取用户信息 */
router.get('/userInfo', (req, res, next) =>{
    let token = req.query.token;
    let openid = req.query.openid;
    if (!token) return res.send(Utils.buildResp(null, '缺少参数token', false));
    if (!openid) return res.send(Utils.buildResp(null, '缺少参数openid', false));
    WeChatAPI.getUserInfo(token,openid).then((data) => {
        return res.send(Utils.buildResp(data))
    }).catch(err => {
        res.send(Utils.buildResp(null, JSON.stringify(err), false));
    });
});

/* 消息对话 */
router.post(
    '/server',
    WeChatRouteHandler({
        token: config.token,
        appid: config.appid,
        encodingAESKey: config.encodingAESKey,
        checkSignature: false
    },(req, res, next) =>{
        let message = req.weixin;
        log.info(message);
        res.reply('Hello world!');
    })
);

router.get('/test', (req, res, next) => {
    res.send('Hello World!');
});

module.exports = router;