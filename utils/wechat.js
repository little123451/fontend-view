const Request = require('./request.js');
const Utils = require('./utils.js');
const log = require('../utils/log').getLogger('Util-WeChat');
const API = require('co-wechat-api');

const config = {
    appid: 'wx77a523ecb62d13bb',
    appsecret: '9fe3fa3901a1487e1e0dbe5f13a58b26',
    token: '',
    encodingAESKey: ''
};

/**
 * 初始化 co-wechat-api
 */
const api = new API(config.appid, config.appsecret, () => {
    // getToken
    return Utils.getCache('access_token');
}, (token) => {
    // saveToken
    Utils.setCache('access_token', token, 7140);
});

api.registerTicketHandle((type) => {
    // getTicket
    return Utils.getCache(type + '_ticket');
},(type, ticket) => {
    // saveTicket
    Utils.setCache(type + '_ticket', ticket, 7140);
});

api.setOpts({timeout: 15000});

module.exports = {

    config : config,

    /**
     * 获取网页授权 access_token
     * @param code
     * @returns {*}
     */
    getWebAccessToken(code){
        let url = 'https://api.weixin.qq.com/sns/oauth2/access_token';
        let data = {
            appid: config.appid,
            secret: config.appsecret,
            code: code,
            grant_type: 'authorization_code'
        };
        return Request.get(url, data)
    },

    /**
     * 获取用户信息
     *
     * @param token 用户登录凭证
     * @param openID
     * @returns {*}
     */
    getUserInfo(token, openID){
        let url = 'https://api.weixin.qq.com/sns/userinfo';
        let data = {
            access_token: token,
            openid: openID,
            lang: 'zh_CN'
        };
        return Request.get(url, data)
    },

    /**
     * 解码卡券 code
     * @param encrypt_code
     * @returns {*}
     */
    decryptCardCode(encrypt_code){
        let token = Utils.getCache('access_token').accessToken;
        let url = 'https://api.weixin.qq.com/card/code/decrypt?access_token='+token;
        let data = {encrypt_code: encrypt_code};
        return Request.post(url, data)
    },

    /**
     * 获取微信服务器IP地址
     * 用于测试 co-wechat-api 接口
     *
     * @returns {Promise}
     */
    getIP(){return api.getIp()},

    /**
     * 获取JS-SDK使用权限签名
     */
    getSignature(url){ return api.getJsConfig({url:url}) },

    /**
     * 获取卡券配置信息 cardExt
     *
     * @param cardID
     * @param code
     * @param openID
     */
    getCardSignature(cardID = '', code = '', openID = ''){
        let balance = Math.random().toString(36).substr(2, 15);
        return api.getCardExt({
            card_id: cardID,
            code: code,
            openid: openID,
            balance: balance
        }).then(res => {
            res.nonceStr = res.balance;
            delete res.balance;
            return Promise.resolve(res);
        })
    }

};