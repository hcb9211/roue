var winW=$(window).width();
var heiH=$(window).height();

var width=$("html").width();
var height=$("html").height();

/* 遮罩 */
var mask=$(".mask");
mask.width(width);
mask.height(height);

/* 详细规则 */
var rules=$(".rules");
var rule=$(".rule");
var ruleH=rule.height();
var ruleTop=(heiH-ruleH)/2;
rules.css({zIndex:99});
rules.click(function () {
    mask.css({
        opacity:1,
        zIndex:0,
        display:"block"
    });
    rule.css({
        opacity:1,
        zIndex:88,
        position:"fixed",
        left:0,
        top:ruleTop
    });

    $(".phoneBox").css({zIndex:0});
    $(".touchBtn").css({zIndex:0});
    $(".tiaozhan").css({zIndex:0});
    $(".ruleBox").css({zIndex:0});
    $(".enter_1").css({zIndex:0});
    $("html,body").css("overflow","hidden");
})

var close=$(".close");
close.click(function () {
    rule.css({
        opacity:0,zIndex:10
    });

    mask.css({
        opacity:0,
        zIndex:0,
        display:"none"
    });
    $(".phoneBox").css({zIndex:30});
    $(".touchBtn").css({zIndex:30});
    $(".tiaozhan").css({zIndex:30});
    $(".enter_1").css({zIndex:30});
    $("html,body").css("overflow","auto");
})

/*/!* 点我涨收益 *!/
var touch=$(".touchBtn");
var chui=$(".chui");
var tops=heiH*.00001;
var lefts=winW*.07;

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
            $(".mask").css({opacity:1,display:"block",zIndex:10});
            $(".rules").css({zIndex:999,position:"relative",left:0,top:0});
            $(".touch_suc").css({
                position:"fixed",
                left:lefts,top:tops,
                opacity:1,
            });
            $("html,body").css("overflow","hidden");
            clearInterval(t);
        }
    },1000)
})
/!* 敲打提示 *!/
var touch_suc= $(".touch_suc");
var hit_suc=$("#hit_suc");
var hitH=hit_suc.height();
var hit_close=$(".hit_close");

hit_close.css({zIndex:999,opacity:1})

touch_suc.click(function () {
    var times=1;
    var t=setInterval(function () {
        times--;
        if(times<=0){
            touch_suc.css({opacity:0,zIndex:0});
            mask.css({zIndex:0,opacity:0})
            $("html,body").css("overflow","auto");
            clearInterval(t)
        }
        hit_suc.css({
            opacity:1,zIndex:20
        })
    })
})*/
/* 我要挑战的位置 */
var enterbox=$(".enterBox");
var enters=$(".enter");
var enterboxW=enterbox.width();
var enterPos=((winW-enterboxW)/2-20)+"px";
enters.css({
    position:"absolute",
    left:enterPos,top:0
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
                stocks: data,
            },
            methods: {
                stockFilter: function(stock) {
                    var s = this.search;
                    return s &&
                        (stock.stockid.indexOf(s) != -1
                        || stock.stockname.indexOf(s) != -1
                        || stock.pinyin.indexOf(s) != -1)
                        ;
                },
                selectStock: function (e) {
                    e.preventDefault();
                    var target = e.target.parentNode;
                    var stockid = target.dataset.stock;
                    this.search = stockid;
                }
            }
        })
    }
})



/* 解决层级问题 */
var touchBtn=$(".touchBtn");
var touch_suc=$(".touch_suc");
touchBtn.css({zIndex:1});
$(".tiaozhan").css({zIndex:1});
touchBtn.click(function () {
    touch_suc.css({zIndex:30});
    mask.css({zIndex:10});
    touchBtn.css({zIndex:9})
    $(".tiaozhan").css({zIndex:9});
    $(".phoneBox").css({zIndex:9});
    $(".enterBox").css({zIndex:9});
    $(".tuiIndex").css({zIndex:9});
})





