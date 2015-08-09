'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/CodeSandbox', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
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
    template: '<input type="text" ng-model="data">' + '<button ng-click="flawor({messages:data})"> {{ flawor({messages:data}) }} </button>' + '<div>{{ apple }}</div>'
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
}]);

