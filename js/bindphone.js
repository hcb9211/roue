// define(function(require, exports, module) {


    var Action = {
        bindEvent : function(){
            $('body').delegate('.js-tap', 'click', function(e){
                var handler = $(this).data('handler');
                Action[handler] && Action[handler].call(this);
            })
        },
        checkPhone: function(){
            var phone = $('#phone').val();
            phone = phone.replace(/(^\s+)|(\s+$)/g, '');

            //判断手机是否正确
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if(!myreg.test(phone))
            {
                return false;
            }
            return phone;
        },
        checkSmsCode: function(phone, callback){
            var smscode = $('#smsCode').val();
            if(smscode){
                smscode = smscode.replace(/(^\s+)|(\s+$)/g, '');
            }
            //检查验证码是否正确
            var pattern = new RegExp("^\\d{4}$");
            if(!smscode || !pattern.test(smscode)){
                $.Func.pop('请输入正确短信验证码！');
                return false;
            }
            var param = {
                "jsonrpc": "2.0",
                "method": "Other.VerifyVerificationCode",
                "id": 54321,
                "params" : {
                    "phone": phone,
                    "code": smscode
                }
            };

            $.Func.ajax(param, function(res){
                var result = res.result;
                if(result){
                    if(result.status > 1){
                        $.Func.pop(result.statusmsg);
                    }else{
                        $.isFunction(callback) && callback();
                    }
                }
            })
        },
        //发送验证码
        getSmsCode: function(){
            var that = this;
            var phone = Action.checkPhone();
            if(!phone){
                $.Func.pop('请输入有效的手机号码！');
                return false;
            }

            var param = {
                "jsonrpc": "2.0",
                "method": "Other.SendVerificationCode",
                "id": 54321,
                "params" : {
                    "phone": phone
                }
            };

            var disabled = $(that).attr('disabled');
            if(!disabled){   //如果不可点，就不能再发送验证码
                $.Func.ajax(param, function(res){
                    var result = res.result;
                    if(result){
                        var disabled = $(that).attr('disabled');
                        var seconds = 60;
                        $(that).addClass('disabled').attr('disabled', 'disabled').html(seconds + 's');
                        var timer = setInterval(function(){
                            seconds--;
                            if(seconds>0){
                                $(that).html(seconds +'s');
                            }else{
                                $(that).removeClass('disabled').removeAttr('disabled').html('重新发送');
                                clearInterval(timer);
                                null;
                            }
                        }, 1000);
                    }else{
                        $.Func.pop(res.error.message);
                    }
                })
            }

        },
        //绑定APP
        bindAPP: function(phone, passwd, callback){
            var param = {
                "id" : 54321,
                "jsonrpc" : "2.0",
                "method" : "User.Regist",
                "params" : {
                    "channel" : 98,
                    "mobile" : phone,
                    "nickname" : "",
                    "passwd" : passwd,
                    "category":"regist",
                    "inviteCode":""
                 }
            };

            $.Func.ajax(param, function(data){
                $.isFunction(callback) && callback(data);
            });
        },
        //关闭谈层
        closeLayer: function(){
            $('#layer').removeClass('show');
        },
        submit: function(){
            var phone = Action.checkPhone();
            var passwd = $('#password').val();

            if(!passwd){
                return;
            }

            var url = 'index.html';
            //查看验证码是否正确
            alert(1);
            var smsCode = Action.checkSmsCode(phone, function(res){
                alert(2);
                //如果还没绑定APP，自动绑定
                Action.bindAPP(phone, passwd, function(res){
                    var result = res.result;
                    if(result){
                        //成功后，两秒内跳转回去首页
                        switch (result.status){
                            case 1:
                                $('body').addClass('show-result');
                                if(url){
                                    setTimeout(function () {
                                        location.href = url;
                                    }, 2000);
                                }
                                break;
                            case 2:
                                if(url) {
                                    location.href = url;
                                }else{
                                    $('body').addClass('show-result');
                                }
                                break;
                            default:
                                $.Func.pop(result.statusmsg);
                        }
                    }else{
                        $.Func.pop(res.error.message);
                    }
                });

            });

        },
        init : function(){
            $.Func.getUserInfo();
            Action.bindEvent();

        }
    }

    Action.init();

    // module.exports = Action;
// });