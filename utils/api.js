/**
 * Node端链接PHP端interface的API接口封装
 */


let postman = require('./postman.js');

let config = {
    'host' : 'api.lierenio.com',
    'port' : 80,
    'base_url' : '/interface/index.php/',
    'api_map' : {
        'test' : 'api/example/test'
    }
};

let map = config.api_map;

/**
 * 根据apiKey从api_map中选择接口构造链接
 *
 * @param api
 * @returns {string}
 */
function createUrl(api){
    return'http://' + config.host + ":" + config.port + config.base_url + api;
}

let api = {

    /**
     * 测试接口
     *
     * @returns {*}
     */
    "test" : function(){
        let url = createUrl(map.test);
        let req = new postman(url);
        return req.GET()
    }

};

module.exports = api;