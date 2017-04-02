/*
* copy:所有事件加在copy上
* canvas: 只获取canvas宽高
* cobj:平面对象
* */
function shape(copy,canvas,cobj,xpobj,selectobj){
    this.copy=copy;/*传进来的copy*/
    this.canvas=canvas;/*传进来的canvas*/
    this.cobj=cobj;/*画布对象*/
    this.xpobj=xpobj;
    this.selectobj=selectobj;
    this.bgcolor="#000";
    this.borderColor="#000";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";/*传入什么值----就必须有与之对应的方法*/
    this.width=canvas.width;
    this.height=canvas.height;
    this.history=[];/*存放历史记录*/
}
shape.prototype={
    /*初始化*/
    init:function(){
        this.xpobj.css("display","none");
        this.selectobj.css("display","none");
        if(this.temp){
            this.history.push(this.cobj.getImageData(0,0,this.width,this.height));
            this.temp=null;
        }
      this.cobj.fillStyle=this.bgcolor;
      this.cobj.strokeStyle=this.borderColor;
      this.cobj.lineWidth=this.lineWidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
        that.cobj.closePath();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y);/*结束的点-开始的点*/
        that.cobj.closePath();
        that.cobj[that.type]();/*用线条 stroke 来画*/
    },
    arc:function(x,y,x1,y1){
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));/*勾股定理计算半径*/
        that.cobj.beginPath();
        that.cobj.arc(x,y,r,0,Math.PI*2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    draw:function(){
        var that=this;
        that.init();/*开始画之前--需要预先定义样式*/
        that.copy.onmousedown=function(e){
            that.init();/*需要预先定义样式*/
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                /*清空画布*/
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    /*将最后一次操作的结果呈放到页面中*/
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.init();
                that[that.shapes](startx,starty,endx,endy);
            }
            /*
             that.shapes--代表画什么形状
             默认画直线 -- 可更改
             传进去四个点--开始(x,y)--结束(x,y)
             */
            that.copy.onmouseup=function(){
                /*将结果保存到历史记录中*/
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.init();
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.lineTo(endx,endy);
                that.cobj[that.type]();
            }
            that.copy.onmouseup=function(){
                that.cobj.closePath();
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    five:function(x,y,x1,y1){
        var that=this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/2;
        that.cobj.beginPath();
        that.cobj.moveTo(x+r,y);
        for(var i=0;i<10;i++){
            if(i%2==0){
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r);
            }else{
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1);
            }
        }
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    clear:function(xpobj,w,h){
        var that=this;
        that.copy.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var lefts=ox-w/2;
            var tops=oy-h/2;
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-w){
                lefts=that.width-w;
            }
            if(tops<0){
                tops=0;
            }
            if(tops>that.height-h){
                tops=that.height-h;
            }
            xpobj.css({left:lefts,top:tops});
        }
        that.copy.onmousedown=function(e){
            that.copy.onmousemove=function(e){
                var ox= e.offsetX;
                var oy= e.offsetY;
                var lefts=ox-w/2;
                var tops=oy-h/2;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                xpobj.css({left:lefts,top:tops,display:"block"});
                that.cobj.clearRect(lefts,tops,w,h);
            }
            that.copy.onmouseup=function(){
                xpobj.css("display","none");
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },
    /*移动*/
    remove:function(selectAObj){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var minx,miny, w,h
            that.init();
            that.copy.onmousemove=function(e){
                var endx= e.offsetX;
                var endy= e.offsetY;
                qdx=startx>endx?endx:startx;/*三元表达式,判断起点*/
                qdy=starty>endy?endy:starty;
                w=Math.abs(startx-endx);/*需要取绝对值*/
                h=Math.abs(starty-endy);
                selectAObj.css({width:w,height:h,left:qdx,top:qdy,display:"block"})
            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.temp=that.cobj.getImageData(qdx,qdy,w,h);/*存放到中间变量*/
                that.cobj.clearRect(qdx,qdy,w,h);/*清除画布*/
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));/*将画布内容存放到历史记录中*/
                that.cobj.putImageData(that.temp,qdx,qdy);/*放回到画布中*/
                that.move(qdx,qdy,w,h,selectAObj);/*使用移动方法--（起点x,起点y,宽,高,对象）*/
            }
        }
    },
    move:function(qdx,qdy,w,h,selectAObj){
        var that=this;
        that.copy.onmousemove=function(e){
            var x= e.offsetX;
            var y= e.offsetY;
            /*
            *边框里：移动的标志
            *边框外:默认手型
            */
            if(x>qdx&&x<qdx+w&&y>qdy&&y<qdy+h){
                that.copy.style.cursor="move";
            }else{
                that.copy.style.cursor="default"
            }
        }
        that.copy.onmousedown=function(e){
            var x= e.offsetX;
            var y= e.offsetY;
            var cx=x-qdx;/*按下时要移动的点*/
            var cy=y-qdy;
            if(x>qdx&&x<qdx+w&&y>qdy&&y<qdy+h){
                that.copy.style.cursor="move";
            }else{
                that.copy.style.cursor="default";/*没有要移动的 直接return*/
                return;
            }

            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w;
                }
                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                selectAObj.css({
                    left:lefts,
                    top:tops,
                });
                qdx=lefts;
                qdy=tops;
                that.cobj.putImageData(that.temp,qdx,qdy)
            }
            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.move(qdx,qdy,w,h,selectAObj);/*下次可以接着移动*/
            }
        }
    }
}