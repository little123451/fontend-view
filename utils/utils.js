/**
 * 这里放一些常用的工具类函数
 */

const _ = require('lodash');
const NodeCache = require('node-cache');
const url = require('locutus/php/url');
const array = require('locutus/php/array');
const strings = require('locutus/php/strings');
const cache = new NodeCache({stdTTL:7200});

module.exports = {

    "parse_url": url.parse_url,                        //  http://php.net/manual/zh/function.parse-url.php
    "http_build_query": url.http_build_query ,         //  http://php.net/manual/zh/function.http-build-query.php
    "urlencode": url.urlencode,                        //  http://php.net/manual/zh/function.urlencode.php
    "urldecode": url.urldecode,
    "array_merge": array.array_merge,                  //  http://php.net/manual/zh/function.array-merge.php
    "explode": strings.explode,                        //  http://php.net/manual/zh/function.explode.php
    "trim": strings.trim,                              //  http://php.net/manual/zh/function.trim.php
    "sha1": strings.sha1,                              //  http://php.net/manual/zh/function.sha1.php

    // https://www.npmjs.com/package/node-cache
    "setCache": cache.set,
    "getCache": cache.get,

    // https://www.lodashjs.com/
    "distinct": _.uniq,
    "clone": _.clone,

    /**
     * 构造返回格式
     *
     * @param data
     * @param msg
     * @param success
     */
    "buildResp"(data, msg = '', success = true){
        let ret = {
            data: data,
            message: msg,
            success: success
        };
        ret = JSON.stringify(ret);
        return ret;
    }

};