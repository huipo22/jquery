$(function(){
    var add=$(".add");
    var form=$("form");//获取表单
    var formClose=$(".formclose");
    var flag=true;
    add.click(function(){
        if(flag){
            form.attr({"data-a":"animate-down"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-up"});
            flag=true;
        }

    })
    formClose.click(function(){
        form.attr({"data-a":"animate-up"});
    })
    /*表单验证*/
    $(".submitbtn").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();
        if(textv==""){
            alert("标题不能为空");
            return;//直接rerurn  没有往下面执行的必要了
        }else if(conv==""){
            alert("标题不能为空");
            return;
        }else if(timev==""){
            alert("时间不能为空");
            return;
        }

        /*存储信息*/
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        /*存完信息  将下面这些置空*/
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");
        /*显示信息  随机放在页面中  在下面的form中显示刚才添加的信息*/
        var copy=$(".con:first").clone().appendTo("body").css({left:($(window).width()-$(".con").outerWidth())*Math.random(),top:(($(window).height()-$(".con").outerHeight())*Math.random()),"display":"block"}).attr("data-a","animate-sd");
        copy.find(".title").html(textv);
        copy.find(".con-con").html(conv);
        copy.find(".time1").html(timev);

    })

    /*拖拽事件*/
    $(document).on("mousedown",function(e){
        var obj= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        $(document).on("mousemove",function(e){
            var cx= e.pageX;
            var cy= e.pageY;
            $(obj).trigger("drag",{left:cx-ox,top:cy-oy})
        })
        $(document).on("mouseup",function(e){
            $(document).off("mouseup");/*清除抬起事件*/
            $(document).off("mousemove");/*清除移动事件*/
        })
    })
    /*拖拽*/
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            left:data.left,
            top:data.top,
        })
    })

    /*层级*/
    $(document).delegate(".con","click",function(e){
        $(".con").css({zIndex:0})
        $(this).css({zIndex:1})
        e.preventDefault();
    })

    /*删除*/
    $(document).delegate(".close","click",function(e){
        var id=$(this).parent().attr("id");
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id=id){
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })

    /*从localStorage中取出信息放入下面的那个表单中
     $(".con:first").clone()---复制的是下面表单的样式
     */
    var messages=localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<messages.length;i++){
        copy=$(".con:first").clone().appendTo("body").css({
            left:($(window).width()-$('.con').outerWidth())*Math.random(),
            top:($(window).height()-$('.con').outerHeight())*Math.random(),
            display:"block"
        }).attr('id',messages[i].id);
        copy.find(".title").html(messages[i].title);
        copy.find(".con-con").html(messages[i].con);
        copy.find(".time1").html(messages[i].time);
    }
})