/**
 * 控制台首页模块
 */


define(function (require, exports, module) {
    var $ = require('jquery');
    var chart = require('chart');
    var api = require('api').console.information;
    var cssStyle = require('console-public').cssStyle;
    // table数组用于保存绘制图表后返回的chart对象，便于图表数据清除。
    var table = [];
    // status变量用于判断状态，当值为free时没有数据在加载，为loading时表示有数据在加载中。
    var status = "loading";
    // 记录当前的tab / 行业 / 时间维度
    var current = {
        'tab': 'distribution',
        'industry': '游戏',
        'limit': 12,
        'period': 1
    };
    //分别保存趋势页和分布页的数据
    var dataTrend = {};
    var dataDistribution = {};
    //省份名称数组，便于检测是否有所需省份数据
    var provinces = {};


    var self = {

        /**
         * 将交互状态转为正常
         */
        'free': function () {
            status = 'free';
            $("select").removeAttr("disabled");
            $('.header-first-section button').removeAttr("disabled");
            $('.header-second-section button').removeAttr("disabled");
        },

        /**
         * 将交互状态转为加载中
         */
        'loading': function () {
            status = 'loading';
            $("select").attr('disabled', "true");
            $('.header-first-section button').attr('disabled', "true");
            $('.header-second-section button').attr('disabled', "true");
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
         * @param limit     请求月份的数据
         * @param industry  行业
         * @param period    周期的请求值
         * @returns {*}
         */
        'get_data': function (limit, industry, period) {
            return api.interface(limit, industry, period)
        },

        /**
         * 生成省份数组，用于渲染中国地图图表
         * 以及用于检测是否有该省数据
         *
         * @param dataDistribution
         */
        'init_provinces': function (dataDistribution) {
            var provinces = {};
            for (var key in dataDistribution.province) {
                provinces[key] = dataDistribution.province[key]['total'];
            }
            return provinces;
        }

    };

    var render = {

        /**
         * 趋势tab图表渲染函数
         *
         * @param industry  行业名称（如：游戏、教育）
         */
        'render_trend': function (industry) {
            var dataStore = dataTrend;

            table['industry-finance-quantity-trend'] = chart.line(
                'industry-finance-quantity-trend',
                industry + "行业各季度融资数量趋势图",
                dataStore.industry.month,
                dataStore.industry.count,
                "数量(个)"
            );

            table['industry-finance-volume-trend'] = chart.line(
                'industry-finance-volume-trend',
                industry + "行业各季度融资金额趋势图",
                dataStore.industry.month,
                dataStore.industry.sum,
                "金额(万元)"
            );

            table['sub-industry-finance-quantity-trend'] = chart.line(
                'sub-industry-finance-quantity-trend',
                industry + "子行业融资数量趋势图",
                dataStore.sub_industry.month,
                dataStore.sub_industry.count,
                "数量(个)"
            );

            table['sub-industry-finance-volume-trend'] = chart.line(
                'sub-industry-finance-volume-trend',
                industry + "子行业融资数量趋势图",
                dataStore.sub_industry.month,
                dataStore.sub_industry.sum,
                "金额(万元)"
            );

            table['round-finance-quantity-trend'] = chart.line(
                'round-finance-quantity-trend',
                "轮次融资数量趋势图",
                dataStore.round.month,
                dataStore.round.count,
                "数量(个)"
            );

            table['round-finance-volume-trend'] = chart.line(
                'round-finance-volume-trend',
                "轮次融资金额趋势图",
                dataStore.round.month,
                dataStore.round.sum,
                "金额(万元)"
            );

            table['spatial-finance-quantity-trend'] = chart.line(
                'spatial-finance-quantity-trend',
                "地域融资数量分布图",
                dataStore.area.month,
                dataStore.area.count,
                "数量(个)"
            );

            table['spatial-finance-volume-trend'] = chart.line(
                'spatial-finance-volume-trend',
                "地域融资金额分布图",
                dataStore.area.month,
                dataStore.area.sum,
                "金额(万元)"
            );
        },

        /**
         * 分布tab图表渲染函数
         */
        'render_distribution': function () {

            var dataStore = dataDistribution;

            table['sub-industry-finance-quantity-distribution'] = chart.bar(
                'sub-industry-finance-quantity-distribution',
                '子行业融资数量分布图',
                dataStore.sub_industry.count.label,
                dataStore.sub_industry.count.percentage,
                '数量占比(%)'
            );

            table['sub-industry-finance-volume-distribution'] = chart.bar(
                'sub-industry-finance-volume-distribution',
                '子行业融资金额分布图',
                dataStore.sub_industry.sum.label,
                dataStore.sub_industry.sum.percentage,
                '金额占比(%)'
            );

            table['rounds-finance-quantity-distribution'] = chart.bar(
                'rounds-finance-quantity-distribution',
                '各轮次融资数量分布图',
                dataStore.round.label,
                dataStore.round.count,
                '数量占比(%)'
            );

            table['rounds-finance-volume-distribution'] = chart.bar(
                'rounds-finance-volume-distribution',
                '各轮次融资金额分布图',
                dataStore.round.label,
                dataStore.round.sum,
                '金额占比(%)'
            );

            table['area-finance-quantity-distribution'] = chart.bar(
                'area-finance-quantity-distribution',
                '各地域融资数量占比图',
                dataStore.area.count.label,
                dataStore.area.count.percentage,
                '数量占比(%)'
            );

            table['area-finance-volume-distribution'] = chart.bar(
                'area-finance-volume-distribution',
                '各地域融资金额占比图',
                dataStore.area.sum.label,
                dataStore.area.sum.percentage,
                '金额占比(%)'
            );

            table['province-finance-quantity-distribution'] = chart.bar(
                'province-finance-quantity-distribution',
                '地域融资数量分布',
                dataStore.province['广东'].count.label,
                dataStore.province['广东'].count.percentage,
                '数量占比(%)'
            );

            table['province-finance-volume-distribution'] = chart.bar(
                'province-finance-volume-distribution',
                '地域融资金额分布',
                dataStore.province['广东'].sum.label,
                dataStore.province['广东'].sum.percentage,
                '金额占比(%)'
            );

            table['area-finance-distribution'] = chart.chinaMap(
                'area-finance-distribution',
                provinces
            );

            //绑定 mapselectchanged 事件
            table['area-finance-distribution'].on('mapselectchanged', event.map_selected);
        },

        /**
         * 分布页省份渲染函数
         * @param provinceName(省份名称 如广东、浙江...)
         */
        'render_province': function (provinceName) {

            var dataStore = dataDistribution;

            table['province-finance-quantity-distribution'] = chart.bar(
                'province-finance-quantity-distribution',
                '地域融资数量分布',
                dataStore.province[provinceName].count.label,
                dataStore.province[provinceName].count.percentage,
                '数量占比(%)'
            );

            table['province-finance-volume-distribution'] = chart.bar(
                'province-finance-volume-distribution',
                '地域融资金额分布',
                dataStore.province[provinceName].sum.label,
                dataStore.province[provinceName].sum.percentage,
                '金额占比(%)'
            )
        },

        /**
         * 资讯tab数据加载
         */
        'render_news': function (limit, industry) {
            return api.news(limit, industry).then(function (data) {
                console.log(data);
                var media_title = $('.media h5');
                var media_date = $('.media .date');
                var media_publisher = $('.media .publisher');
                var media_link = $('a.newlink');
                for (var i = 0; i < 12; i++) {
                    media_title[i].innerHTML = data.data[i].title;
                    media_publisher[i].innerHTML = data.data[i].publisher;
                    media_date[i].innerHTML = data.data[i].date;
                    media_link[i].setAttribute("href", data.data[i].url);
                }
            })
        }
    };

    var event = {
        /**
         * 行业下拉框选择事件
         */
        'select_change': function () {

            // 如果正在加载，则提示，并不执行下面的操作
            if (self.is_loading()) {
                //todo 处理因加载中导致的select中industry值和当前页面渲染的industry不一致的问题
                return false;
            }

            // 获取加载所需参数
            var limit = $(".header-first-section").children(".active").attr("data-value");
            var period = $(".header-first-section").children(".active").attr("data-period");
            var industry = $("select").children('option:selected').val();
            var type = $(".header-second-section").children(".active").attr("data-value");

            // 将交互状态设置为加载中
            self.loading();

            // 擦除图表，准备重新绘制
            self.reset(table);

            // 根据参数获取绘制所需数据
            self.get_data(12, industry, period)
                .then(function (data) {
                    console.log(data);
                    dataTrend = data.trend;
                    dataDistribution = data.distribution;
                    //生成省份数组
                    provinces = self.init_provinces(dataDistribution);
                })
                // 执行绘制
                .then(function () {
                    switch (type) {
                        case ("distribution"):
                            render.render_distribution();
                            break;
                        case ("trend"):
                            render.render_trend(industry);
                            break;
                        case ("information"):
                            render.render_news(limit, industry);
                            break;
                    }
                })
                // 更新current的值，解除加载中的交互状态
                .then(function () {
                    current['industry'] = industry;
                    self.free()
                })
        },

        /**
         * 时间跨度选择事件
         */
        'time_change': function () {

            // 如果正在加载，则提示，并不执行下面的操作
            if (self.is_loading()) return false;

            // 将交互状态设置为加载中
            self.loading();

            // 高亮按钮
            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            // 获取绘制所需相关参数
            var limit = $(".header-first-section").children(".active").attr("data-value");
            var period = $(".header-first-section").children(".active").attr("data-period");
            var industry = $("select").children('option:selected').val();
            var type = $(".header-second-section").children(".active").attr("data-value");

            // 擦除图表，准备重新绘制
            self.reset(table);

            // 根据参数获取绘制所需数据
            self.get_data(12, industry, period)
                .then(function (data) {
                    console.log(data);
                    dataTrend = data.trend;
                    dataDistribution = data.distribution;
                    //生成省份数组
                    provinces = self.init_provinces(dataDistribution);
                })
                // 执行绘制
                .then(function () {
                    switch (type) {
                        case ("distribution"):
                            render.render_distribution(industry);
                            break;
                        case ("trend"):
                            render.render_trend();
                            break;
                        case ("information"):
                            console.log("render_information()");
                            break;
                    }
                })

                // 更新current的值，解除加载中的交互状态
                .then(function () {
                    current['limit'] = limit;
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
            var industry = $("select").children('option:selected').val();
            var limit = $(".header-first-section").children(".active").attr("data-value");
            var period = $(".header-first-section").children(".active").attr("data-period");
            var type = $(this).attr("data-value");

            // 切换tab
            var pagename = type + '-page';
            $("#" + pagename).siblings().hide();
            $('#' + pagename).show();
            // 执行绘制
            switch (type) {
                case ("distribution"):
                    render.render_distribution();
                    break;
                case ("trend"):
                    render.render_trend(industry);
                    break;
                case ("information"):
                    render.render_news(limit, industry);
                    break;
            }
            // 更新current的值，解除加载中的交互状态
            current['tab'] = type;
            self.free()
        },

        /**
         * 地图点击变更事件
         */
        'map_selected': function (param) {

            if (self.is_loading()) return false;

            //检测是否有该省的数据
            var province = param.name;
            if (provinces[province] == undefined) {
                alert('该省暂时没有数据');
                return false
            }

            self.loading();
            //清除之前的图表数据
            table['province-finance-quantity-distribution'].clear();
            table['province-finance-volume-distribution'].clear();
            //执行绘制
            render.render_province(province);
            //解除锁定
            self.free();
        },
        /**
         *  点击资讯之后文字变色
         */
        'media_text_change': function () {
            $(this).find('h5').css('color', '#6D8FB2');
        },
        /**
         *  回到顶部功能，点击按钮回到当前页面顶部。
         */
        'back_to_top': function () {
            var speed = 200;//滑动的速度
            $('body,html').animate({scrollTop: 0}, speed);
            return false;
        }
    };

    module.exports = {

        'main': function () {
            // 页面数据初始化
            this.init();
            // 绑定事件
            this.bind();

        },

        /**
         * 初始化
         */
        'init': function () {
            //todo 将边栏变动逻辑移动到jade中实现
            //边栏当前页变动
            $("#console-sidebar a").removeClass('active');
            $("#console-sidebar a[key='information']").addClass('active');
            //页面滚动固定边栏且边栏向上移
            cssStyle.scrollChange();
            // 将交互状态设置为加载中
            self.loading();
            // 加载初始化数据
            self.get_data(current.limit, current.industry, current.period)
                //对初始化数据进行渲染
                .then(function (data) {
                    console.log(data);
                    dataDistribution = data.distribution;
                    dataTrend = data.trend;
                    //生成省份数组
                    provinces = self.init_provinces(dataDistribution);
                })
                .then(function () {
                    //todo 根据current的tab值选择不同的页面进行渲染 
                    render.render_distribution(dataDistribution);
                })
                .then(self.free);
        },
        /**
         * 绑定事件
         */
        'bind': function () {
            $('#backTop').on('click', event.back_to_top);
            $("select").change(event.select_change);
            $(".media").on('click', event.media_text_change);
            $('.header-first-section button').click(event.time_change);
            $('.header-second-section button').click(event.tab_change);
            cssStyle.bind();
            // 分布页地图的点击事件绑定在函数 render_distribution 中
        },

        /**
         * 解除事件绑定
         */
        'unbind': function () {
            //解除动作绑定
        }

    }
});
