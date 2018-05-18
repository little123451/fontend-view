const express = require('express');
const path = require('path');
const router = express.Router();
const log = require('../utils/log').getLogger('Index');

/* 门户首页 */
router.get('/', (req, res, next) => {
    log.info("首页被访问 - 来自log4js的DEBUG信息");
    res.render('index',{});
});

/* bootstrap 样例 */
router.get('/bootstrap', (req, res, next) => {
    res.render('bootstrap',{});
});

module.exports = router;
