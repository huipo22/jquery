
    angular.module("myapp",[])
        .controller("carCtr",["$scope",function($scope){
            $scope.infos=[{
                id:1,name:"坦克",price:60,num:2,all:function(){
                    return this.price*this.num;
                }
            },{
                id:2,name:"电锯",price:60,num:2,all:function(){
                    return this.price*this.num;
                }
            },{
                id:3,name:"手枪",price:60,num:2,all:function(){
                    return this.price*this.num;
                }
            },{
                id:4,name:"飞机",price:60,num:2,all:function(){
                    return this.price*this.num;
                }
            },{
                id:5,name:"大炮",price:60,num:2,all:function(){
                    return this.price*this.num;
                }
            }];
            $scope.type="id";
            $scope.orderType="";
            $scope.paixu=function(){
                if($scope.orderType==""){
                    $scope.orderType="-"
                }else{
                    $scope.orderType=""
                }
            }
            $scope.all=function(){
                var a=0;
                for(var i=0;i<$scope.infos.length;i++){
                    a+=$scope.infos[i].price*$scope.infos[i].num;
                }
                return a;
            }
            $scope.num=function(){
                var a=0;
                for(var i=0;i<$scope.infos.length;i++){
                    a+=parseInt($scope.infos[i].num);
                }
                return a;
            }
            $scope.del=function(id){
                angular.forEach($scope.infos,function(obj,index){
                    if(obj.id==id){
                        $scope.infos.splice(index,1);
                    }
                })
            }
            $scope.clear=function(){
                $scope.infos=[];
            }
            $scope.$watch("infos",function(newv,oldv){
                angular.forEach(newv,function(obj,index){
                    if(obj.num!=oldv[index].num){
                        if(!(Number(obj.num)||obj.num=="")){
                            obj.num=oldv[index].num;
                            return;
                        }
                        if(obj.num==0){
                            if(confirm("是否要删除？")){
                                $scope.del(obj.id);
                            }else{
                                obj.num=oldv[index].num;
                            }
                        }

                    }
                })
            },true)
            $scope.jian=function(id){
                angular.forEach($scope.infos,function(obj,index){
                    if(obj.id==id){
                        if(obj.num==0){
                            return;
                        }
                        obj.num--;
                    }
                })
            }
            $scope.jia=function(id){
                angular.forEach($scope.infos,function(obj,index){
                    if(obj.id==id){
                        obj.num++;
                    }
                })
            }
        }]).directive("car",function(){
        return{
            restrict:"E",
            templateUrl:"car.html",
            replace:true
        }
    })
