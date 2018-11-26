/**
 * 前端应用配置
 */

import Utils from './utils'

process.env.NODE_ENV = 'development';

const apiConfig = () => {
    let ret;
    const config = {
        'production': {
            protal: 'https',
            host: 'www.example.com',
            port: 80,
            basePath: '',
            apiLog: true
        },
        'testing': {
            protal: 'https',
            host: 'test.example.com',
            port: 80,
            basePath: '',
            apiLog: false
        },
        'development': {
            protal: 'http',
            host: 'localhost',
            port: 3300,
            basePath: '/',
            apiLog: true
        }
    };
    ret = config[process.env.NODE_ENV];
    if (!ret) ret = config['development'];
    if (Utils.isDebug()) ret.apiLog = true; // 当请求带debug时,强制启动apiLog
    if (ret.apiLog) Utils.logSuccess('API-Config', process.env.NODE_ENV, ret);
    ret.defaultPageSize = 40; // 分页时每页默认页数
    ret.timeout = 5000; // 超时时间(毫秒)
    return ret;
};

export default {
    api: apiConfig()
}