//        指令:directive
//        ngApp   数据->视图
//        脏值检测
//        依赖注入
angular.module('myapp',[]).controller('carCtrl',['$scope',"$filter",function($scope,$filter){
    $scope.infos=[{
        id:1,name:"衣服",price:60,num:2,all:function(){
            return this.num*this.price;
        }
    },{
        id:2,name:"裤子",price:60,num:2,all:function(){
            return this.num*this.price;
        }
    },{
        id:3,name:"鞋",price:120,num:2,all:function(){
            return this.num*this.price;
        }
    },{
        id:4,name:"篮球",price:160,num:2,all:function(){
            return this.num*this.price;
        }
    },{
        id:5,name:"食品",price:60,num:2,all:function(){
            return this.num*this.price;
        }
    }]
    $scope.all=function(){
        var a=0;
        for(var i=0;i<$scope.infos.length;i++){
            a = a + $scope.infos[i].price*$scope.infos[i].num;
        }
        return a;
    }
    $scope.nums=function(){
        var num=0;
        for(var i=0;i<$scope.infos.length;i++){
            num = num +Number($scope.infos[i].num);
        }
        return num;
    }
//                      删除的方法
    $scope.del= function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                $scope.infos.splice(index,1);
            }
        })
    }
    $scope.clear = function(){
        $scope.infos = [];
    }
    $scope.$watch("infos",function(newv,oldv){
        angular.forEach(newv,function(obj,index){
            if(obj.num!=oldv[index].num){
                if(!Number(obj.num)&&!obj.num==""){
                    obj.num = oldv[index].num;
                    return;
                }
            }
        })
    },true)
    $scope.jian = function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                if(obj.num==0){
                    return;
                }
                obj.num--;
            }
        })
    }
    $scope.jia = function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id) {
                obj.num++;
            }
        })
    }
    $scope.type="id";
    $scope.orderType="";
    $scope.paixu=function(type){
        $scope.type=type;
        if($scope.orderType==""){
            $scope.orderType="-";
        }else{
            $scope.orderType="";
        }
    }
}]).directive('car',function(){
    return{
        restrict:'E',
        templateUrl:'car.html',
        replace:true
        //link:function(scope,ele,attr){}
    }
});