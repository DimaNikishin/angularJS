'use strict';

angular.module('myApp.view3', ['ngRoute'])
//add resolve
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/CodeSandbox', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl',
        resolve: {
          complete: function($q, $timeout){
            var defer = $q.defer();
            $timeout(function(){
              defer.resolve();
            }, 2000);
            return defer.promise.then(function(){alert("then")})
          }
        }
    });
}])
//created serivece with data
.factory('Data', function(){
    return {message: "I'am not only one"}
})
//created filter
.filter('reverse', function(){
    return function(text){
        return text.split("").reverse().join("")
    }
})
// shared service with data between controllers
.controller('View3Ctrl', ['$scope','Data', function($scope, Data) {
    $scope.messages = "data1";
    $scope.data = Data;
    $scope.psysdata = ['DND','MMO','Single'];
    $scope.newAllertMes = function(message){
      alert(message);
    }
    $scope.messageReverted = function(message){
      if(message === undefined){
        return ""
      }
      else{
        return message.split("").reverse().join("")
      }
    }
    $scope.alertmessage = function(name, message){
      alert(name + message);
    }
}])

.controller('View4Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data2"
    $scope.data = Data
}])

.controller('View5Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data3"
    $scope.data = Data
}])
// 2 directive connected to 'newdirective' and use it controllers (functions)
.directive("newdirective",[function(){
    return {
      restrict: "E",
      scope: {},
      controller: function($scope){
        $scope.mainstring = "hello world"

        this.alertString = function(){
          $scope.mainstring = "another world"
          console.log($scope.mainstring)
        }

        this.consoleString = function(){
          console.log($scope.mainstring)
        }
      }
    }
}])

.directive("console", [function(){
    return {
      require: "newdirective",
      link: function(scope, element,attr,directiveName){
        directiveName.consoleString()
      }
    }
}])

.directive("alert", [function(){
  return {
    require: "newdirective",
    link: function(scope, element,attr,directiveName){
      directiveName.alertString()
    }
  }
}])
// scope details
.controller("scopedet",['$scope',function($scope){
    $scope.logChore = function(chore){
      alert(chore);
    }
}])

.directive('scopedir',[function(){
    return {
      restrict: "E",
      scope:{ //make scope isolated to each other of the same directive
        done: "&"
      },
      template: '<input type="text" ng-model="chore">' + '{{ chore }}' + '<button ng-click="done({chore:chore})"></button>'
    }
}])

//different attr of scope object
// @ - reading an attribute (individual data for same directive)
.directive('scope',[function(){
  return {
    scope: {},
    template: '<div>{{flawor}}</div>',
    link: function(scope, element, attrs){
      scope.flawor = attrs.name;
    }
  }
}])

.directive('scopea',[function(){
  return {
    scope: {
      flawor: '@name'
    },
    template: '<div>{{ flawor }}</div>'
  }
}])

// = - bind data accros isolated scopes of directive (shared data acrros several same directive
.directive('scopeobj',[function(){
  return {
    scope: {
      flawor: '=name'
    },
    template: '<div>{{ flawor }}</div>'
  }
}])

// & - make communication with controlers - call something from cntr scope inside directive scope(via)

.directive('scopeobjconwithcontr',[function(){
  return {
    scope: {
      flawor: '&',
      apple: '=name'
    },
    template: '<input type="text" ng-model="data">' + '<button ng-click="flawor({message:data})">{{data}}</button>' + '<div>{{apple}}</div>',

  }
}])

// directive with @ = &
.directive('systems',[function(){
  return {
    scope: {
      name: '@', //individual for each directive
      values: '=names', //value in direcitev shared between all directive exemplars
      func: '&',
      psysdata:'='
    },

    template: '<div>Hello {{name}} {{values}}</div>' + '<input type="text" ng-model="data">' + '<input type="text" ng-model="name">'+ '<div>{{name}}</div>' + '<select ng-model="values" ng-options="net for net in psysdata"></select>' + '<button ng-click="func({name:name, message:data})"></button>',
    link: function(scope){

    }
  }

}])

//transclusion - put dom elements into directive
.directive('transcl',[function(){
  return {
    restrict: 'E',
    transclude: true,
    template:'<div">name is not the same<div ng-transclude></div></div>'
  }
}])
//test another approach of controller
.controller('testCntr',['$scope',function($scope){
  this.sayHi = function(){
    alert("Hi");
  }
  return $scope.testCntr = this;
}])

//template compile and saving dom element into var - save template el to var, append it into template via complie and $watch model.data value and change div correspond to this value
.directive('compile',[function(){
  var divBlock = angular.element("<div ng-bind='model.data'></div>");//in ng-bind better to use object properties than objects
  var link = function(scope){
    scope.$watch("model.data", function(value){
      if(value === "password"){
        divBlock.css({'background-color':'#550000'});
        alert(value);
      }
      else{
        divBlock.css({'background-color':'#ffffff'});
      }
    })
  }
  return{
    restrict: "E",
    replace: true,
    template: '<div><input type=\"text\" ng-model=\"model.data\"></div>',
    compile: function(templateE){
      templateE.append(divBlock)
      return link;
    }
  }
}])

//$templateCache service

.run(function($templateCache){
  $templateCache.put("exemplar.html",'<div><input type="text" ng-model="cacheData"><div ng-bind="cacheData"></div></div>')
})

.directive('templates',['$templateCache',function($templateCache){
    var temp = ($templateCache.get("exemplar.html"))
  return {
    restrict: "E",
    scope: {},
    templateUrl: "exemplar.html",
    link: function (scope) {
      scope.$watch("cacheData", function (value) {
        if(value === "password") {
          alert(value);
        }
      })
    }
  }
}])

// from config routeProvider comes servies route (in config goes providers and returns services)

//promises $q - .resolve - enable $q service and turn on .promise function, and .promise store func what should be executed after .resolve is completed

.controller('View3CtrlwithQ',['$scope', '$q', function($scope, $q){
  var defer = $q.defer();

  $scope.func = function(){defer.promise
    .then(function(par){
      if (par === ''){
        alert("How!")
        return("it was empty")
      }
      else{
        return "it was" + par;
      }
    })
    .then(function(par){
      alert(par);
    })}
  defer.resolve("");
}]);

//write some resolves and on weekends try to download $http with it (resolve property - list of promises need to to do before template loaded (used in view2)