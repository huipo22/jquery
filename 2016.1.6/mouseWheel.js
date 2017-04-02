/*
$.fn.extend({mouseWheel: function (up,down) {
    this.each(function(index,obj){
        mw(obj,up,down)
    })
    function mw(obj,upfun,downfun){
        var obj=obj||document;
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
}})*/
$.fn.extend({mouseWheel: function (upfun,downfun) {
    /*
    * upfun-->对应下面的upfun
    * downfun-->对应下面的downfun
    * */
    //使用each循环  index-->下标  obj-->值
    this.each(function(index,obj){
        var obj=obj||document;
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
            }else if(ev.detail==3 || ev.wheelDelta==-120){//往下
                if(downfun){//往下滑的事件存在
                    downfun.call(obj);
                }
            }

            if (ev.preventDefault){
                ev.preventDefault(); //阻止默认浏览器动作(W3C)
            }else{
                ev.returnValue = false;//IE中阻止函数器默认动作的方式
            }
        }
    })
}})
