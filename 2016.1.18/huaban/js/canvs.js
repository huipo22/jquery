$(function(){
    $(".file").hover(function(){
        $(this).find(".file-son").finish().slideDown(500);
    },function(){
        $(this).find(".file-son").slideUp(500);
    })

    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");
    /*画布大小*/
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    /*导航下拉*/
   /* $(".hasson").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").slideDown(200);
    },function(){
        $(this).find(".son").slideUp(200);
    })*/
    var obj=new shape(copy[0],canvas[0],cobj,$(".cachu"),$(".selectA"));

    /*铅笔/图形*/
    $(".hasson:eq(0)").find(".son li").click(function(){
        if($(this).attr("data-role")!="pen"){
            obj.shapes = $(this).attr("data-role");
            obj.draw();
        }else{
            obj.pen();
        }
    })
    /*填充/线条*/
    $(".hasson:eq(1)").find(".son li").click(function(){
        obj.type=$(this).attr("data-role");
        obj.draw();
    })
    /*线条宽度*/
    $(".hasson:eq(2)").find(".son li").click(function(){
        obj.lineWidth=$(this).attr("data-role");
        obj.draw();
    })
    /*
     * 不是click事件  是change事件
     * 填充背景 线条颜色
     * */
    $(".line input").change(function(){
        obj.borderColor=$(this).val();
        obj.draw();
    })
    $(".fill input").change(function(){
        obj.bgcolor=$(this).val()
        obj.draw();
    })

    /*擦除*/
    $(".xp").find(".son li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
        $(".cachu").css({
            width:w,
            height:h,
            display:"block"
        })
        /*要清除的对象，宽度，高度*/
        obj.clear($(".cachu"),w,h);
    })

    /*文件操作*/
    $(".file").find(".file-son li").click(function(){
        var index=$(this).index(".file-son li");
        if(index==0){
            /*新建*/
            if(obj.history.length!=0){
                var yes=window.confirm("是否保存")
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"))
                }
                obj.history=[];
                cobj.clearRect(0,0,canvas[0].width,canvas[0].height)
            }
        }else if(index==1){
            /*保存 原生对象方法*/
            location.href=canvas[0].toDataURL().replace("image/png","image/octet-stream");
        }else if(index==2){
            /*后退----cobj*/
            cobj.clearRect(0,0,canvas.width(),canvas.height());
            if(obj.history.length==0){
                alert("无法后退")
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0)
        }
    })

    /*选择*/
    $(".xuanze").click(function(){

        obj.remove($(".selectA"))
    })
})