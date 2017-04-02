/*依赖主注入了 services controllers directives ngAnimate ngRoute *对应js文件夹下的controller/controllers.js/controllers    js/angular.animate.js
 * AngularJS模块可以在被加载和执行之前对其自身进行配置。   config方法 依赖注入 $routeProvider*/
angular.module("myapp",["services","controllers","directives","ngAnimate","ngRoute"]).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/list', {
            templateUrl: 'tpl/list.html',
            controller: 'listCtrl'
            /*添加了一个控制器 在后面可以访问*/
        }).
        when('/table', {
            templateUrl: 'tpl/table.html',
            controller: 'tableCtrl'
            /*添加了一个控制器 在后面可以访问*/
        }).
        when('/form', {
            templateUrl: 'tpl/form.html',
            controller: 'formCtrl'
            /*添加了一个控制器 在后面可以访问*/
        }).
        otherwise({
            redirectTo: '/list'
        });
    }]).controller("listCtrl",function($scope){


}).controller("tableCtrl",["$scope","menuService",function($scope,menuService){
    /*tableCtrl在上面定义过了   在这个页面的route功能里*/
    $scope.tables=menuService.tables

}]).controller("formCtrl",["$scope",function($scope){

}])