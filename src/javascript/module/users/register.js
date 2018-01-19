/**
 * 注册模块
 *
 * 在注册模块中写注册页需要用到的函数，和逻辑
 * 然后在注册页面中进行调用
 */


define(function (require, exports, module) {
    var $ = require('jquery');
    var api = require('api').user;

    module.exports = {

        'main': function () {

            // 第一步提交逻辑
            this.first_step_commit();

            // 第二步行业展示逻辑
            this.second_step_show();

            // 第二步提交逻辑
            this.second_step_commit();

        },

        /**
         * 第一步提交逻辑
         */
        'first_step_commit': function () {
            $("#next").click(function () {
                var account = $("#account").val();
                var password = $("#password").val();
                var confirm = $("#confirm").val();

                var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

                if (!account) {
                    $('p.first-step.err-msg').text('邮箱不能为空, 请重新输入!');
                    return false;
                } else if (!email.test(account)) {
                    $('p.first-step.err-msg').text('邮箱的格式不正确, 请重新输入!');
                    return false;
                } else if (!password) {
                    $('p.first-step.err-msg').text('密码不能为空, 请重新输入!');
                    return false;
                } else if (!confirm) {
                    $('p.first-step.err-msg').text('再次确认密码不能为空, 请重新输入!');
                    return false;
                } else if (password != confirm) {
                    $('p.first-step.err-msg').text('确认密码与密码不一致, 请重新输入!');
                    return false;
                } else {
                    api.check_account(account).then(function (data) {
                        console.log(data);
                        if (data["success"]) {
                            // 校验成功 展示下一步
                            $("#first-step").css("display", "none");
                            $("#second-step").css("display", "block");
                            $("ul li:eq(1)").addClass("active");
                        } else {
                            // 后台注册发生错误时候的逻辑
                            $('p.first-step.err-msg').html(data["msg"]);
                        }
                    });
                }
            });
        },

        /**
         *  第二步行业展示逻辑
         */
        'second_step_show': function () {
            // 默认展示第一个主行业的子行业信息
            $('option[data-sub-id=0]').show();
            $("select#industry").change(function (event) {
                //切换行业时获取主行业ID
                var hub_id = $(this).find("option:selected").attr("data-hub-id");
                //隐藏其他行业的子行业选项
                $('option[data-sub-id]').hide();
                //显示当前行业的子行业选项
                $('option[data-sub-id=' + hub_id + ']').show();
                //默认子行业选项的第一个为已选
                $('option[data-sub-id=' + hub_id + ']:eq(0)').attr('selected', true);
            });
        },

        /**
         * 第二步提交逻辑
         */
        'second_step_commit': function () {
            $("#register").click(function () {
                var name = $("#name").val();
                var phone = $("#phone").val();
                var enterprise = $("#enterprise").val();

                if (!name) {
                    $('p.second-step.err-msg').text('您的姓名输入不能为空, 请重新输入! ');
                    return false;
                } else if (!phone) {
                    $('p.second-step.err-msg').text('您的手机号码不能为空, 请重新输入! ');
                    return false;
                } else if (!/1[3|4|5|7|8]\d{9}$/.test(phone)) {
                    $('p.second-step.err-msg').text('您的手机号码输入有误, 请重新输入! ');
                    return false;
                } else if (!enterprise) {
                    $('p.second-step.err-msg').text('您的企业不能为空, 请重新输入! ');
                    return false;
                }else if (!$("#read").is(':checked')) {
                    // 没有勾选阅读协议时的逻辑
                    $('p.second-step.err-msg').text('您未勾选已阅读协议');
                    return false;
                } else {

                    // 账号信息
                    var account = $("#account").val();
                    var password = $("#password").val();
                    var confirm = $("#confirm").val();

                    // 用户信息
                    var userInfo = {
                        name: name,
                        phone: phone,
                        enterprise: enterprise,
                        industry: $("#industry option:selected").val(),
                        subIndustry: $("#sub-industry option:selected").val()
                    };
                    console.log(userInfo);

                    // 执行注册
                    api.register(account, password, confirm, userInfo).then(function (data) {
                        if (data['success']) {
                            // 展示完成页面
                            $("#second-step").css("display", "none");
                            $("#third-step").css("display", "block");
                            $("ul li:last").addClass("active");
                        } else {
                            // 服务器错误,返回错误信息
                            var msg = data['msg'];
                            $('p.second-step.err-msg').text(msg);
                        }
                    });
                }
            });
        }

    }

});
