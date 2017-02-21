var mask=document.getElementById("mask");
var maskLi=mask.getElementsByTagName("li");
var top1=document.getElementById("top");
var topA=top1.getElementsByTagName("a");
var smallUl=document.getElementById("smallUl");
var smallLi=smallUl.getElementsByTagName("li");
var bigUl=document.getElementById("bigUl");
var bigLi=bigUl.getElementsByTagName("li");
var num=0;
var last=0;
for(var i=0;i<maskLi.length;i++){
	maskLi[i].index=i;
	
	maskLi[i].onmouseover=function(){
		console.log(topA[this.index])
		topA[this.index].style.opacity=".8";	
	}
	maskLi[i].onmouseout=function(){
		topA[this.index].style.opacity="0";
	}
}
for(var i=0;i<topA.length;i++){
	topA[i].index=i;	
	topA[i].onmouseover=function(){
		console.log(topA[this.index])
		this.style.opacity=".8";	
	}
	topA[i].onmouseout=function(){
		this.style.opacity="0";
	}
}

for(var i=0;i<smallLi.length;i++){
	var indexN=2;
	smallLi[i].index=i;
	smallLi[i].onoff=false;
	length1=smallLi.length;

	smallLi[i].onclick=function(){
		num=this.index;
		if(this.onoff==false){			
			tab(this,this.index,length1)
		}
		
	}
}

next.onclick=function(){
	num++;
	num%=smallLi.length;	
	tab(smallLi[num],num,smallLi.length)
	
}
pre.onclick=function(){
	num--;
	num=num<0?smallLi.length-1:num;
	tab(smallLi[num],num,smallLi.length)
}


function tab(a,index,n){
	
	smallUl.style.width=(smallLi[0].offsetWidth+5)*smallLi.length+"px";
	for(var i=0;i<smallLi.length;i++){
		smallLi[i].style.opacity=".6";
		smallLi[i].onoff=false;
		smallLi[i].style.marginRight="5px";
		if(i!=last){
			bigLi[i].style.zIndex=2;
		}else{
			bigLi[i].style.zIndex=3;
		}		
	}
	move(a,{opacity:1},300,"linear");
	bigLi[index].style.zIndex=5;
	bigLi[index].style.height="0px";
	move(bigLi[index],{height:419},10,"linear");

	if(index==0||index==1){
		smallUl.style.left="0";
	}else if(index==n-1){
		smallUl.style.left="0";
		move(smallUl,{left:-(index-2)*165},10,"linear");
	}
	else{
		smallUl.style.left="0";
		move(smallUl,{left:-(index-1)*165},10,"linear");
	}
	
	last=index;
	a.onoff=true;
}


function move(obj,object1,duration,tween,fn){
	var tween = tween||"linear";
	var startTime = new Date().getTime();
	var d = duration;
	var j = {};
	for(var a in object1){
		j[a] = {};
		j[a].b = parseFloat( getComputedStyle(obj)[a] );
		j[a].c = object1[a] - j[a].b;
	}


	obj.timer = setInterval(function(){
		var t = new Date().getTime() - startTime;//已过时间
		if(t>=d){
			t = d
		}
		for(var a in j){
			var b = j[a].b;
			var c = j[a].c;
			var v = c/d*t+b;
			if(a=="opacity"){
				obj.style[a] = v;
			}else{
				obj.style[a] = v + "px";
			}
		}
		if(t==d){
			clearInterval(obj.timer);
			fn&&fn();
		}
		
	},16)
	
}