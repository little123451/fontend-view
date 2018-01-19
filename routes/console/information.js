var express = require('express');
var router = express.Router();

var nav = require('../index/nav');
var siderbar = require('./public/sidebar');

var api = require('../../utils/api').console;
var log = require('../../utils/log').getLogger('[CONSOLE] [INFORMATION]');
var utils = require('../../utils/utils');
var inter = require('./public/data_processor');

/**
 * 行业情报页
 */
router.get('/', function (req, res, next) {
    var data = {
        nav: nav.create(req),
        siderbar: siderbar.create(req),
        key: 'information',
        title: "控制台 - 行业情报",
        industry: [
            "游戏", "电子商务", "企业服务", "本地生活", "金融",
            "教育", "硬件", "汽车交通", "医疗健康", "旅游",
            "工具软件", "广告营销", "房产服务", "物流"
        ]
    };
    res.render('console/information', data);
});

/**
 * 行业情报资讯数据接口
 */
router.post('/news', function (req, res, next) {
    var data = req.body;

    api.news(data['limit'], data['industry']).then(function (data) {
        res.send(data)
    });
});

/**
 * 行业情报页数据接口
 */
router.post('/interface', function (req, res, next) {
    var data = req.body,
        period = parseInt(data.period);

    // 向 interface 请求数据
    api.interface(data.limit, data.industry).then(function (data) {
        if (data.success == true) {
            var ret = inter.processData(data.data, period);
            res.send(ret);

        } else {
            log.err("后台传递数据失败！原因如下：");
            log.err(data.msg);

            return false;
        }
    });

});

module.exports = router;