$(function(){
    var clientW=$(window).width();
    if(clientW<730){
        $(".header1").css("display","none");
        $(".header2").css("display","block");
        $(".view-ul").css("display","none");
    }else{
        $(".header1").css("display","block");
        $(".header2").css("display","none");
        $(".view-ul").css("display","block");
    }

    $(window).resize(function(){
        var clientW=$(window).width();
        if(clientW<730){
            $(".header1").css("display","none");
            $(".header2").css("display","block");
            $(".view-ul").css("display","none");
        }else{
            $(".header1").css("display","block");
            $(".header2").css("display","none");
            $(".view-ul").css("display","block");
        }
    })
    $(".btn").click(function(){
        $(".son").finish().slideToggle(1000)
    })
    $(".h1").click(function(){
        $(this).next(".view-ul").finish().slideToggle(200);
    })

    var num=0;
    var t=setInterval(move,2000);
    function move(){
        num++;
        if(num==$(".banner").length-1){
            /*最后一张----》返回*/
            $(".box").css({marginLeft:-num*100+"%"},function (){
                $(".box").css({marginLeft:0})
            });
            num=0;
            $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
        }else{
            /*正常*/
            $(".box").animate({marginLeft:-num*100+"%"});
            $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
        }
    }
    $(".list li").click(function(){
        $(".list li").finish();
        var index=$(this).index(".list li");
        num=index;
        $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
        $(".box").animate({marginLeft:-num*100+"%"});
    })
    $(".tub").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,2000)
    })

    var margin;/*全局变量*/
    touch.on(".box","dragstart",function(e){
        //$(".box").css("margin-left", e.x);  //单位是百分比
        margin=$(".box")[0].offsetLeft;/*记录当前移动的位置 用原生对象--->像素*/
    })
    touch.on(".box","drag",function(e){
        /*继续在上次的位置上移动*/
        $(".box").css("margin-left", margin+e.x);
    })
    touch.on(".box","dragend",function(e){
        if(Math.abs(e.x)>300|| e.factor<5){
            if(e.direction=="left"){
                /*判断向左还是向右*/
                num++;
                if(num==$(".banner").length-1){
                    $(".box").css({marginLeft:-num*100+"%"},function (){
                        $(".box").css({marginLeft:0})
                    });
                    num=0;
                    $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
                }else{
                    $(".box").animate({marginLeft:-num*100+"%"});
                    $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
                }
            }else if(e.direction=="right"){
                num--;
                if(num==-1){
                    num=0;
                    $(".box").animate({marginLeft:-num*100+"%"});
                    $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
                    return;
                }else{
                    $(".box").animate({marginLeft:-num*100+"%"});
                    $(".list li").css({background:"#888",border:"none"}).eq(num).css({background:"none",border:"1px solid blue"});
                }
            }
        }else{
            /*达不到条件  回去*/
            $(".box").animate({marginLeft:-num*100+"%"});
        }
    })
    $(".box").mousedown(function(e){
        e.preventDefault();
    })
})
