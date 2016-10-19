window.onload = function() {
	var win = $('.window')[0]; //获取类名
	var as = $('a', win); //获取a标签(win里面的a标签)
	var len = as.length;
	var lis = $('li', win);
	var lisImg = $('img',lis);
	var num = 0;
	var btn=$('.btn',win)[0];
	var btnL=$('.btnL',win)[0];
	var btnR=$('.btnR',win)[0];
	var flag=true;
	for (var i = 0; i < len; i++) {
		if (i == 0) {
			as[0].style.opacity=1;
			lis[0].style.background='red';
			continue;
		}
		as[i].style.opacity = 0;
	}
	var t;
	t = setInterval(moveR, 2000);

	win.onmouseover = function() {
		clearInterval(t);
		animate(btn,{opacity:1});
	}
	win.onmouseout = function() {
		t = setInterval(moveR, 2000);
		animate(btn,{opacity:0});
	}
	for (var i = 0; i < len; i++) {
		lis[i].index = i;
		lis[i].onmouseover = function() {
			num = this.index;
			for (var j = 0; j < len; j++) {
				animate(as[j],{opacity:0});
				animate(lisImg[j],{opacity:0});
				lis[j].style.background = '#262626';
			}
			animate(as[num],{opacity:1});
			animate(lisImg[num],{opacity:1});
			lis[num].style.background = 'red';
		}
	}

	btnR.onclick=function(){
		if(flag){
			moveR();
			flag=false;
		}
	}
	btnL.onclick=function(){
		if(flag){
			moveL();
			flag=false;
		}
	}
	function moveR() {
		num++;
		if (num == len) {
			lis[0].style.background = 'red';
			num = 0;
		}
		for (var i = 0; i < len; i++) {
			animate(as[i],{opacity:0});
			lis[i].style.background = '#262626';
			animate(lisImg[i],{opacity:0});
		}
		animate(as[num],{opacity:1},function(){
			flag=true;
		});
		animate(lisImg[num],{opacity:1},function(){
			flag=true;
		});
		lis[num].style.background = 'red';
	}
	function moveL() {
		num--;
		if (num <0) {
			lis[0].style.background = 'red';
			num = len-1;
		}
		for (var i = 0; i < len; i++) {
			animate(as[i],{opacity:0},function(){
				flag=true;
			});
			animate(lisImg[i],{opacity:0},function(){
				flag=true;
			});
			lis[i].style.background = '#262626';
		}
		animate(as[num],{opacity:1});
		animate(lisImg[num],{opacity:1});
		lis[num].style.background = 'red';
	}
}
	
