$(function(){
	// 界面
    var flag=true;
	$(".btn").click(function(){
		$(".form").finish();
		if(flag){
			$(".form").css("display","block");
			center();
			flag=false;
		}else{
			$(".form").animate({
				left:0,top:20,width:0,height:0
			},function(){
				$(".form").css("display","none");
				flag=true;
			})
		}
	})
    

    var widths=$(window).width();
    var heights=$(window).height();
	function center(){
		
		$(".form").animate({
			width:200,height:300,left:(widths-200)/2,top:(heights-300)/2
		})
	}
    //点击X让它关闭
    $(".close").click(function(){
        $(".form").animate({
                left:0,top:20,width:0,height:0
            },function(){
                $(".form").css("display","none");
                flag=true;
            })
    })
    
    //当浏览器改变大小时 ，发生resize事件
	$(window).resize(function(){
        $(".form").finish();
		center();
	})
    //随机变颜色
	function getColor(){
		return  "rgb("+parseInt(255*Math.random())+","+parseInt(255*Math.random())+","+parseInt(255*Math.random())+")" ;
	};

    //ajax开始
    //插入
    $(".submit").click(function(){  //"提交"的点击事件
    	$.ajax({
    		url:"php/insert.php",
    		data:$("form").serialize(),
    		success:function(e){

                 if(e=="插入成功"){
                 	var copy=$(".message:eq(0)").clone(true);
                    $(".namecon",copy).html($("input[name=name]").val());
                    $(".sexcon",copy).html(function(){
                        var val=$("input[name=sex]:checked").val();
                        if(val=="man"){
                            return "男";
                        }else{
                            return "女";
                        }
                    });
                    $(".infocon",copy).html($("textarea").val());
                    copy.css({
                    	left:($(window).width()-200)*Math.random(),
                    	top:($(window).height()-260)*Math.random(),
                     	background:getColor(),
                    	display:"block"
                    });
                    copy.appendTo("body");                    
                 }
    		}
    	})
    })
    
    //拖拽
      $(document).on("mousedown",function(e){
    	var ox=e.offsetX;
    	var oy=e.offsetY;
    	var target=$(e.target);
    	var data={};
    	data.ox=ox;
    	data.oy=oy;
    	$(document).on("mousemove",function(e){
             var cx=e.clientX;
             var cy=e.clientY;
             data.cx=cx;
             data.cy=cy;
             target.trigger("drag",data); 
             if(e.preventDefault){
                 e.preventDefault()
             }else{
                 e.returnValue=false;
             }
    	})
        $(document).on("mouseup",function(e){
            $(document).off("mousemove");
        })
    })
    $("body").delegate(".message","drag",function(e,data){
        $(this).css({
            left:data.cx-data.ox,
            top:data.cy-data.oy
        })
    })


    //查阅
    // $.ajax({
    //     url:"php/select.php",
    //     dataType:"json",
    //     success:function(e){
    //         for(var i=0;i<e.length;i++){
    //             var copy=$(".message:eq(0)").clone(true);
    //             $(".namecon",copy).html(("e[i].name").val());
    //             $(".sexcon",copy).html(("e[i].sex").val());
    //             $(".infocon",copy).html(("e[i].info").val());
    //         }
    //     }
    // })
    
     // $.ajax({ //不对ajax(
     //        url:"php/select.php",
     //        success:function(e){
     //            for (var i=0;i< e.length;i++){
     //                var copy=$(".message").clone(true);
     //                $(copy).css({background:getColor(),left:widths*Math.random(),top:heights*Math.random()});
     //                $(copy).append([i].ename).append(e[i].sex).append(e[i].infor);
     //                $(copy).append(e[i].sex).append(e[i].infor);
     //                $(copy).append(e[i].infor);

     //                $("body").append(copy);
     //            }
     //        }
     //    })

   $.ajax({
        url:"php/select.php",
        dataType:"json",
        success:function(e){
            for(var i=0;i< e.length;i++){
                var copy=$(".message:eq(0)").clone(true);
                $(".namecon>span",copy).html(e[i].name);
                if(e[i].sex=="man"){
                    $(".sexcon",copy).html("男");
                }else{
                    $(".sexcon",copy).html("女");
                }
                $(".infocon",copy).html(e[i].info);
                copy.css({
                    display:"block",
                    position:"fixed",
                    background:getColor(),
                    left:(widths-50)*Math.random(),
                    top:(heights-100)*Math.random()
                }).appendTo("body")
            }
        }
    })
})