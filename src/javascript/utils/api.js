/**
 * 对接 Node 端 API 接口
 */

import $ from 'jquery';

// API接口配置信息
const config = {
    'base_url': '/api',
    'api': {
        'test': '/index'
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
            success:(res) =>{ resolve(res)},
            error: (res) =>{ reject(res)}
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
    }

}