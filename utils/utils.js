/**
 * 这里放一些常用的工具类函数
 */

const _ = require('underscore');
const NodeCache = require('node-cache');
const url = require('locutus/php/url');
const array = require('locutus/php/array');
const strings = require('locutus/php/strings');
const cache = new NodeCache({stdTTL:7200});

module.exports = {

    "parse_url": url.parse_url,         //  http://php.net/manual/zh/function.parse-url.php
    "urlencode": url.urlencode,         //  http://php.net/manual/zh/function.urlencode.php
    "array_merge": array.array_merge,   //  http://php.net/manual/zh/function.array-merge.php
    "explode": strings.explode,         //  http://php.net/manual/zh/function.explode.php
    "trim": strings.trim,               //  http://php.net/manual/zh/function.trim.php

    // https://www.npmjs.com/package/node-cache
    "setCache": cache.set,
    "getCache": cache.get,

    // http://underscorejs.org
    "distinct": _.uniq,
    "clone": _.clone,
}