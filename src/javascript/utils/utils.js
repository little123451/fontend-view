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

export default {
    "parse_url": parse_url,             //  http://php.net/manual/zh/function.parse-url.php
    "urlencode": urlencode,             //  http://php.net/manual/zh/function.urlencode.php
    "array_merge": array_merge,         //  http://php.net/manual/zh/function.array-merge.php
    "explode": explode,                 //  http://php.net/manual/zh/function.explode.php
    "trim": trim,                       //  http://php.net/manual/zh/function.trim.php

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
        if (name == '') return data;
        else if (data[name]) return data[name];
        else return _default;
    }

}