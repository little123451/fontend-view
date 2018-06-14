/**
 * 对接 Node 端 API 接口
 */

import $ from 'jquery';
import Utils from './utils';

// API接口配置信息
const config = {
    'base_url': '/',
    'api': {
        'test': 'api/index',
        'wechat': {
            'signature': 'wechat/signature',
            'cardSignature': 'wechat/cardSignature',
            'webToken': 'wechat/webToken',
            'userInfo': 'wechat/userInfo',
            'decryptCode': 'wechat/decryptCode',
        }
    }
};

/**
 * 发送请求到 node 端
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise}
 */
const send = (url, method, data) => {
    method = method.toUpperCase();
    return new Promise((resolve, reject) => {
        let obj = {
            url: config.base_url + url,
            type: method,
            data: data,
            dataType: 'json',
            success:(res) =>{
                if (res.success) resolve(res.data);
                    else reject(res.message);
            },
            error: (res) =>{
                reject(res)
            }
        };

        if (method == 'POST') {
            $.extend(obj,{
                contentType:'application/json',
                processData: false,
                data: JSON.stringify(data)
            })
        }

        $.ajax(obj);
    });
};

export default {

    test(){
        let url = config.api.test;
        let method = 'GET';
        let data = {
            hello: 'world'
        };
        return send(url, method, data);
    },

    wechat: {

        appid: 'wx77a523ecb62d13bb',

        /**
         * 获取JS-SDK权限验证配置
         *
         * @returns {Promise}
         */
        signature(apiList){
            let url = config.api.wechat.signature;
            let method = 'GET';
            let data = { url: window.location.href };
            return send(url, method, data).then((res)=>{
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
            let url = config.api.wechat.cardSignature;
            let method = 'GET';
            let data = {cardID: cardID, code: code, openID: openID};
            return send(url, method, data)
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

            let url = config.api.wechat.webToken;
            let method = 'GET';
            let data = { code: code };

            return send(url, method, data).then((token)=>{
                sessionStorage.setItem('token',  JSON.stringify(token));
                return Promise.resolve(token);
            }).catch((err) => {
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
            let query = '';
            for(let key in data){query += key + '=' + data[key] + '&'}
            query = Utils.trim(query,'&');
            url = url + '?' + query;
            window.location = url;
        },

        /**
         * 获取用户信息
         *
         * @returns {Promise.<TResult>}
         */
        userinfo(){
            return this.webToken().then((res) =>{
                let url = config.api.wechat.userInfo;
                let method = 'GET';
                let data = {
                    token: res.access_token,
                    openid: res.openid
                };
                return send(url, method, data);
            })
        },

        decryptCode(encryptCode){
            let url = config.api.wechat.decryptCode;
            let method = 'POST';
            let data = {encrypt: encryptCode};
            return send(url, method, data);
        },

    }

}