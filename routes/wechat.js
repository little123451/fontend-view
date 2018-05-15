const express = require('express');
const router = express.Router();
const WeChat = require('../utils/wechat');
const Utils = require('../utils/utils');
const log = require('../utils/log').getLogger('API-WeChat');

/* 获取JS-SDK权限验证配置 */
router.get('/signature', (req, res, next) => {
    let url = req.query.url;
    if (!url) res.send(Utils.buildResp(null, '缺少参数url', false));
    url = Utils.urldecode(url);
    WeChat.getSignature(url).then((data)=>{
        res.send(Utils.buildResp(data));
    });
});

/* 获取网页授权调用凭证 */
router.get('/webToken', (req, res, next) =>{
    let code = req.query.code;
    if (!code) return res.send(Utils.buildResp(null, '缺少参数code', false));
    WeChat.getWebAccessToken(code).then((data)=>{
        if (!data.errcode) return res.send(Utils.buildResp(data));
            else return res.send(Utils.buildResp(null, data.errmsg, false))
    });
});

/* 获取用户信息 */
router.get('/userInfo', (req, res, next) =>{
    let token = req.query.token;
    let openid = req.query.openid;
    if (!token) return res.send(Utils.buildResp(null, '缺少参数token', false));
    if (!openid) return res.send(Utils.buildResp(null, '缺少参数openid', false));
    WeChat.getUserInfo(token,openid).then((data) => {
        return res.send(Utils.buildResp(data))
    });
});

module.exports = router;