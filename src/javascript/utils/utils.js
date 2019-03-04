/**
 * 在JS中使用PHP函数
 *
 * http://locutus.io/php/
 */

// http://locutus.io/php/
import date from 'locutus/php/datetime/date'
import trim from 'locutus/php/strings/trim'
import parseUrl from 'locutus/php/url/parse_url'
import parseStr from 'locutus/php/strings/parse_str'
import http_build_query from 'locutus/php/url/http_build_query'
import urlencode from 'locutus/php/url/urlencode'
import urldecode from 'locutus/php/url/urldecode'
import uniqid from 'locutus/php/misc/uniqid'
import array_merge from 'locutus/php/array/array_merge';
import explode from 'locutus/php/strings/explode';

const userAgent = window.navigator.userAgent;
const localStorage = window.localStorage;
const localStoragePrefix = 'application.frontend.';

export default {
    date: date, // http://locutus.io/php/datetime/date/index.html
    trim: trim, // http://locutus.io/php/strings/trim/index.html
    parse_url: parseUrl, // http://locutus.io/php/url/parse_url/index.html
    parse_str: parseStr, // http://locutus.io/php/strings/parse_str/index.html
    http_build_query: http_build_query, // http://locutus.io/php/url/http_build_query/index.html
    urlencode: urlencode, // http://locutus.io/php/url/urldecode/index.html
    urldecode: urldecode, // http://locutus.io/php/url/urlencode/index.html
    array_merge: array_merge,// http://php.net/manual/zh/function.array-merge.php
    uniqid: uniqid, // http://locutus.io/php/misc/uniqid/index.html
    explode: explode, // http://php.net/manual/zh/function.explode.php

    /**
     * 成功log
     *
     * @param key
     * @param text
     * @param data
     */
    logSuccess(key, text, data) {
        console.log(`%c ${key} %c ${text} %c`,
            'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent', data)
    },

    /**
     * 错误log
     *
     * @param key
     * @param text
     * @param data
     */
    logError(key, text, data) {
        console.log(`%c ${key} %c ${text} %c`,
            'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#d76156 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
            'background:transparent', data)
    },

    /**
     * 获取URL参数
     *
     * @param name
     * @param _default
     * @returns {*}
     */
    getUrlParam(name = '', _default = null){
        let query = trim(window.location.search, '?').split('&');
        let reg = new RegExp('(.*)=(.*)'), match, data = {};
        query.map((item) => {
            match = reg.exec(item);
            if (match) data[match[1]] = match[2];
        });
        if (name === '') return data;
        else if (data[name]) return data[name];
        else return _default;
    },

    /**
     * 判断URL中是否带DEBUG(是否开启DEBUG)
     * @returns {*}
     */
    isDebug: () => {
        let query = {};
        let search = location.search || '';
        parseStr(search, query);
        return query.debug;
    },

    // localStorage的封装
    store: {

        /**
         * 设置 storage
         * @param key
         * @param value
         */
        set(key, value) {
            const storeKey = localStoragePrefix + key;
            localStorage.setItem(storeKey, value);
        },

        /**
         * 根据 key 获取对应的 storage 值
         * @param key
         * @param _default
         * @returns {*}
         */
        get(key, _default = undefined) {
            const storeKey = localStoragePrefix + key;
            const value = localStorage.getItem(storeKey);
            if (value === null) return _default;
            return value
        },

        /**
         * 根据 Key 删除对应的 storage
         * @param key
         */
        del(key) {
            const storeKey = localStoragePrefix + key;
            localStorage.removeItem(storeKey);
        },

        /**
         * 清空当前应用设置的 storage
         */
        clear() {
            const regx = new RegExp('^' + localStoragePrefix);
            const delKey = [];
            for (let i = 0; i < localStorage.length; i++) {
                const storeKey = localStorage.key(i);
                if (regx.test(storeKey)) delKey.push(storeKey);
            }
            delKey.map(item => localStorage.removeItem(item))
        }

    },

    // 正则校验
    valid: {

        /**
         * 校验手机号码
         * @param phone
         * @returns {boolean}
         */
        phone(phone) {
            return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone);
        },

        /**
         * 校验邮箱地址
         * @param address
         * @returns {boolean}
         */
        mail(address) {
            return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$ /.test(address);
        }

    },

    // 用户客户端类型判断
    userAgent: {
        isAndroid: userAgent.indexOf('Android') > -1,
        isIPhone: userAgent.indexOf('iPhone') > -1, // 是否为iPhone
        isIPad: userAgent.indexOf('iPad') > -1, // 是否为iPad
        isIOS: userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1, // 是否为iOS
    },

    /**
     * 等待
     * @param millionSeconds
     * @returns {Promise<any>}
     */
    wait: (millionSeconds = 3000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, millionSeconds)
        })
    }

}