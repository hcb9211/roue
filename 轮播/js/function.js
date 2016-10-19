 function getClass(className){
	//设置获取元素的范围
	var range=range?range:document;
	//var range=range||document;
	//判断浏览器
	if(document.getElementsByClassName){
		//w3c
		return document.getElementsByClassName(className);
	}
	else{
		//ie6-8
		//arr 保存指定的className对象
		var arr=[];
		//1.获取所有的元素
		var all=document.getElementsByTagName('*');
		//2.挑选指定的元素
		for(var i=0;i<all.length;i++){
			//函数：判断当前元素的className是否包含指定的className
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		//3.挑选完毕，将数组输出
		return arr;
	}
 }
 //检查obj(当前元素的className)里面是否包含className obj:'one two' className:'one'
 function checkClass(obj,className){
 	//先把ob拆分成数组j
 	var arr=obj.split(' ');
 	for(var i=0;i<arr.length;i++){
 		if(arr[i]==className){
 			return true;
 		}
 	}
 	return false;
 } 

//获取指定元素的样式 obj 指定的元素  attr 指定的样式
 function getStyle(obj,attr){
	if(obj.currentStyle){
			return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}


/*
	$('')
	.one 获取类名
	#one 获取id
	div 获取标签
*/
function $(selecter){
	//判断首字符
	if(selecter.charAt(0)=='.'){
		return getClass(selecter.slice(1));
	}else if(selecter.charAt(0)=='#'){
		return document.getElementById(selecter.slice(1));
	}else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
		return document.getElementsByTagName(selecter);
	}
}


function $(selecter,ranges){
	var ranges=ranges?ranges:document;
	//判断首字符
	if(selecter.charAt(0)=='.'){
		return getClass(selecter.slice(1));
	}else if(selecter.charAt(0)=='#'){
		return document.getElementById(selecter.slice(1));
	}else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
		return ranges.getElementsByTagName(selecter);
	}
}


