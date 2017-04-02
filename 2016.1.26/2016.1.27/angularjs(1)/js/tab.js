/**
 * Created by 晓伟 on 2016/1/27.
 */
angular.module("myapp",[]).controller("tabCtrl",["$scope","mySer",function($scope,mySer){
    $scope.messages=mySer.messages;
}]).service("mySer",function(){
    this.messages=[
        {title:"name1",con:"con1"},
        {title:"name2",con:"con2"},
        {title:"name3",con:"con3"},
        {title:"name4",con:"con4"},
        {title:"name5",con:"con5"},
    ]
}).directive("tab",function(){
    return {
        restrict:"E",
        templateUrl:"tab.html",
        link:function(scope,ele,attr){
            scope.title=scope.messages[0].title;
            scope.toggle=function(title){
                scope.title=title;

            }
        }
    }
})
