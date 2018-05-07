let express = require('express');
let path = require('path');
let router = express.Router();
let log = require('../utils/log').getLogger('INDEX');

/* 门户首页 */
router.get('/', function (req, res, next) {
    log.info("首页被访问 - 来自log4js的DEBUG信息");
    res.render('index',{});
});

module.exports = router;
