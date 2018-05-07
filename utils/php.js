/**
 * 在JS中使用PHP函数
 *
 * http://locutus.io/php/
 */


let url = require('locutus/php/url');
let array = require('locutus/php/array');
let strings = require('locutus/php/strings');

let php = {
    "parse_url": url.parse_url,         //  http://php.net/manual/zh/function.parse-url.php
    "urlencode": url.urlencode,         //  http://php.net/manual/zh/function.urlencode.php
    "array_merge": array.array_merge,   //  http://php.net/manual/zh/function.array-merge.php
    "explode": strings.explode,         //  http://php.net/manual/zh/function.explode.php
    "trim": strings.trim                //  http://php.net/manual/zh/function.trim.php
};

module.exports = php;