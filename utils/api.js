/**
 * Node端链接后端的API接口封装
 */


const Request = require('./request.js');

const config = {
    'host' : 'api.lierenio.com',
    'port' : 80,
    'base_url' : '/interface/index.php/',
    'api_map' : {
        'test' : 'api/example/test'
    }
};

const map = config.api_map;

/**
 * 根据apiKey从api_map中选择接口构造链接
 *
 * @param api
 * @returns {string}
 */
createUrl = (api) => {
    const port = config.port === 80 || !isNumeric(config.port) ? '' : ':' + config.port
    return'http://' + config.host + port + config.base_url + api;
};

module.exports = {

    /**
     * 测试接口
     *
     * @returns {*}
     */
    test() {
        let url = createUrl(map.test);
        return Request.get(url, {})
    }

};