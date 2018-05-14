const express = require('express');
const router = express.Router();
const log = require('../utils/log').getLogger('INDEX');

/* 首页 */
router.get('/index', (req, res, next) => {
    let ret = {
        query: req.query,
        body: req.body
    };
    res.send(JSON.stringify(ret));
});

module.exports = router;
