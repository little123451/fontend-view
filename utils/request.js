const Request = require('request');

/**
 * 请求主方法
 *
 * @param url
 * @param method
 * @param option
 * @returns {Promise}
 */
send = (url, method, option) => {
    method = method.toUpperCase();
    return new Promise((resolve, reject) =>{
        option['method'] = method;
        option['url'] = url;
        Request(option,(err, res, body) => {
            if (err)
                reject(err);
            else
                resolve(body, res);
        })
    });
};

module.exports = {

    /**
     * GET请求方法
     *
     * @param url
     * @param data
     * @returns {*}
     */
    get(url, data){
        let option = {
            qs: data,
            json: true
        };
        return send(url, 'GET', option)
    },

    /**
     * POST请求方法
     *
     * @param url
     * @param data
     * @returns {*}
     */
    post(url, data){
        let option = {
            body: data,
            json: true
        };
        return send(url, 'POST', option)
    }

};