
/* 详细规则 */
var rules=$(".rules");
var mask=$(".mask");
var rule=$(".rule");
rules.click(function () {
    mask.css({opacity:1});
    rule.css({opacity:1});
    // $("html,body").css("overflow","hidden");
})

var close=$(".close");
close.click(function () {
    rule.css("opacity",0);
    mask.css({opacity:0});
})

/* 点我涨收益 */
var touch=$(".touchBtn");
var chui=$(".chui");

touch.click(function () {
    var time=2;
    var t=setInterval(function(){
        time--;
        chui.css({
            transform:"scale(0.9,0.98)",
            animation:"touch .3s ease infinite",
        });
        if(time<=0){
            $(".chui").css({
                transform:"scale(0,0)",
                animation:"touch 0s ease infinite",
            });
            $(".mask").css({opacity:1});
            $(".touch_suc").css({opacity:1});
            // $("html,body").css("overflow","hidden");
            clearInterval(t);
        }
    },1000)
})
var touch_suc= $(".touch_suc");

touch_suc.click(function () {
    var times=1;
    var t=setInterval(function () {
        times--;
        if(times<=0){
            mask.css({opacity:0});
            touch_suc.css({opacity:0});
            clearInterval(t)
        }
    })
})

/* 手机号未验证弹窗 */
var left=$(".btn_left");
var right=$(".btn_right");
left.click(function () {
    location.href=" "
})
right.click(function () {
    $(".notice").css({
        opacity:0,
        transform:"scale(0,0)"
    })
    // $("html,body").css({overflow:"auto"})
})


/* 搜索股票 */
var param={
    "id" : 54321,
    "jsonrpc" : "2.0",
    "method" : "Stock.Base",
    "params": {
        "version":0
    }
};
$.ajax({
    url:"http://app.api.gupiaoxianji.com/v3.5.3",
    type:"POST",
    contentType:"application/json",
    dataType:"json",
    data:JSON.stringify(param),
    success:function (res) {
        var data = res.result.data;
        var vm= new Vue({
            el:"#stocks",
            data:{
                stocks: data
            },
            methods: {
                stockFilter: function(stock) {
                    var s = this.search;
                    return s &&
                        (stock.stockid.indexOf(s) != -1
                        || stock.stockname.indexOf(s) != -1
                        || stock.pinyin.indexOf(s) != -1)
                        ;
                }
            }
        })
    }
})




/* 用户选股 */
var searchInput=$("#searchVal");
var tiaozhan=$(".enter_1");
searchInput.blur(function () {
    var searchVal=searchInput.val();
    console.log(searchVal);
    var id=$(".li .stockid").text();
    var name=$(".li .srockname").text();
    var pinyin=$(".li .pinyin").text();
    if(searchVal==pinyin||searchVal==id||searchVal==name){
        tiaozhan.click(function () {
            location.href="roue3.html";

            var param={
                "id" : 54321,
                "jsonrpc" : "2.0",
                "method" : "Activity.SelectStock",
                "params": {
                    "phone":15235620304,
                    "stockid":id
                }
            }
            $.ajax({
                url:"http://app.api.gupiaoxianji.com/activity",
                type:"POST",
                contentType:"application/json",
                dataType:'json',
                data:JSON.stringify(param),
                success:function (res) {
                    console.log(JSON.stringify(res));
                }
            })


        })
    }
    else{
        tiaozhan.click(function () {
            $(".tishi").css({
                opacity:1,
                transform:"scale(2,2)"
            })
            var time=1;
            var t=setInterval(function () {
                time--;
                if(time<=0){
                    $(".tishi").css({
                        opacity:0,
                        transform:"scale(0,0)"
                    })
                    clearInterval(t);
                }
            },2000)
        })
    }
})

/* 修改荐股 */
var update=$(".update");
update.click(function () {
    location.href="roue2.html";
})



