/**
 * Node端链接PHP端interface的API接口封装
 */


var postman = require('./postman.js');

var config = {
    'host' : 'api.lierenio.com',
    'port' : 80,
    'base_url' : '/interface/index.php/',
    'api_map' : {
        'test' : 'api/example/test',
        "index" : {
            'reports' : 'api/site/reports'
        },
        "user" :{
            'check_account' : 'site/user/check_account',
            'check_ticket' : 'site/user/check_ticket',
            'login' : 'site/user/login',
            'register' : 'site/user/register'
        },
        "console" : {
            'interface' : 'site/console/tendency',
            'news' : 'site/console/news',
            'company_production' : 'site/console/company_production',
            'company_news' : 'site/console/company_news'
        }
    }
};

var map = config.api_map;

/**
 * 根据apiKey从api_map中选择接口构造链接
 *
 * @param apiKey
 * @returns {string}
 */
function createUrl(api){
    return'http://' + config.host + ":" + config.port + config.base_url + api;
}

var api = {

    /**
     * 测试接口
     *
     * @returns {*}
     */
    "test" : function(){
        var url = createUrl(map.test);
        var req = new postman(url);
        return req.GET()
    },

    // 门户首页相关接口
    "index" : {
        /**
         * 获取报告页所需报告
         *
         * @returns {*}
         */
        "get_reports" : function(){
            var url = createUrl(map.index.reports);
            var req = new postman(url);
            return req.GET();
        }
    },

    // 用户模块相关接口
    "user" : {
        /**
         * 检查账号名是否被占用
         *
         * @param account 账号名
         * @returns {*}
         */
        "check_account" : function(account){
            var url = createUrl(map.user.check_account);
            var req = new postman(url);
            var data = { "account" : account };
            req.setContentType('raw');
            return req.POST(data)
        },

        /**
         * 检查登录凭证是否有效
         *
         * @param account 登录凭证对应的账号
         * @param ticket 登录凭证
         * @returns {*}
         */
        "check_ticket" : function(account, ticket){
            var url = createUrl(map.user.check_ticket);
            var req = new postman(url);
            var data = {
                "account" : account,
                "ticket" : ticket
            };
            req.setContentType('raw');
            return req.POST(data)
        },

        /**
         * 执行登录,获取登录凭证
         *
         * @param account   账号名
         * @param password  密码
         * @returns {*}
         */
        "login" : function(account, password){
            var url = createUrl(map.user.login);
            var req = new postman(url);
            var data = {
                "account" : account,
                "password" : password
            };
            req.setContentType('raw');
            return req.POST(data)
        },

        /**
         * 执行注册,返回用户ID
         *
         * @param account   账号名
         * @param password  密码
         * @param userInfo  用户信息
         * @returns {*}
         */
        "register" : function(account, password, userInfo){
            var url = createUrl(map.user.register);
            var req = new postman(url);
            var data = {
                "account" : account,
                "password" : password,
                "userInfo": userInfo
            };
            req.setContentType('raw');
            return req.POST(data)
        }

    },

    // 控制台相关接口
    "console":{

        /**
         * 请求控制台行业情报页趋势栏目数据
         *
         * @param limit     请求多少个月的数据
         * @param industry  请求什么行业的数据
         * @returns {*}
         */
        "interface" : function(limit, industry) {
            var url = createUrl(map.console.interface);
            var req = new postman(url);
            req.addQuery('limit', limit);
            req.addQuery('industry', industry);
            req.setContentType('raw');
            return req.GET();
        },

        /**
         * 请求控制台行业情报页的资讯内容
         *
         * @param limit
         * @param industry
         * @returns {*}
         */
        "news" : function(limit, industry) {
            var url = createUrl(map.console.news);
            var req = new postman(url);
            req.addQuery('limit', limit);
            req.addQuery('industry', industry);
            req.setContentType('raw');
            return req.GET();
        },

        "company_interface" : function(production) {
            var data = {
                //企业信息页数据
                introduction: {
                    companyName: "深圳市腾讯计算机系统有限公司",
                    website:"http://www.tencent.com",
                    business:"社交网络，综合社交",
                    locate:"广东 深圳",
                    briefIntroduction:"腾讯公司成立于1998年11月，是中国最大的互联网综合服务提供商之一，也是中国服务用户数量最多的互联网企业之一。",
                    
                    linechart_investments:{
                        labels:['20160901','20160910','20160920','20160930','20161010','20161020','20161030','20161110'],
                        datasets:[
                            {'投资金额':[20,21,10,30,11,13,9,13]}
                        ]
                    },

                    table_investments: [
                        {
                            time: '2016.09.30',
                            round: '上市后',
                            sum: '十万元',
                            investors: [
                                '投资方1',
                                '投资方2'
                            ] 
                        },
                        {
                            time: '2016.9.5',
                            round: '上市前',
                            sum: '十万元',
                            investors: [
                                '投资方3'
                            ] 
                        }
                    ]
                },

                //产品运营页数据
                production:{
                    piechart_download:[
                        {value:335, name:'安卓'},
                        {value:310, name:'百度'},
                        {value:234, name:'360'},
                        {value:135, name:'豌豆荚'},
                        {value:548, name:'应用宝'},
                        {value:148, name:'联想'},
                        {value:158, name:'魅族'},
                        {value:948, name:'华为'}
                    ],

                    barchart_score:{
                        labels:['安卓','百度','360','豌豆荚','应用宝','联想','魅族','华为'],
                        datasets:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 15.6, 32.2]
                    },

                    linechart_download:{
                        labels:['20160901','20160910','20160920','20160930','20161010','20161020','20161030','20161110'],
                        datasets:[
                            {'总下载':[20,21,10,30,11,13,9,13]},
                            {'日下载':[13,22,43,11,16,23,8,11]}
                        ]
                    },

                    linechart_rank:{
                        labels:['20160901','20160910','20160920','20160930','20161010','20161020','20161030','20161110'],
                        datasets:[
                            {'总榜':[20,21,10,30,11,13,9,13]},
                            {'分类':[13,22,43,11,16,23,8,11]}
                        ]
                    }
                },

                //相关资讯页数据
                information:{
                    linechart_trend:{
                        labels:['20160901','20160910','20160920','20160930','20161010','20161020','20161030','20161110'],
                        datasets:[
                            {'新闻':[20,21,10,30,11,13,9,13]},
                            {'微博':[13,22,43,11,16,23,8,11]},
                            {'论坛':[15,12,20,22,10,18,14,8]},
                            {'博客':[8,15,17,20,25,21,16,19]},
                            {'贴吧':[10,16,33,31,22,18,12,14]},
                            {'视频':[11,19,13,20,25,17,22,16]}
                        ]
                    }
                }
            }
            return data;
        },

        "company_news" : function(production) {
            var data = {
                data:[
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    },
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    },
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    },
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    },
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    },
                    {              
                        date: "2016-06-03 07:23:00",
                        keyword_list: "|净利润|上市公司|询价",
                        publisher: "华龙网",
                        tag: "游戏",
                        title: "天神娱乐44亿元收购游戏及广告公司股权",
                        url: "http://finance.ifeng.com/a/20160603/14455851_0.shtml?tag=游戏"
                    }
                ]
            }
            return data;
        }
    }

};

module.exports = api;