var siderbar = function(){
    return {
        siderbar : [
            {"href": "", "label": "洞察中心", "key": "","img":"/images/console/sidebar-detect-center.png",'imghover':'/images/console/sidebar-detect-center-hover.png'},
            {"href": "/console/information", "label": "行业情报", "key": "information","img":"/images/console/sidebar-competition-information.png",'imghover':'/images/console/sidebar-competition-information-hover.png'},
            {"href": "/console/company", "label": "企业情报", "key": "company","img":"/images/console/sidebar-business-intelligence.png",'imghover':'/images/console/sidebar-business-intelligence-hover.png'},
            {"href": "", "label": "营销情报", "key": "","img":"/images/console/sidebar-marketing-intelligence.png",'imghover':'/images/console/sidebar-marketing-intelligence-hover.png'},
            {"href": "", "label": "定制平台", "key": "","img":"/images/console/sidebar-customization-platform.png",'imghover':'/images/console/sidebar-customization-platform-hover.png'},
            {"href": "", "label": "猎人报告", "key": "","img":"/images/console/sidebar-datahunter-report.png",'imghover':'/images/console/sidebar-datahunter-report-hover.png'},
            {"href": "", "label": "监控管理", "key": "","img":"/images/console/sidebar-monitoring-management.png",'imghover':'/images/console/sidebar-monitoring-management-hover.png'}
        ]
    };
};

module.exports = {
    'create' : function(req){
        var data = new siderbar();
        return data;
    }
};
