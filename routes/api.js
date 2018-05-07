let express = require('express');
let router = express.Router();
let log = require('../utils/log').getLogger('INDEX');

/* 门户首页 */
router.get('/index', function (req, res, next) {
    let ret = {
        query: req.query,
        body: req.body
    };
    res.send(JSON.stringify(ret));
});

module.exports = router;
