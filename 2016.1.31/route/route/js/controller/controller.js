/*添加一个模块  依赖注入一个 controllers是模块名称*/
angular.module("controllers",[])
    .controller("mainCtrl",["$scope","menuService",function($scope,menuService){
       $scope.menuInfos=menuService.menuInfos;
    }])