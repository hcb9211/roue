/**
 * Created by Administrator on 2016/8/19.
 */
var phone=$("#phone");
var password=$("#password");
var btn=$(".btn");
btn.click(function () {
    var phoneVal=phone.val();
    var passVal=password.val();
    var hash=hex_md5(passVal);



    var param={
        "id" : 54321,
        "jsonrpc" : "2.0",
        "method" : "User.Regist",
        "params" : {
            "channel" : 98,
            "mobile" :phoneVal,
            "nickname" : "",
            "passwd" : hash,
            "category":"regist",
            "inviteCode":""
         }
  }
    $.ajax({
        url:"http://app.api.gupiaoxianji.com/v3.5.3",
        type:"POST",
        contentType:"application/json",
        dataType:"json",
        data:JSON.stringify(param),
        success:function (res) {
            console.log(JSON.stringify(res))
            
        }
    })

})