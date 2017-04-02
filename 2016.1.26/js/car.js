/*模块启动.控制器*/
angular.module("myApp",[]).controller("myCtrl",["$scope",function($scope){
    $scope.data=1;/*隐藏thead*/
    /*数据*/
    $scope.infos=[{
        id:1,name:"鞋子",price:89,num:2,all:function(){
            return this.price*this.num;
        }
    },{
        id:2,name:"衣服",price:60,num:3,all:function(){
            return this.price*this.num;
        }
    },{
        id:3,name:"鞋子1",price:79,num:2,all:function(){
            return this.price*this.num;
        }
    },{
        id:4,name:"衣服2",price:40,num:3,all:function(){
            return this.price*this.num;
        }
    }];

    $scope.item='';
    $scope.orderType='';
    /*用来排序的  功能有点问题*/
    $scope.sort=function(item){
        /*
        将$scope.item=传进来的item
        判断$scope.orderType  为空   倒序
                              -     正序
        */
        $scope.item=item;
        if($scope.orderType==''){
            $scope.orderType='-';
        }else{
            $scope.orderType='';
        }
    }
    /*总价 跟上面的$scope.infos里的数据 相关联  下面写的方法同理*/
    $scope.all=function(){
        var sum=0;
        for(var i=0;i<$scope.infos.length;i++){
            sum+=$scope.infos[i].num*$scope.infos[i].price;
        }
        return sum;
    };
    $scope.Sum=function(){
        var num=0;
        for(var i=0;i<$scope.infos.length;i++){
            num+=Number($scope.infos[i].num);
        }
        return num;
    };
    $scope.del=function(id){
        /*forEach(需要遍历的集合,数据)  index--当前的位置*/
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                $scope.infos.splice(index,1)
            }
        })
    };
    $scope.clear=function(){
        $scope.infos=[];
    };
    $scope.jian=function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                obj.num--;
            }
        })
    };
    $scope.jia=function(id){
        angular.forEach($scope.infos,function(obj,index){
            if(obj.id==id){
                obj.num++;
            }
        })
    };
    /*$watch("要监听的对象,被调用的函数")*/
    $scope.$watch("infos",function(newv,oldv){
        /*遍历newv*/
        angular.forEach(newv,function(obj,index){
            /*obj---newv*/
            if(obj.num!==oldv[index].num){
                if(!Number(obj.num)&&obj.num!==""){
                    obj.num=oldv[index].num;
                }
            }
            if(obj.num==""){
                if(confirm("是否删除")){
                    $scope.del(obj.id)
                }else{
                    obj.num=oldv[index].num;
                }
            }
        })
    })
}]).directive("car",function(){
    /*定义一个car指令,html中可以使用
    * template:后面跟的是html标签
    * templateUrl:后面跟的是 要加载的html文件
    * replace:是否替换
    * */
    /*返回一个对象，参数有5个 restrict template templateUrl replace link*/
    return{
        restrict:"ECA",
        templateUrl:"ShopCar.html",
        replace:true
    }
})
