/*自己定义的服务 不用加$    区分开
* 自定义的服务不加$--tabInfo
* */
angular.module("myapp",[]).controller("tabCtrl",["$scope","tabInfo",function($scope,tabInfo){
    $scope.messages=tabInfo.messages;
}]).service("tabInfo",function(){
    this.messages=[{
        title:"标题1",con:"内容1"
    },{
        title:"标题2",con:"内容2"
    },{
        title:"标题3",con:"内容3"
    },{
        title:"标题4",con:"内容4"
    }];
}).directive("tab",function(){
    /*定义的tab指令 必须用.directive()方法 第一个参数是指令名字，第二个参数是个函数*/
    return {
        /*返回一个对象*/
        restrict:"E",
        templateUrl:"tab.html",
        /*直接导入了tab.html*/
        replace:true,
        /*
        *scope 作用域
        *scope 当你写上该属性时，就表示这个directive不会从它的controller里继承$scope对象，而是会重新创建一个
         *  */
        link:function(scope,ele,attr){
            /*循环取数据*/
            angular.forEach(scope.messages,function(){
                /*  scope.messages[0] ----- controller里的数据 */
                scope.title=scope.messages[0].title;
                scope.toggle=function(aa){
                    scope.title=aa;
                }
            })
        }
    }
})