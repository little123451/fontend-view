var express = require('express');
var router = express.Router();
var nav = require('./index/nav');
var api = require('../utils/api').index;
var log = require('../utils/log').getLogger('INDEX');

/* 门户首页 */
router.get('/', function (req, res, next) {
    log.info("首页被访问 - 来自log4js的DEBUG信息");
    var section = {
        "discover": {
            'title': '洞察平台',
            'text': '提供一站式行业动态、企业形象、竞争对手、营销战略、智能商业情报检测及分析解决方案。',
            'image': './images/index/detect-pad.png',
            'href': '/discover'
        },
        "custom": {
            'title': '定制平台',
            'text': '根据客户给定数据需求，提供互联网定向采集分析、企业内部数据分析管理服务，以满足客户的个性化数据服务定制。',
            'image': './images/index/custom-pad.png',
            'href': '/custom'
        },
        "resource": {
            'title': '数据资源',
            'text': '根据客户给定数据需求，提供互联网定向采集分析、企业内部数据分析管理服务，以满足客户的个性化数据服务定制。',
            'image': './images/index/data-resource.png',
            'href': '/resources'
        },
        "report": {
            'title': '猎人报告',
            'text': '根据客户给定数据需求，提供互联网定向采集分析、企业内部数据分析管理服务，以满足客户的个性化数据服务定制。',
            'image': './images/index/datahunter-report.png',
            'href': '/report'
        }
    };

    var data = {
        nav: nav.create(req),
        key: "index",
        title: "数据猎人 - 首页",
        intro: {
            "image": "./images/index/intro-title.png",
            "text": "数据猎人( DataHunter )是面向互联网公开数据的商业情报分析服务提供商。</br>以“让大数据来得更容易”为理念，提供大数据情报分析及其定制服务，致力于构建数据桥梁，实现大数据真正价值。"
        },
        discover: section['discover'],
        custom: section['custom'],
        resource: section['resource'],
        report: section['report']
    };
    res.render('index/index', data);
});

/* 行业报告页面 */
router.get('/report', function (req, res, next) {
    var fields = [
        {
            "title": "行业情报",
            "summary": "盘点行业热点，分析行业趋势，洞察行业实况",
            "more": "/users/login",
            "article": []
        },
        {
            "title": "创投周记",
            "summary": "盘点每周的融资热点，分析融资趋势",
            "more": "/users/login",
            "article": []
        },
        {
            "title": "新创体验",
            "summary": "对新创企业产品的服务进行体验",
            "more": "/users/login",
            "article": []
        },
        {
            "title": "创投趣闻",
            "summary": "提供明星们的创业投资与趣闻等信息",
            "more": "/users/login",
            "article": []
        }
    ];
    api.get_reports().then(function(data){ //获取报告文章数据
        data = data.data;
        log.debug(data);
        for(item in fields){
            var key = fields[item].title;
            fields[item].article = data[key];
        }
    }).then(function(){ //进行页面渲染数据准备
        var data = {
            nav: nav.create(req),
            key: "report",
            title: "数据猎人 - 行业报告",
            fields: fields
        };
        res.render('index/report', data)
    });
});

/* 洞察平台 */
router.get('/discover',function(req, res, next){
    var section = {
        "intro": {
            'title': '洞察平台',
            'text': '数据猎人洞察平台采用自主研发的分布式采集平台对全网进行信息监测，范围包括微博、新闻、论坛、贴吧、问答、微信。同时采用机器学习智能分析文本词义，识别文本正负面情感倾向，多维度挖掘分析数据。更有效及时地提供负面新闻预警通知，支持大部分用户的舆情需求。'
        },
        "choose": {
            'text': '为什么选择我们？'
        },
        "table": {
            'text': '覆盖多个行业'
        },
        "experience": {
            'title': '数据猎人',
            'service': '定义企业自身的商业情报监控服务',
            'href': '/users/login',
            'text': '立即体验'
        }
    };

    var info = {
        "tendency": {
            'title': '行业动态',
            'text': '监测行业最新资讯、政策、融资动态，洞察市场最新走势。'
        },
        "image": {
            'title': '企业形象',
            'text': '实时追踪企业品牌形象及负面信息，优化市场营销策略。'
        },
        "intelligence": {
            'title': '竞争情报',
            'text': '全面获取竞争对手现状及营销动态，形成对比视图。'
        },
        "strategic": {
            'title': '营销战略',
            'text': '挖掘营销热点，分析用户画像，追踪活动口碑。'
        }
    };

    var reasons = [
        {
            'title': '时刻掌握业务状况',
            'text': '通过自动检测，数据猎人集合所有重要资讯，包括行业新闻、政策，竞争对手动态，公司新闻及热门话题等，让你实时了解业务情况。'
        },
        {
            'title': '全面追踪企业形象',
            'text': '通过对企业、品牌、代言人的全网监控，制定有效的市场营销策略，从而提高公司或品牌的知名度及商誉。'
        },
        {
            'title': '及时预警负面消息',
            'text': '行业和品牌自身负面消息即时检测和报警及热点事件实时追踪洞察，为您更有效地制定公关策略，更快、更好地管理危机。'
        },
        {
            'title': '高效评估营销成效',
            'text': '通过追踪、分析社交网络中用户的数量和情绪，评估市场推广活动的成效。'
        },
        {
            'title': '精准洞察用户画像',
            'text': '通过分析粉丝的人口特征和网民痕迹，进行用户精细画像，推动企业精准营销。'
        }];

    var table = [
        ['SNS社交网络', '广告营销', '旅游', '电子商务'],
        ['企业服务', '房产服务', '本地生活', '硬件'],
        ['医疗健康', '教育', '汽车交通', '移动互联网'],
        ['工具软件', '文化娱乐', '游戏', '金融']];

    var data = {
        nav: nav.create(req),
        key: "discover",
        title: "数据猎人 - Discover Platform",
        intro: section['intro'],
        info: info,
        choose: section['choose'],
        reasons: reasons,
        table: table,
        table_text: section['table'],
        experience: section['experience']
    };

    res.render('index/discover', data);
});

/* 资源平台 */
router.get('/resources', function(req, res, next){
    var section = {
        "banner": {
            'title': '数据资源',
            'text': '数据猎人数据资源平台面向广大非技术和技术群体，通过聚合海量的互联网公开数据资源，提供各种商业、科研、开发常用的多维度、高质量、高价值的数据。'
        },
        "experience": {
            'title': '数据猎人',
            'service': '定义企业自身的商业情报监控服务',
            'href': '/users/login',
            'text': '立即体验'
        }
    };

    var advantage = {
        "language": {
            'title': '多语言',
            'text': '提供中、英、日、韩以及一带一路沿岸国家的语言数据。'
        },
        "number": {
            'title': '数量大',
            'text': '数据基础大、包含上百万条新闻、微博等数据。'
        },
        "range": {
            'title': '范围广',
            'text': '新闻数据资讯遴选自国内外多个国家。'
        },
        "type": {
            'title': '类型多',
            'text': '涵盖了时事、体育、娱乐、经济、教育等各个类型。'
        }
    };

    var data = {
        nav: nav.create(req),
        key: "resources",
        title: "数据猎人 - Resources Platform",
        banner: section['banner'],
        advantage: advantage,
        experience: section['experience']
    };

    res.render('index/resources', data);
});

/* 定制平台 */
router.get('/custom', function(req, res, next){

    var data = {
        nav: nav.create(req),
        key: "custom",
        title: "数据猎人 - Custom Platform"
    };

    res.render('index/custom', data);
});

/* 关于我们 */
router.get('/about', function(req, res, next){
    var data = {
        nav: nav.create(req),
        key: "about",
        title: "数据猎人 - About Us"
    };

    res.render('index/about', data);
});

module.exports = router;
