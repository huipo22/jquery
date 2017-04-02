/*添加一个模块  依赖注入一个 directives是模块名称
* 然后又添加了个指令 menu*/
angular.module("directives",[])
    .directive("menu",function(){
        return {
            restrict:"E",
            templateUrl:"tpl/menu.html",
            link:function(a,b,c){
                a.click=function(title){
                    a.title=title;
                }
            }
        }
    })