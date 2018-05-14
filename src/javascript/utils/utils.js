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
    "trim": trim                        //  http://php.net/manual/zh/function.trim.php
}