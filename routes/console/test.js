/**
 * 这个页面是方便开发者查看后台传过来的数据以及自己修改后的数据的
 * 不能给客户或其他人看到，仅供测试用，随时可能删！
 */

var express = require('express');
var router = express.Router();

var api = require('../../utils/api').console;
var log = require('../../utils/log').getLogger('[CONSOLE] [INFORMATION]');
var utils = require('../../utils/utils');
var inter = require('./public/data_processor');

const PERIOD_MONTH = 1,                   // 月度的请求值
    PERIOD_SEASON = 2,                  // 季度的请求值
    PERIOD_YEAR = 3;                    // 年度的请求值

/**
 * 这个接口是查看后台传过来的数据的，没有做任何修改
 */
router.get('/', function (req, res, next) {
    api.interface(12, '游戏').then(function (data) {
        res.send(data);

    });
});

/**
 * 这个接口是预处理的数据，以季度为标准
 */
router.get('/before', function (req, res, next) {
    api.interface(12, '游戏').then(function (data) {
        if (data.success == true) {
            var ret = inter.updateData(data.data, PERIOD_SEASON);
            res.send(ret);
        } else {
            log.err("后台传递数据失败！原因如下：");
            log.err(data.msg);

            return false;
        }
    });
});

/**
 * 这个是处理完之后的数据，以季度为标准
 */
router.get('/after', function (req, res, next) {
    api.interface(12, '游戏').then(function (data) {
        if (data.success == true) {
            var ret = inter.processData(data.data, PERIOD_SEASON);
            res.send(ret);
        } else {
            log.err("后台传递数据失败！原因如下：");
            log.err(data.msg);

            return false;
        }
    });
});

module.exports = router;