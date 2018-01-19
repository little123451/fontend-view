/**
 * RequireJS的配置
 */
requirejs.config({

    baseUrl : '/javascript',

    paths : {
        // 第三方库
        jquery : 'lib/jquery/dist/jquery.min',
        bootstrap : 'http://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap',
        echarts : 'http://cdn.bootcss.com/echarts/3.2.3/echarts.min',
        "echarts-china-map" : 'http://echarts.baidu.com/asset/map/js/china',
        daterangepicker:'lib/bootstrap-daterangepicker/daterangepicker',
        moment:'lib/moment/min/moment.min',

        // 工具函数
        api : 'utils/api',
        chart : 'utils/chart',
        utils : 'utils/utils',

        // 用户模块
        register : 'module/users/register',
        login : 'module/users/login',

        // 控制台模块
        'console-public':'module/console/public/public',
        'console-information' : 'module/console/information',
        'console-company' : 'module/console/company',

        // 门户模块
        'index-custom' : 'module/index/custom'
    },

    shim : {
        // 声明 bootstrap 加载前需要加载 jquery
        bootstrap : {
            deps : ['jquery']
        },
        daterangepicker : {
            deps : ['moment']
        }
    }

});