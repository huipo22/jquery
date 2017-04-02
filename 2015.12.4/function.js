//window.onload=function(){
	//1.获取类名的兼容函数
	//classname:类名要加引号
	//obj:父容器，表示从哪个父容器里来获取子容器
	// alert(1);

	function getClass(classname,obj){
		var obj=obj||document;//只要有一个为真它就为真，如果obj存在，就赋值给声明的obj，
		//如果不存在，就document赋值给声明的obj（声明的obj表示从哪个对象里获取）
		if(obj.getElementsByClassName){//为真时表示是现代浏览器
			return obj.getElementsByClassName(classname)
		}else{
			var alls=obj.getElementsByTagName("*");//获取所有标签元素
			var arr=[];
			for(var i=0;i<alls.length;i++){//遍历这个alls集合
				if(checkClass(alls[i].className,classname)){
					arr.push(alls[i]);
				}
			}
		}
		return arr;//如果为真，则保存在数组中
	}
	function checkClass(str,classname){//检测一个元素里是否有我们想要找的类名
		var newarr=str.split(" ");//将元素的类名（字符串）中的空格分割成数组
		for(var i in newarr){//遍历这个数组，那数组中的每一个值与classname比较
			if(newarr[i]==classname){//如果相同，表示找到了，这个函数返回真
				return true;
			}
		}
		return false;//等这个数组遍历完成以后，如果还没有找到相同的类名，则这个函数返回假
	}

	/**************************************************/
	//2.获取与设置对象的纯文本的兼容函数
	//obj:从哪个对象里来获取纯文本
	//val:表示要设置的文本
	//ff	obj.textContent
	//ie    obj.innerText
	function getText(obj,val){		
		if(val!=undefined){  //获取
			if(obj.textContent||obj.textContent==""){//有值或者为空字符串，保留下来
				obj.textContent=val;
			}else{
				obj.innerText=val;
			}

		}else{
			if(obj.textContent){	//为真表示是W3C的浏览器
				return obj.textContent;
			}else{			//表示IE
				return obj.innerText;
			}
		}
		
	}


	/**************************************************/
	//3.获取外部与行内样式的属性
	//FF:window.getComputedStyle(obj,null).width
	//IE:obj.currentStyle.width
	/*//1.自己写的
	function getStyle(obj,val){
		if(obj.currentStyle){
			return obj.currentStyle[val]
		}else{
			return getComputedStyle(obj,null)[val]
		}
	}*/
	//2.
	function getStyle(obj,attr){
		if(window.getComputedStyle){//FF
			return parseInt(window.getComputedStyle(obj,null)[attr]);
		}else{//IE
			return parseInt(obj.currentStyle[attr]);
		}
	}


	/**************************************************/
	//document.getElementById();
	//$(".one");
	//$("#first")
	//$("div")
	//4.
	function $(selector,obj){
		var obj=obj||document;
		if(typeof selector=="string"){//判断selector是否是字符串
			selector=selector.replace(/^\s*|\s*$/g,"");//找出字符串前后的空格
			if(selector.charAt(0)=="."){//classname
				return getClass(selector.slice(1),obj);
			}else if(selector.charAt(0)=="#"){//id
				return obj.getElementById(selector.slice(1))
			}else if(/^[a-z][a-zA-Z1-6]{1,6}$/g.test(selector)){//TagName
				return obj.getElementsByTagName(selector);
			}
		}else if(typeof selector=="function"){
			window.onload=function(){
				selector();
			}
		}	
		return 'false12'
	}
	
	/**************************************************/
	//5.获取对象的子节点
	//a:只获取元素节点
	//b:获取元素+文本节点
	function getChilds(father,type){
		var type=type||"a";//type没有赋值时，默认为"a"第二个参数省略是，默认只获取元素节点）
		var childs=father.childNodes;//找到所有的儿子
		var arr=[];//声明一个容器
		for (var i = 0; i < childs.length; i++) {
			if(type=="a"){//获得元素节点
				if(childs[i].nodeType==1){//节点类型为1表示是元素节点
					arr.push(childs[i]);//保存在数组中
				}
			}else if(type=="b"){//获得元素+文本节点
				if(childs[i].nodeType==1 || 
					(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" &&childs[i].nodeType!=8)){
					//节点类型为1或者（文本节点中的值不为空，并且也不为注释节点）
					arr.push(childs[i]);
				}
			}
			
		}
		return arr;
	}
/*	function getChilds(father,type){
		var type=type||"a";
		var childs=father.childNodes;
		var arr=[];
		for(var i=0;i<childs.length;i++){
			if(type=="a"){
				if(childs[i].nodeType==1){
					arr.push(childs[i]);
				}
			}else if(type=="b"){
				if(childs[i].nodeType==1||(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&childs[i].nodeType!=8)){
					arr.push(childs[i]);
				}
			}
		}
		return arr;
	}*/
/*	function getChilds(father,type){
		var type=type||"a";
		var	childs=father.childNodes;
		var arr=[];
		for(var i=0;i<childs.length;i++){
			if(type=="a"){
				if(childs[i].nodeType==1){
					arr.push(childs[i])
				}
			}else if(type=="b"){
				if(childs[i].nodeType==1 ||
					(childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&childs[i].nodeType!=8)){
					arr.push(childs[i])
				}
			}
		}
		return arr; 
	}*/

	/**************************************************/
	//6.获取第一个子节点
	function getFirst(father){
		return getChilds(father)[0];
	}

	/**************************************************/
	//7.获取最后一个子节点
	function getLast(father){
		return getChilds(father)[getChilds(father).length-1];
	}

	/**************************************************/
	//8.获取指定的子节点
	function getNum(father,val){
		return getChilds(father)[val];
	}

	/**************************************************/
	//9.获取下一个兄弟节点
	function getDown(obj){
		var down=obj.nextSibling;
		while(down.nodeType==3||down.nodeType==8){
			down=down.nextSibling;
			if(down==null){
				return false;
			}
		} 
		return down;
	}

	/**************************************************/
	//10.获取上一个兄弟节点
	function getUp(obj){
		var up=obj.previousSibling;
		if(up==null){
			return false
		}
		while(up.nodeType==3||up.nodeType==8){
			up=up.previousSibling;
			if(up==null){
				return false;
			}
		}
		return up;
	}
/*	function getUp(obj){
		var up=obj.previousSibling;
		if(up==null){
			return false;
		}
		while(up.nodeType==3||up.nodeType==8){
			up=up.previousSibling;
			if(up==null){
				return false;
			}
		}
		return up;
	}*/

	/**************************************************/
	//11.要插入到某个对象之后
	//newobj:要追加的对象
	//obj:在哪个对象之前
	//对象共有的方法一般是加载原型上的。而原型只能给构造函数添加
	//所以共有的方法是添加到对象的构造函数的原型上的
	//this:值得是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象
	Node.prototype.insertAfter=function(newobj,obj){
		var down=getDown(obj);//获取obj的下一个兄弟节点
		if(down){//如果这个兄弟节点存在
			this.insertBefore(newobj,down);//就把
			//newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
		}else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
			this.appendChild(newobj);
			//直接追加到父对象的后面
		}
	}


	/**************************************************/
	//12.漂浮窗
	//box：漂浮窗口
	//close：关闭按钮
	//speedx：x轴的速度
	//speedy：y轴的速度
	function floatwindow(div,close,speedx,speedy){
		div.style.position="fixed"
		var t=setInterval(move,60);
		var speedX=speedx||5;//x轴 速度x
		var speedY=speedy||5;//y轴 速度y
		var cw=document.documentElement.clientWidth;//浏览器的宽度
		var ch=document.documentElement.clientHeight;//浏览器的高度
		var sw=div.offsetWidth;//自身的宽度
		var sh=div.offsetHeight;//自身的高度

		/*window.onload 文档加载完成事件
		window.onscroll 文档滚动条事件
		window.onresize 窗口改变事件*/

		window.onresize=function(){
			cw=document.documentElement.clientWidth;//浏览器的宽度
			ch=document.documentElement.clientHeight;//浏览器的高度
		}
		function move(){
			var selfleft=div.offsetLeft;//自身的左边距
			var selftop=div.offsetTop;//自身的上边距
			var newleft=selfleft+speedX;//加速之后的左边距
			var newtop=selftop+speedY;//加速之后的上边距
			//alert(newtop);

			//边界
			//cw 浏览器的宽  ch 浏览器的高
			//sw 自身的宽  sh 自身的高
			//X    0------(cw-sw)
			//Y    0------(ch-sh)

			if(newtop>=(ch-sh)){//下 	超出就返回
				newtop=ch-sh;//上边距的最大值
				speedY*=-1;//变成负值
			}
			if(newleft>=(cw-sw)){//右
				newleft=cw-sw;//左边距的最大值
				speedX*=-1;//变成负值
			}
			if(newtop<=0){//上
				newtop=0;
				speedY*=-1;
			}
			if(newleft<=0){//左
				newleft=0;
				speedX*=-1;
			}
			div.style.left=newleft+"px";
			div.style.top=newtop+"px";
		}
		box.onmouseover=function(){
			clearInterval(t);
		}
		box.onmouseout=function(){
			t=setInterval(move,60)
		}
		close.onclick=function(){
			div.style.display="none"
		}
	}

/*	function floatwindow(div,close,speedx,speedy){
		div.style.position="fixed";
		var t=setInterval(move,60);
		var speedX=speedx||5;
		var speedY=speedy||5;
		var cw=document.documentElement.clientWidth;
		var ch=document.documentElement.clientHeight;
		var sw=div.offsetWidth;
		var sh=div.offsetHeight;

		window.onresize=function(){
			cw=document.documentElement.clientWidth;
			ch=document.documentElement.clientHeight;
		}
		function move(){
			var sl=div.offsetLeft;
			var st=div.offsetTop;
			var newleft=sl+speedX;
			var newtop=st+speedY;
			if(newtop>=(ch-sh)){
				newtop=ch-sh;
				speedY*=-1;
			}
			if(newleft>=(cw-sw)){
				newleft=cw-sw;
				speedX*=-1;
			}
			if(newtop<=0){
				newtop=0;
				speedY*=-1;
			}
			if(newleft<=0){
				newleft=0;
				speedX*=-1;
			}
			div.style.left=newleft+"px";
			div.style.top=newtop+"px";
		}
		div.onmouseover=function(){
			clearInterval(t);
		}
		div.onmouseout=function(){
			t=setInterval(move,60);
		}
		close.onclick=function(){
			div.style.display="none";
		}
	}*/
	/**************************************************/
	//13.同一事件添加多个处理程序的兼容函数
	function addEvent(obj,event,fun){
		if(obj.addEventListener){
			return obj.addEventListener(event,fun,false)
		}else{
			return obj.attachEvent("on"+event,fun)
		}
	}	

	/**************************************************/
	//14.同一事件移除多个处理程序的兼容函数
	function removeEvent(obj,event,fun){
		if(obj.removeEventListener){
			return obj.removeEventListener(event,fun,false)
		}else{
			return obj.detachEvent("on"+event,fun)
		}
	}

	/**************************************************/
	//15.鼠标滚轮函数
	//obj:要执行滚轮事件的对象
	//upfun:往上滚动的处理程序
	//downfun:往下滚动的处理程序

	function mouseWheel(obj,upfun,downfun){
		//添加滚轮事件的兼容问题
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit
			obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
		}
		function scrollFn(e){
			var ev=e || window.event;
			if(ev.detail==-3 || ev.wheelDelta==120){//往上
				if(upfun){//往上滑的事件存在
					upfun.call(obj);
				}
			}

			if(ev.detail==3 || ev.wheelDelta==-120){//往下
				if(downfun){//往下滑的事件存在
					downfun.call(obj);
				}
			}

			if (ev.preventDefault){
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			}	
			else{
				ev.returnValue = false;//IE中阻止函数器默认动作的方式
			}
					
		}
	}	


	/**************************************************/
	//16.hover
	//判断某个元素是否包含有另外一个元素
	 function contains (parent,child) {
	  if(parent.contains){
	     return parent.contains(child) && parent!=child;
	  }else{
	    return (parent.compareDocumentPosition(child)===20);
	  }
	 }

	//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
	  function checkHover (e,target) {
	   if(getEvent(e).type=="mouseover"){
	      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
	    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	   }else{
	    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
	    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	    }
	  }
	//鼠标移入移出事件
	/*
	  obj   要操作的对象
	  overfun   鼠标移入需要处理的函数
	  outfun     鼠标移除需要处理的函数
	  */
	  function hover (obj,overfun,outfun) {
	  	if(overfun){
	  		obj.onmouseover=function  (e) {
	  			if(checkHover(e,obj)){
	  				overfun.call(obj,[e]);
	  			}
	  		}
	  	}
	  	if(outfun){
	  		obj.onmouseout=function  (e) {
	  			if(checkHover(e,obj)){
	  				outfun.call(obj,[e]);
	  			}
	  		}
	  	}
	  }
	  function getEvent (e) {
	  	return e||window.event;
	  }
	  /********************************/
	  //17.
	  function getObj(){
	  	return obj=document.documentElement.scrollTop?document.documentElement:document.body;
	  }


	/********************************/
	  //18. jiedianlunbo
	  function jiedianlunbo(imgsbox,leftbtn,rightbtn){
		var imgsbox=$(imgsbox)[0];
		var leftbtn=$(leftbtn)[0];
		var rightbtn=$(rightbtn)[0];
		var t=setInterval(moveleft,2000);
		//左移
		function moveleft(){
			animate(imgsbox,{left:-600},450,Tween.Linear,function(){
				var first=getFirst(imgsbox);
				imgsbox.appendChild(first);
				imgsbox.style.left=0;
			})	
		}
		//右移
		function moveright(){
			var last=getLast(imgsbox);
			imgsbox.insertBefore(last,getFirst(imgsbox));
			imgsbox.style.left="-600px";//当在-600px的位置 才能右移
			animate(imgsbox,{left:0},450,Tween.Linear);
		}
		//左边按钮划下来
		leftbtn.onmouseover=rightbtn.onmouseover=function(){
			clearInterval(t);
		}
		//右边按钮划下来
		leftbtn.onmouseout=rightbtn.onmouseout=function(){
			t=setInterval(moveleft,2000);
		}
		//点击左边按钮
		leftbtn.onclick=function(){
			moveleft();
		}
		//点击右边按钮
		rightbtn.onclick=function(){
			moveright();
		}
	  }


	/********************************/
	function selectmenu(menubox,yiji,erji){
		var menubox=$(menubox)[0];
		var cw=document.documentElement.clientWidth;
		var sw=menubox.offsetWidth;
		var yiji=$(yiji);
		var erji=$(erji);
		for(var i=0;i<yiji.length;i++){
			yiji[i].index=i;
			hover(yiji[i],function(){
				var lis=$("li",erji[this.index]);
				var h=lis[0].offsetHeight;
				erji[this.index].style.height=0;
				animate(erji[this.index],{height:h*lis.length},400,Tween.Linear)
			},function(){
				animate(erji[this.index],{height:0},400,Tween.Linear)
			})
		}
	}	

	/********************************/
	//16.阻止事件流的兼容函数
	//obj:事件对象
	function stopEvent(obj){
		if(obj.stopPropagation){
			obj.stopPropagation();//FF
		}else{
			obj.cancelBubble=true;//IE
		}
	}

	/********************************/
	function stopClient(obj){
		if(obj.preventDefault){
			obj.preventDefault();//阻止默认浏览器动作
		}else{
			obj.returnValue=false;//IE中阻止函数器默认动作的样式
		}
	}


	/*
		获取具有定位属性的父元素  相对于body的left top值
		offset(obj).left 相对于body left
		offset(obj).top 相对于body top
	*/
	function offset(obj){
	var parent=obj.parentNode;//获取父元素
	var arr=[];//数组，放父元素的数组
	var x=0;
	var y=0;
	while(parent.nodeName!=="BODY"){//判断父元素是不是BODY   只要不是BODY 就一直循环
		var attr=getStyle(parent,"position")//获取父元素的样式 调用getStyle函数
		if(attr=="absolute"||attr=="fixed"||attr=="relative"){
			arr.push(parent);//放入数组zhong
		}
		parent=parent.parentNode; //如果有父元素，接着往上找
	}
	//遍历数组    left  border  top  border
	for(var i=0;i<arr.length;i++){
		var top=arr[i].offsetTop;//获取自身的top
		var borderT=parseInt(getStyle(arr[i],"borderTopWidth"))//自身top的border
		y+=top+borderT;
		var left=arr[i].offsetLeft; 
		var borderL=parseInt(getStyle(arr[i],"borderLeftWidth"));
		x+=left+borderL;
	}
	return {left:x,top:y}//返回一个json  left top
}

	function isType(o,type){
		if(Object.prototype.toString.call(o)=='[object'+type+']'){
			return true;
		}
		return false;
	}
	function isArray(o){
		return isType(o,'Array');
	}
	function isObject(o){
		return isType(o,'Object')
	}
//}