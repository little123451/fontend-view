var express = require('express');
var router = express.Router();
var log = require('../utils/log').getLogger('CONSOLE');
var console = {
    'information': require('./console/information'),
    'company': require('./console/company'),
    'test': require('./console/test')
};

/**
 * 简易登录验证
 */
router.use(function (req, res, next) {
    var session = req.session.ticket;
    var cookies = req.cookies.ticket;
    if (session == undefined || cookies == undefined || session !== cookies) {
        res.redirect('/users/login');
    } else {
        next();
    }
});

router.use('/information', console['information']);
router.use('/company', console['company']);
router.use('/test', console['test']);

module.exports = router;