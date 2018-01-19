/**
 * 日志记录类
 * 使用方法：
 *      var log = require('../utils/log').getLogger('日志记录器名称');
 *
 * https://github.com/nomiddlename/log4js-node/wiki
 */


var log4js = require('log4js');
var __load = {};

log4js.configure({
    "appenders": [
        { type: "console" },
        {
            type: "dateFile", //用文件保存日志内容
            filename: 'logs/log', //生成的日志文件名前缀
            pattern: "-yyyy-MM-dd", //生成的日志文件名后缀格式
            alwaysIncludePattern: false,
            usefsync: true //相当于dateFileSync
        }
    ]
});

exports.getLogger = function(name){

    //如果已经加载过,则直接返回
    if (__load.hasOwnProperty(name)) return __load[name];

    var dateFileLog = log4js.getLogger(name);
    dateFileLog.setLevel(log4js.levels.INFO);

    //在内存中缓存logger
    __load[name] = dateFileLog;

    return dateFileLog

};