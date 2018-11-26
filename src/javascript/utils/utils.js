/**
 * 在JS中使用PHP函数
 *
 * http://locutus.io/php/
 */

import parse_url from 'locutus/php/url/parse_url';
import urlencode from 'locutus/php/url/urlencode';
import array_merge from 'locutus/php/array/array_merge';
import explode from 'locutus/php/strings/explode';
import trim from 'locutus/php/strings/trim';

const userAgent = navigator.userAgent;
const localStorage = window.localStorage;
const localStoragePrefix = 'application.frontend.';

export default {
    "parse_url": parse_url,             //  http://php.net/manual/zh/function.parse-url.php
    "urlencode": urlencode,             //  http://php.net/manual/zh/function.urlencode.php
    "array_merge": array_merge,         //  http://php.net/manual/zh/function.array-merge.php
    "explode": explode,                 //  http://php.net/manual/zh/function.explode.php
    "trim": trim,                       //  http://php.net/manual/zh/function.trim.php

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
        isIOS: this.isIPhone || this.isIPad, // 是否为iOS
    },

}