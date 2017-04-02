function getChilds(father,type){
    var type=type||"a";
    var childs=father.childNodes;
    var arr=[];
    for(var i=0;i<childs.length;i++){
        if(type=="a"){
            if(childs[i].nodeType==1){
                arr.push(childs[i]);
            }
        }else if(type=="b"){
            if(childs[i].nodeType==1||(childs[i].nodeType!=8&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
                arr.push(childs[i])
            }
        }
    }
    return arr;
}
function getFirst(father){
    return getChilds(father)[0];
}
function getLast(father){
    return getChilds(father)[getChilds(father).length-1]
}
function getNum(father,val){
    return getChilds(father)[val];
}
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
function getUp(obj){
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
}
Node.prototype.insertAfter=function(newobj,obj){
    var down=getDown(obj);
    if(down){
        this.insertBefore(newobj,down);
    }else{
        this.appendChild(newobj);
    }
}
function addEvent(obj,event,fun){
    if(obj.addEventListener){
        return obj.addEventListener(event,fun,false);
    }else{
        return obj.attachEvent("on"+event,fun);
    }
}
function removeEvent(obj,event,fun){
    if(obj.removeEventListener){
        return obj.removeEventListener(event,fun,false)
    }else{
        return obj.detachEvent("on"+event,fun);
    }
}