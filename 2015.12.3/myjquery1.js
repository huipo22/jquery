/*jQuery.fn.extend({
	mouseWheel:function(upcallback,downcallback){
		this.each(function(){
			mw(this,upcallback,downcallback)
		})
		function mw(obj,ucb,dcb){
			if(obj.attachEvent){
				obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
			}else if(obj.addEventListener){
				obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit
				obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
			}
			function scrollFn(e){
				var ev=e||window.event;
				if(ev.detail==-3||ev.wheelDelta==120){
					if(ucb){
						ucb.call();
					}
				}
				if(ev.detail==3||ev.wheelDelta==-120){
					if(dcb){
						dcb.call();
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
	}
})*/
jQuery.fn.extend({
	mousewheel:function(upcallback,downcallback){
		/*
		each:function(callback);

		callback:
				function(){
					mw(this,upcallback,downcallback)
				}
		*/
		this.each(function(){
			// console.log(this)
			mw(this,upcallback,downcallback)
		})
		function mw(obj,upcab,downcab){
			if(obj.attachEvent){
				obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
			}else if(obj.addEventListener){
				obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit
				obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
			}
			function scrollFn(e){
				var ev=e||window.event;
				if(ev.detail==-3||ev.wheelDelta==120){
					if(upcab){
						upcab.call();
					}
				}
				if(ev.detail==3||ev.wheelDelta==-120){
					if(downcab){
						downcab.call();
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
	}
})