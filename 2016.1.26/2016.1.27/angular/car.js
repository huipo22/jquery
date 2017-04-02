/**
 * Created by Administrator on 2016/1/26.
 */
angular.module("myapp",[]).controller("ctrl",["$scope",function($scope){
    $scope.infos=[{
        id:1,name:'衣服',num:3,price:60,all:function(){
        return this.num*this.price;
        }},
        {id:2,name:'裤子',num:1,price:260,all:function(){
            return this.num*this.price;
        }},
        {id:3,name:'鞋',num:2,price:130,all:function(){
            return this.num*this.price;
        }},
        {id:4,name:'帽子',num:6,price:350,all:function(){
            return this.num*this.price;
        }}];

    $scope.type='id';
    $scope.orderType='';
    $scope.paixu=function(type){
        if($scope.orderType==''){
            $scope.type=type;
            $scope.orderType='-';
        }else{
            $scope.orderType='';
        }
    }

    $scope.all=function(){
        var a=0;
        for(var i=0;i<$scope.infos.length;i++){
            a+=Number($scope.infos[i].num*$scope.infos[i].price);
        }
        return a;
    };
    $scope.nums=function(){
        var a=0;
        for(var i=0;i<$scope.infos.length;i++){
            a+=Number($scope.infos[i].num);
        }
        return a;
    }
    $scope.del=function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                $scope.infos.splice(index,1);
            }
        })
    };
    $scope.clear=function(){
        $scope.infos=[];
    };

    $scope.$watch("infos",function(newv,oldv){
        angular.forEach(newv,function(obj,index){
            if(obj.num!=oldv[index].num){
                if(!Number(obj.num)&&obj.num!==""){
                    obj.num=oldv[index].num;
                }
                if(obj.num==""){
                    if(confirm("是否删除")){
                        $scope.del(obj.id);
                    }else{
                        obj.num=oldv[index].num;
                    }
                }
            }
        })
    },true);

    $scope.jia=function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                obj.num++;
            }
        })
    };

    $scope.jian=function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                obj.num--;
            }
        })
    };
}]).directive("car",function(){
    return{
        restrict:"E",
        templateUrl:"car.html",
        replace:true
    }
})