/**
 * 浏览器端对接Node端的API接口封装
 */


define(function (require, exports, module) {
    var $ = require('jquery');

    // node端API接口
    var api = {
        'user' : {
            'check_account': '/users/check_account',
            'check_ticket': '/users/check_ticket',
            'register': '/users/register',
        },
        'console' : {
            'information': {
                'interface': '/console/information/interface',
                'news': '/console/information/news'
            },
            'company' : {
                'interface': '/console/company/interface',
                'news': '/console/company/news'
            }
        }
    };

    /**
     * 发送请求的基础方法
     *
     * @param url   链接
     * @param type  请求类型 ( 'post' / 'get' )
     * @param data  请求数据内容
     *      //todo 修复数据字段内容为对象时的问题
     *      前端的对象数据传送到node时,结构会发生变化
     *      如 data : { objectData : { fields : value, key : val} } 传送到node会变成
     *      req.body['objectData[fields]'] = value
     *      req.body['objectData[key]'] = val
     * @returns {*}
     */
    var send = function (url, type, data) {
        var deferred = $.Deferred();
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (e) {
                deferred.reject(e);
            }
        });
        return deferred.promise()
    };



    module.exports = {

        // 用户模块接口
        "user" : {

            /**
             * 检查账号是否被占用
             *
             * @param account 账号名
             * @returns {*}
             */
            'check_account': function (account) {
                var url = api.user.check_account;
                var type = 'post';
                var data = {'account': account};
                return send(url, type, data);
            },

            /**
             * 检查登录凭证是否有效
             *
             * @param account 登录凭证对应的账号
             * @param ticket  登录凭证
             * @returns {*}
             */
            'check_ticket': function (account, ticket) {
                var url = api.user.check_ticket;
                var type = 'post';
                var data = {
                    'account': account,
                    'ticket': ticket
                };
                return send(url, type, data);
            },

            /**
             * 调用Node进行用户注册
             *
             * @param account   用户名
             * @param password  密码
             * @param confirm   确认密码
             * @param userInfo  用户信息
             * @returns {*}
             */
            'register': function (account, password, confirm, userInfo) {
                var url = api.user.register;
                var type = 'post';
                var data = {
                    account: account,
                    password: password,
                    confirm: confirm,
                    userInfo: JSON.stringify(userInfo)
                };
                return send(url, type, data);
            }// register

        },// user

        // 控制台模块接口
        "console" : {

            // 控制台 - 行业情报接口
            "information" : {

                /**
                 * 把数据封装好并发送到Node端
                 *
                 * @param limit     要查看的月份数
                 * @param industry  行业的名称
                 * @param period    季度的请求值
                 * @returns {*}
                 */
                "interface": function (limit, industry, period) {
                    var url = api.console.information.interface;
                    var type = 'post';
                    var data = {
                        limit: limit,
                        industry: industry,
                        period: period
                    };
                    return send(url, type, data);
                },

                /**
                 * 获取资讯tab的新闻内容
                 *
                 * @param limit
                 * @param industry
                 * @returns {*}
                 */
                "news" : function(limit, industry) {
                    var url = api.console.information.news;
                    var type = 'post';
                    var data = {
                        limit: limit,
                        industry: industry
                    };
                    return send(url, type, data);
                }

            },// information

            "company" : {
                "interface" : function(productionName) {
                    var url = api.console.company.interface;
                    var type = 'post';
                    var data = productionName;
                    return send(url, type, data);
                },
                
                "news" : function(productionName) {
                    var url = api.console.company.news;
                    var type = 'post';
                    var data = productionName;
                    return send(url, type ,data);
                }

            }
        }// console

    };
});
