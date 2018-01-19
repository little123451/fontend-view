var navbar = function(){
    return {
        nav : [
            {"href": "/", "label": "首页", "key": "index"},
            {"href": "/discover", "label": "洞察平台", "key": "discover"},
            {"href": "/custom", "label": "定制平台", "key": "custom"},
            {"href": "/resources", "label": "数据资源", "key": "resources"},
            {"href": "/report", "label": "猎人报告", "key": "report"},
            {"href": "/about", "label": "关于我们", "key": "about"}
        ],
        isLogin : false,
        account : ''
    };
};

module.exports = {
    'create' : function(req){
        var data = new navbar();
        if (req.cookies.ticket && req.cookies.ticket == req.session.ticket) {
            data.isLogin = true;
            data.account = req.cookies.account;
        }
        return data;
    }
};