var express = require('express');
var router = express.Router();
var nav = require('../index/nav');
var siderbar = require('./public/sidebar');
var api = require('../../utils/api').console;
var log = require('../../utils/log').getLogger('[CONSOLE] [COMPANY]');
var utils = require('../../utils/utils');

/**
 * 企业情报页
 */
router.get('/', function (req, res, next) {
    var data = {
        nav: nav.create(req),
        siderbar: siderbar.create(req),
        key: 'company',
        title: "控制台 - 企业情报"
    };
    res.render('console/company', data);
});

router.get('/test', function (req, res, next) {
    var data = api.company_interface('微信');
    res.send(data);
});

router.post('/interface',function (req, res, next) {
    var data = api.company_interface('微信');
	res.send(data);
});

router.post('/news',function (req, res, next) {
	var data = api.company_news('微信');
    res.send(data);
});
/**
 *企业情报页数据接口
 */

 module.exports = router;