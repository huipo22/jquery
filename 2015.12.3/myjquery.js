// function $(selctor){
// 	return new jquery(selctor);
// }
// function jquery(selctor){
// 	if(typeof selctor=="string"){
// 		if(selctor.charAt(0)=="."){
// 			var aa=document.getElementsByClassName(selctor.substr(1));
// 			this.length=aa.length;
// 			for(var i=0;i<aa.length;i++){
// 				this[i]=aa[i];
// 			}
// 		}else if(selctor.charAt(0)=="#"){
// 			return document.getElementById(selctor.substr(1));
// 			this.length=1;
// 		}
// 	}else if(typeof selctor=="function"){
// 		window.onload=function(){
// 			selctor();
// 		}
// 	}
// }
// jquery.prototype={
// 	each:function(callback){
// 		for(var i=0;i<this.length;i++){
// 			callback.call(this[i],i,this[i]);
// 		}
// 		return this;
// 	},
// 	html:function(val){
// 		if(val){
// 			this.each(function(i,obj){//回调each  i必传 否则this[i]怎么用
// 				obj.innerHTML=val;
// 			})
// 		}else{
// 			this[0].innerHTML;
// 		}
// 		return this;
// 	}
// 	/*eat:function(){
// 		alert("吃饭");
// 		return this;
// 	},
// 	game:function(){
// 		alert("游戏");
// 		return this;
// 	},
// 	run:function(){
// 		alert("跑")
// 		return this;
// 	}*/
// }
function $(selctor){
	return new jquery(selctor);
}
function jquery(selctor){
	if(typeof selctor=="string"){
		if(selctor.charAt(0)=="."){
			var aa=document.getElementsByClassName(selctor.substr(1))
			console.log(this.length)// 谁实例化 就是this
			this.length=aa.length;
			console.log(this.length)
			for(var i=0;i<aa.length;i++){
				this[i]=aa[i];
			}
		}
	}else if(typeof selctor=="function"){
		window.onload=function(){
			selctor();
		}
	}
}
/*jquery.prototype={
	each:function(callback){
		for(var i=0;i<this.length;i++){
			// console.log(this[i]);
			// console.log(i);
			callback.call(this[i],i,this[i])
			// console.log(this[i]);
		}
		return this;
	},
	html:function(val){
		if(val){//有值  each循环  给每个加val
			this.each(function(i,obj){
				// console.log(i);
				console.log(obj)
				obj.innerHTML=val;
			})
		}else{//没值，返回第一个的值
			this[0].innerHTML
		}
		return this;
	}
}*/
jquery.prototype={//prototype里面的内容是json
	each:function(callback){
		for(var i=0;i<this.length;i++){
			callback.call(this[i],i,this[i])
		}
		return this;
	},
	html:function(val){
		if(val){
			this.each(function(i,obj){
				obj.innerHTML=val;
			})
		}else{
			this[0].innerHTML;
		}
		return this;
	}
}