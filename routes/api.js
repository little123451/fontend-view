const express = require('express');
const router = express.Router();
const WeChat = require('./wechat');
const log = require('../utils/log').getLogger('API');

/* 首页 */
router.get('/index', (req, res, next) => {
    let ret = {
        query: req.query,
        body: req.body
    };
    res.send(JSON.stringify(ret));
});

/* 微信模块 */
router.use('/wx', WeChat);

module.exports = router;
