define(function(require, exports, module){
    var ECharts = require('echarts');
    var ChinaMap = require('echarts-china-map');
    module.exports = {

        /**
         * 绘制曲线图(EChart)
         *
         * @param elementID     用来绘制图表的canvas标签的ID
         * @param title         图表的标题
         * @param labels        图表的X轴，用数组表示，例如 ["1月","2月","3月"]
         * @param dataSets      图表的数据集，如 { "融资数据":[230,450,110] }
         * @param scaleLabel    Y轴的单位或说明， 如 "金额(百万)"
         */
        "line": function(elementID, title, labels, dataSets, scaleLabel){

            // 基于准备好的dom，初始化echarts实例
            var chart = ECharts.init($('#'+elementID)[0]);

            // 指定图表的数据和lengend
            var series = [], lengend = [], temp;
            for ( var i = 0; i < dataSets.length; i++) {
                for (key in dataSets[i]) {
                    temp = {
                        name: key,
                        type: "line",
                        smooth: true,
                        data: dataSets[i][key]
                    };
                    series.push(temp);
                    lengend.push(key);
                }
            }

            // 设置默认配置并加载数据配置
            chart.setOption({
                title: {
                    text: title,
                    x: 'center'
                },
                tooltip: { trigger: 'axis' },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {show: true},
                        //magicType : {show: true, type: ['line', 'bar']}
                    }
                },
                legend: {
                    bottom: 0,
                    textStyle: { fontSize: 6 },
                    data:lengend
                },
                xAxis: {
                    boundaryGap: false,
                    data: labels
                },
                yAxis: {
                    name: scaleLabel,
                    type: 'value'
                },
                series: series
            });

            return chart
        },
        /**
         * 绘制柱状图(EChart)
         *
         * @param elementID     用来绘制图表的canvas标签的ID
         * @param title         图表的标题
         * @param labels        图表的X轴，用数组表示，例如 ["1月","2月","3月"]
         * @param dataSets      图表的数据集，用数组表示，例如 [230,450,110] }
         * @param scaleLabel    Y轴的单位或说明， 如 "金额(百万)"
         */
        'bar' : function (elementID,title,labels,dataSets,scaleLabel){
            // 基于准备好的dom，初始化echarts实例
            var chart = ECharts.init($('#'+elementID)[0]);

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: title,
                    x: 'center'
                },
                tooltip: {},
                xAxis: {
                    data: labels,
                    axisLabel:{
                        interval: 0,
                        rotate:30,
                        // margin:5,
                        // textStyle:{ align : 'right'} 
                    }
                },
                yAxis: {
                    name: scaleLabel
                },
                series: [{
                    // name: '占比',
                    type: 'bar',
                    data: dataSets,
                    markLine : {
                        symbol : 'none',
                        itemStyle : {
                            normal : {
                                label : {
                                    show:false
                                }
                            }
                        },
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }],
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {show: true},
                        magicType : {show: true, type: ['line', 'bar']}
                    },

                }
            };

            // 使用刚指定的配置项和数据显示图表。
            chart.setOption(option);
            return chart;
        },

        /**
         * 绘制中国地图(EChart)
         *
         * @param elementID     用来绘制图表的canvas标签的ID
         * @param dataStore     图表的数据集，用Json格式，如{'北京':200}     
         */
        'chinaMap' : function(elementID,dataStore){
            var china = ECharts.init($('#'+elementID)[0]);
            var dataSets = [];
            var max = 0, min = 10000;

            for(var key in dataStore){
                if(key == "广东"){
                    dataSets.push(
                        {name: '广东', value: dataStore[key], selected:true}
                    )
                }else{
                    dataSets.push(
                        {name: key,value: dataStore[key] }
                    )
                }
                if (dataStore[key] > max) max = dataStore[key];
                if (dataStore[key] < min) min = dataStore[key];
            };

            var option = {
                title: {
                    text: '地域融资数量分布',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                visualMap: {
                    min: min,
                    max: max,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    color: ['orangered','yellow','lightskyblue'],
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '融资数量',
                        type: 'map',
                        mapType: 'china',
                        selectedMode : 'single',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:dataSets
                    }
                ]
            };
            china.setOption(option);

            return china;
        },
        /**
         * 绘制饼图(EChart)
         *
         * @param elementID     用来绘制图表的canvas标签的ID
         * @param title     图表的标题
         * @param dataStore     图表的数据集，用Json格式，如{'北京':200}
         */
        'pie': function (elementID,title,dataSets) {
            // 基于准备好的dom，初始化echarts实例
            var chart = ECharts.init($('#'+elementID)[0]);
            //默认数据
            var option = {
                title : {
                    text: title,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name: title,
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:dataSets
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            chart.setOption(option);
            return chart;
        },
   }
});
