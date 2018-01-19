/**
 * Node端对于发送请求方法的封装
 * 实现的功能参考并模仿了Chrome的插件Postman
 */


var http = require('http');
var php = require('./php.js');
var log = require('./log.js').getLogger('POST_MAN');
var Q = require('q');

/*
 * 根据初始化时传入的 url 中 query 参数进行初始化
 *
 * @param $url string  请求链接
 */
function initQuery(self, url){
    var meta = php.parse_url(url);
    if ( ! meta.hasOwnProperty('query') ) {
        self.query = {};
        return;
    }
    var temp = {}, kv;
    var arr = php.explode('&', meta['query']);
    for ( key in arr) {
        kv = php.explode('=', arr[key], 2);
        if (kv.length == 2) temp[kv[0]] = kv[1];
    }
    self.query = temp;
}

/* 将 query 参数加载到 url 中 */
function loadQuery(self){
    var query = '', param;
    for ( key in self.query ) {
        param = key + '=' + php.urlencode(self.query[key]);
        query = query + param + '&';
    }
    query = php.trim(query, '&');
    if (query) {
        self.url = self.url + "?" + query
    }
}

module.exports = function(url){

    var self = {
        url: '',
        retry : 0,
        contentType : 'default',
        timeout : 30,
        query : '',
        headers : {}
    };

    var postman = {

        /**
         * 发送 POST 请求
         *
         * @param data array|string|object 需要post的数据
         * @return mixed
         */
        "POST" : function(data){
            return this.send('POST', data);
        },

        /**
         * 发送 GET 请求
         *
         * @return mixed
         */
        "GET" : function(){
            return this.send('GET', {});
        },

        /**
         * 请求发送主方法
         *
         * @param method string 请求方法
         * @param data array|string|object 请求数据
         * @return mixed
         */
        "send" : function send(method, data){

            if (method == 'POST' && self.contentType == 'default')
                this.ContentType('x-www-form-urlencoded');
            else
                this.ContentType(self.contentType);

            loadQuery(self);

            var arr = php.parse_url(self.url),path;
            if (arr.query != undefined) path = arr.path + '?' + arr.query;
                else path = arr.path;

            var opt = {
                host : arr.host,
                port : arr.port,
                path : path,
                headers : self.headers,
                timeout : self.timeout,
                method : method
            };

            var deferred = Q.defer();
            var req = http.request(opt, function (res) {
                log.debug('STATUS:' + res.statusCode);
                log.debug('HEADERS: ' + JSON.stringify(res.headers));

                var str = '';
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    str = str + data;
                });
                res.on('end', function(){
                    try {
                        str = eval('(' + str + ')');
                        log.info(opt.method + ' : ' + opt.path);
                        log.info(str);
                    } catch (e) {
                        //todo 完善记录的错误信息
                        log.error(e.message);
                        str = {
                            data: false,
                            msg: "服务器发生错误",
                            success: false
                        }
                    }
                    deferred.resolve(str);
                });
            });
            req.on('error', function (e) {
                log.debug('problem with request: ' + e.message);
                deferred.reject(e);
            });

            //将POST等的请求内容写入请求body
            if (typeof data == 'object') data = JSON.stringify(data);
            if (typeof data == 'function') data = undefined;
            if ( data != undefined ) req.write(String(data));

            req.end();
            return deferred.promise;
        },

        /**
         * 设置 query 参数(单个)
         *
         * @param key string query的KEY
         * @param value string query的值
         * @param type
         *      'cover':覆盖 , 'extend':扩展
         * @return bool
         */
        "addQuery": function(key, value, type){
            if ( type == undefined ) type = 'cover';
            //todo validate param key and value
            switch(type){
                case 'cover' : self.query[key] = value; break;
                case 'extend' :
                    if ( ! self.query.hasOwnProperty(key) )
                        self.query[key] = value;
                    break;
                default: break;
            }
        },

        /**
         * 设置 query 参数(数组)
         *
         * @param query array 参数数组
         * @param type string
         *      'cover':完全覆盖 , 'merge':合并覆盖, 'extend':扩展
         * @return bool
         */
        "setQuery": function(query, type){
            if ( type == undefined ) type = 'cover';
            //todo validate query's key and value
            switch(type) {
                case 'cover' : self.query = query; break;
                case 'merge' : self.query = php.array_merge(query, self.query); break;
                case 'extend' : self.query = php.array_merge(self.query, query); break;
            }
        },

        /**
         * 设置超时时间
         *
         * @param timeout
         */
        "setTimeout" : function(timeout){
            if ( parseInt(timeout) <=0 ) timeout = 30;
            self.timeout = parseInt(timeout);
        },

        /**
         * 设置请求头参数(数组)
         *
         * @param headers array 参数数组
         * @param type string
         *      'cover':完全覆盖 , 'merge':合并覆盖, 'extend':扩展
         * @return bool
         */
        "setHeader" : function(headers, type){
            if (type == undefined) type = 'cover';
            for ( key in headers) {
                if ( typeof key != 'string' || typeof headers[key] != 'string' )
                    return false;
            }
            switch(type){
                case 'cover' : self.headers = headers; break;
                case 'merge' : self.headers = php.array_merge(headers, self.headers); break;
                case 'extend' : self.headers = php.array_merge(self.headers, headers); break;
                default: break;
            }
        },

        /**
         * 设置请求头(单个)
         *
         * @param key string header的KEY
         * @param value string header的值
         * @param type
         *      'cover':覆盖 , 'extend':扩展
         * @return bool
         */
        "addHeader" : function(key, value, type){
            if ( type == undefined) type = 'cover';
            if (typeof key != 'string' || typeof value != 'string') return false;
            switch (type) {
                case 'cover' : self.headers[key] = value; break;
                case 'extend' :
                    if ( ! self.headers.hasOwnProperty(key) ) {
                        self.headers[key] = value;
                    }
                    break;
                default: break;
            }
        },

        /**
         * 设置 ContentType
         *
         * @param type  ContentType类型 ( raw / x-www-form-urlencoded )
         */
        "setContentType" : function(type){
            self.contentType = type;
        },


        /**
         * 设置 ContentType
         *
         * @param type     ContentType类型 ( raw / x-www-form-urlencoded )
         * @return string   返回设置的 Header 的字符串
         */
        "ContentType" : function(type){
            var header = '';
            switch(type){
                case 'raw' :
                    header = 'text/plain; charset=UTF-8';
                    break;
                case 'x-www-form-urlencoded' :
                    header = 'application/x-www-form-urlencoded; charset=UTF-8';
                    break;
                default:
                    header = 'application/json;charset=UTF-8';
            }
            this.addHeader('Content-Type', header, 'extend');
            return header;
        }
    };

    self.url = php.trim(url);
    initQuery(self, url);

    return postman;
};