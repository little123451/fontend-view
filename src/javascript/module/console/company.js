/**
 * 控制台企业情报页面模块
 */

define(function (require, exports, module) {
    var $ = require('jquery');
    var chart = require('chart');
    var utils = require('utils');
    var api = require('api').console.company;
    var cssStyle = require('console-public').cssStyle;
    var daterangepicker = require("daterangepicker");

    // table数组用于保存绘制图表后返回的chart对象，便于图表数据清除。
    var table = [];
    //用于存储从后台获取的数据
    var dataStore = {};
    //用于保存当前的产品名/tab页
    var current = {
        'productionName': '微信',
        'tab': 'introduction'
    };

    var self = {
        /**
         * 将交互状态转为正常
         */
        'free': function () {
            status = 'free';
            $("select").removeAttr("disabled");
            $('.btn-span button').removeAttr("disabled");
        },

        /**
         * 将交互状态转为加载中
         */
        'loading': function () {
            status = 'loading';
            $("select").attr('disabled', "true");
            $('.btn-span button').attr('disabled', "true");
        },

        /**
         * 检查当前是否有数据正在加载
         *
         * @returns {boolean}
         */
        'is_loading': function () {
            if (status == 'loading') {
                // 弹出提示框，正在加载
                console.log('loading');
                return true;
            } else {
                return false;
            }
        },

        /**
         * 擦除所有table中保存的EChart图表
         *
         * @param table
         */
        'reset': function (table) {
            for (var key in table) {
                table[key].clear();
            }
        },

        /**
         * 根据渲染需求获取数据
         *
         * @param production
         */
        'get_data': function (productionName) {
            return api.interface(productionName)
        }
    };

    /*
     * 图表渲染
     * */
    var render = {
        //产品运营业图表渲染函数
        'render_production': function () {

            var productionData = dataStore.production;

            table['production-download'] = chart.pie(
                "production-download",
                "下载量",
                productionData.piechart_download
            );
            table['production-score'] = chart.bar(
                "production-score",
                "评分",
                productionData.barchart_score.labels,
                productionData.barchart_score.datasets,
                "分数值"
            );
            table['production-download-trend'] = chart.line(
                "production-download-trend",
                "下载量趋势",
                productionData.linechart_download.labels,
                productionData.linechart_download.datasets,
                '数量（个）'
            );
            table['production-rank-trend'] = chart.line(
                "production-rank-trend",
                '排位趋势',
                productionData.linechart_rank.labels,
                productionData.linechart_rank.datasets,
                '排位（位）'
            );
        },

        //企业信息页图表渲染函数
        'render_introduction': function () {

            var introductionData = dataStore.introduction;
            
            //获投历程折线图渲染
            table['introduction-price-trend'] = chart.line(
                "introduction-price-trend",
                '获投历程',
                introductionData.linechart_investments.labels,
                introductionData.linechart_investments.datasets,
                '金额（万元）'
            );
            
            //企业基本资料及简介
            var companyName = $(".introduction-page-companyName")[0];
            var website = $(".introduction-page-website")[0];
            var business = $(".introduction-page-business")[0];
            var locate = $(".introduction-page-locate")[0];
            var briefIntroduction = $(".introduction-page-briefIntroduction")[0];
            
            companyName.innerHTML = utils.deepGet(introductionData, 'companyName');
            website.innerHTML = utils.deepGet(introductionData,'website');
            website.setAttribute('href',utils.deepGet(introductionData,'website'));
            business.innerHTML = utils.deepGet(introductionData,'business');
            locate.innerHTML = utils.deepGet(introductionData,'locate');
            briefIntroduction.innerHTML = utils.deepGet(introductionData,'briefIntroduction');
        
            //企业获投历程的表格渲染
            var investments = introductionData.table_investments;
            $('#introduction-page .table').empty();
            for(var i = 0 ; i < investments.length ; i++){
               $('#introduction-page .table').append('<tr><td>'+investments[i].time+'</td><td>'+investments[i].round+'</td><td>'+investments[i].sum+'</td><td></td></tr>');
               for(var j = 0 ; j < investments[i].investors.length ; j++){
                    $('#introduction-page .table tr:last td:last').append('<p>'+investments[i].investors[j]+'</p>')
               }
            }
        },

        //相关资讯页图表渲染函数
        'render_information': function (productionName) {
            var informationData = dataStore.information;
            table['information-trend'] = chart.line(
                "information-trend",
                '',
                informationData.linechart_trend.labels,
                informationData.linechart_trend.datasets,
                '金额（万元）'
            );

            //从后台获取新闻数据并渲染
            return api.news(productionName)
                .then(function (data) {
                    var media_title = $('.media h5');
                    var media_date = $('.media .date');
                    var media_publisher = $('.media .publisher');
                    var media_link = $('a.newlink');
                    for (var i = 0; i < 6; i++) {
                        media_title[i].innerHTML = data.data[i].title;
                        media_publisher[i].innerHTML = data.data[i].publisher;
                        media_date[i].innerHTML = data.data[i].date;
                        media_link[i].setAttribute("href", data.data[i].url);
                    }
                });
        }
    };

    var event = {
        /**
         * 产品(select)切换事件
         */
        'production_change': function () {
            //如果处于‘加载数据中’状态，则不执行下面操作
            if (self.is_loading()) return false;

            //将交互状态转为‘加载数据中’
            self.loading();

            //获取产品名，以便于作为参数从后台获取相关数据
            var productionName = $(".header select").children('option:selected').val();

            //切换到产品介绍页
            $("#introduction-page").siblings().hide();
            $('#introduction-page').show();

            //产品介绍按钮高亮
            $("button[data-value=introduction]").siblings().removeClass("active");
            $("button[data-value=introduction]").addClass("active");

            //擦除图表准备重新绘制
            self.reset(table);

            //根据参数从后台获取所需数据并绘制图表
            self.get_data(productionName)
                .then(function (data) {
                    console.log(data);
                    dataStore = data;
                    
                })
                .then(render.render_introduction)
                .then(function() {
                    current['productionName'] = productionName;
                    self.free()
                })
        },

        /**
         * tab切换事件
         */
        'tab_change': function () {
            // 如果正在加载，则提示，并不执行下面的操作
            if (self.is_loading()) return false;

            // 将交互状态转为loading
            self.loading();

            // 高亮按钮
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            // 获取绘制所需相关参数
            var type = $(this).attr("data-value");

            // 切换tab
            var pagename = type + '-page';
            $("#" + pagename).siblings().hide();
            $('#' + pagename).show();

            // 执行绘制
            switch (type) {
                case ("introduction"):
                    render.render_introduction();
                    break;
                case ("production"):
                    render.render_production();
                    break;
                case ("information"):
                    render.render_information(current['productionName'])
                    break;
            }
            current['tab'] = type;
            self.free()
        }
    };
    module.exports = {

        'main': function () {
            //页面初始化
            this.init();
            // 绑定事件
            this.bind();
            //日历选择
            this.calendarsSelect();
        },

        /**
         * 初始化
         */
        'init': function () {
            //边栏当前页变动
            $("#console-sidebar a").removeClass('active');
            $("#console-sidebar a[key='company']").addClass('active');

            //页面滚动固定边栏且边栏向上移
            cssStyle.scrollChange();

            //将交互状态设置为‘正在加载中’
            self.loading();

            //加载初始化数据并绘制图表
            self.get_data('微信')
                .then(function (data) {
                    console.log(data);
                    dataStore = data;
                })
                .then(render.render_introduction)
                .then(self.free);
        },

        'calendarsSelect': function () {
            $('#reservation').daterangepicker(null, function (start, end, label) {
                console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
            });
            $('#selection').daterangepicker(null, function (start, end, label) {
                console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
            });
        },

        /**
         * 绑定事件
         */
        'bind': function () {
            $('.btn-span button').click(event.tab_change);
            $(".header select").on('change', event.production_change);
            cssStyle.bind();
        },
        /**
         * 解除事件绑定
         */
        'unbind': function () {
            //解除动作绑定
        }
    }
});