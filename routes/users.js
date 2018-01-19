var express = require('express');
var router = express.Router();
var api = require('../utils/api').user;
var log = require('../utils/log').getLogger('USER');
var industry = require('./users/industry');

/* GET users listing. */
router.get('/test', function (req, res, next) {
    log.info(req.cookies);
    log.info(req.session);
    log.info(req.session.userData);
    req.session.userData = {
        username: 'Vampire',
        age: 908
    };
    res.cookie('gender', 'unknow');
    res.send('respond with a resource');
});

/**
 * 登录页面
 */
router.get('/login', function (req, res, next) {
    var data = {
        key: 'login',
        title: '数据猎人 - Login',
        nav_title: '登录'
    };
    res.render('users/login', data);
});

/**
 * 处理登录逻辑
 */
router.post('/login', function (req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    api.login(account, password).then(function (login) {
        if (login.success) {
            // 登录成功,记录cookie和session
            req.session.ticket = login.data.ticket;
            res.cookie('ticket', login.data.ticket);
            res.cookie('account', account);
            // 登录成功后跳转到首页
            res.redirect('/console/information');
        } else {
            //登录失败,附带失败信息并返回登录页
            var data = {key: 'login', err: {msg: login.msg}};
            res.render('users/login', data)
        }
    })
});

/**
 * 用户登出
 */
router.get('/logout', function (req, res, next) {
    req.session.ticket = undefined;
    res.clearCookie('ticket');
    res.clearCookie('account');
    // 登出后跳转到首页
    res.redirect('..');
});

/**
 * 用户注册
 */
router.get('/register', function (req, res, next) {
    var data = {
        key: 'register',
        title: '数据猎人 - Register',
        nav_title: '注册',
        industry: industry
    };
    res.render('users/register', data);
});

/**
 * 处理注册逻辑
 */
router.post('/register', function (req, res, next) {

    // 获取表单信息
    var account = req.body.account;
    var password = req.body.password;
    var confirm = req.body.confirm;

    // 获取用户信息
    var info_decode = eval('(' + req.body.userInfo + ')');

    userInfo = {
        name: info_decode['name'] || '',
        phone: info_decode['phone'] || '',
        enterprise: info_decode['enterprise'] || '',
        industry: info_decode['industry'] || '',
        subIndustry: info_decode['subIndustry'] || ''
    };

    if (password === confirm) {
        api.register(account, password, userInfo).then(function (data) {
            res.send(data);
        });
    } else {
        // 密码校验失败
        var data = {
            data: false,
            msg: "两次输入的密码不一样!爸爸不同意你进入数据库!",
            success: false
        };
        res.send(data);
    }
});

router.post('/check_ticket', function (req, res, next) {
    var account = req.body.account;
    var ticket = req.session.ticket;
    api.check_ticket(account, ticket).then(function (data) {
        res.send(data);
    });
});

router.post('/check_account', function (req, res, next) {
    var account = req.body.account;
    api.check_account(account).then(function (data) {
        res.send(data);
    });
});

router.get('/forget', function (req, res, next) {
    var data = {
        key: 'forget',
        title: '数据猎人 - 忘记密码',
        nav_title: '找回密码'
    };

    res.render('users/forget', data);
});

module.exports = router;