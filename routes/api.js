const express = require('express');
const router = express.Router();
const Utils = require('../utils/utils');
const log = require('../utils/log').getLogger('API');

/* GET example */
router.get('/index', (req, res, next) => {
    let ret = Utils.buildResp({
        query: req.query,
        body: req.body
    });
    res.send(ret);
});

/* POST example */
router.post('/index', (req, res, next) => {
    let ret = Utils.buildResp({
        query: req.query,
        body: req.body
    });
    res.send(ret);
});

module.exports = router;
