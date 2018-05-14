const express = require('express');
const path = require('path');
const router = express.Router();
const log = require('../utils/log').getLogger('INDEX');
const API = require('../utils/api');

/* 门户首页 */
router.get('/', (req, res, next) => {
    log.info("首页被访问 - 来自log4js的DEBUG信息");
    res.render('index',{});
});

module.exports = router;
