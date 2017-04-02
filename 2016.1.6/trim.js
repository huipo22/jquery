function trim(string,type){
    var type=type||both;
    if(type=="both"){
        return string.replace(/^\s*|\s*$/g,"");
    }else if(type=="left"){
        return string.replace(/^\s*/g,"");
    }else if(type=="right"){
        return string.replace(/\s*$/g,"");
    }else if(type=="middle"){
        var left=/^\s*/;
        var right=/\s*$/;
        console.log(left.exec(string));//["           ", index: 0, input: "           wee ert    trere              "]-----取第0个
        console.log(left.exec(string)[0]);
        /*
        正则---返回的是  字符串数组
        exec---找到返回数组  没有找到返回null
        */
        return left.exec(string)[0]+string.replace(/\s*/g,"")+right.exec(string)[0];
    }else if(type=="all"){
        return string.replace(/\s*/g,"");
    }
}