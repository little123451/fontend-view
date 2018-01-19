/*
* 定义公共事件
* */
define(function (require, exports, module) {
    var $ = require('jquery');
    module.exports={
        /*
        * 左边样式改变
        * */
        "cssStyle":{
                /**
                 * 用户下拉菜单
                 */
                'user_show':function() {
                    $(".user-show").show();
                },
                'user_hide':function() {
                    $(".user-show").hide();
                },

                /**
                 * 边栏鼠标hover时图标为蓝色,用户下拉菜单图标颜色改变
                 */
                'color_change':function(){
                    $origin=$(this).find('img').attr('src');
                    var str="-hover";
                    $final="";
                    if($origin.indexOf(str)>=0 && (!$(this).hasClass('change'))){
                        $change=$origin.replace("-hover.png","");
                        $final=$change+'.png';
                    }else if($origin.indexOf(str)<0){
                        $change=$origin.replace(".png","");
                        $final=$change+'-hover.png';
                    }else{
                        $final=$origin;
                    }
                    $(this).find('img').attr('src',$final);
                },
            /**
             * 页面滚动固定边栏且边栏向上移
             */
            'scrollChange':function(){
                $(window).scroll(function(){
                    var winScroll = $(window).scrollTop();
                    if(winScroll>=55){
                        $('#console-sidebar').css('margin-top','-55px');
                    }else{
                        $('#console-sidebar').css('margin-top','0');
                    }
                });
            },
            /**
             * 绑定公共事件
             */
            'bind': function () {
                $(".dropdown").on('mouseover',this.user_show);
                $(".dropdown").on('mouseout',this.user_hide);
                $(".sidebar-nav>ul>li").on('mouseover',this.color_change);
                $(".sidebar-nav>ul>li").on('mouseout',this.color_change);
                $("ul.user-show>li").on('mouseover',this.color_change);
                $("ul.user-show>li").on('mouseout',this.color_change);
            }
        }
    };
});
