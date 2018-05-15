const Request = require('./request.js');
const Util = require('./utils.js');
const log = require('../utils/log').getLogger('WECHAT');

const config = {
    appid: 'wx77a523ecb62d13bb',
    appsecret: '9fe3fa3901a1487e1e0dbe5f13a58b26',
};

module.exports = {

    /**
     * 获取公众号的 AccessToken
     * refer: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183
     *
     * @returns {*}
     */
    getAccessToken(){
        let token = Util.getCache('access_token');
        if (token) return Promise.resolve(token);

        let url = 'https://api.weixin.qq.com/cgi-bin/token';
        let data = {
            grant_type:'client_credential',
            appid: config.appid,
            secret: config.appsecret
        };
        return Request.get(url, data).then((res)=>{
            Util.setCache('access_token', res.access_token, 7140);
            return Promise.resolve(res.access_token)
        });
    },

    /**
     * 获取jsapi_ticket
     *
     * @returns {*}
     */
    getTicket(){
        let ticket = Util.getCache('jsapi_ticket');
        if (ticket) return Promise.resolve(ticket);

        return this.getAccessToken().then((token)=>{
            let url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket';
            let data = {
                access_token: token,
                type: 'jsapi'
            };
            return Request.get(url, data).then((res)=>{
                Util.setCache('jsapi_ticket', res.ticket, 7140);
                return Promise.resolve(res.ticket)
            })
        });
    },

    /**
     * 获取JS-SDK使用权限签名
     */
    getSignature(url){
        return this.getTicket().then((ticket)=>{
            let salt = Math.floor(1000 + Math.random() * 8999);
            let data = {
                jsapi_ticket: ticket,
                noncestr: Util.sha1(ticket + salt),
                timestamp: Math.floor(new Date().getTime() / 1000),
            };

            // 因http_build_query方法会对url进行编码，故单独拿出来加
            let code = Util.http_build_query(data);
            code = code + '&url=' + url;

            // 调整返回的数据结构和内容
            data['signature'] =  Util.sha1(code);
            data['appid'] = config.appid;
            delete data['jsapi_ticket'];

            return Promise.resolve(data);
        });
    },

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
     * @param token
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
    }

};