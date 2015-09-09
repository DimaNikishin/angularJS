'use strict';

angular.module('myApp.view3', ['ngRoute','ngAnimate'])
//add resolve
//creating a provider and factory in config (every thing that can be inject into controller configured through $provide
// if you want to configure your oun created provider - it should be created not inside config
.provider('configuredTest',[function(){
  var secondName = "";
  return{
    $setSecondName: function(name){
      secondName = name;
    },
    $get: function(){
      return {name :secondName + " Moby"}
    }
  }
}])
.config(['$routeProvider','$provide','configuredTestProvider', function($routeProvider, $provide, configuredTestProvider) {
    $routeProvider.when('/CodeSandbox', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl',
        resolve: {
          complete: function($q, $timeout){
            var defer = $q.defer();
            $timeout(function(){
              defer.resolve();
            }, 20);
            return defer.promise
          }
        }
    });
// inject new provider and factory by $provider
    $provide.factory('test',[function(){
      return {
        name:"Moby"
      }
    }]);

// create provider with $get and $set method and configured it data by $setSecondName and configuredTestProvider
    configuredTestProvider.$setSecondName('Jonny')
}])

//created serivece with data
.factory('Data', function(){
    return {message: "I'am not only one"}
})
.service('servData', function(){
  this.products = {title: "apple"}
})
//created filter
.filter('reverse', function(){
    return function(text){
        return text.split("").reverse().join("")
    }
})
// shared service with data between controllers
// $injector is allow to load provider
.controller('View3Ctrl', ['$scope','$injector', function($scope, $injector) {
    $injector.invoke(function(Data,configuredTest, servData){
      $scope.name = configuredTest.name;
      $scope.data = Data;
      $scope.title = servData.products.title;
    });
    $scope.messages = "data1";
    $scope.mainstring = "anotherData";
    $scope.psysdata = ['DND','MMO','Single'];
    $scope.newAllertMes = function(message){
      alert(message);
    };
    $scope.messageReverted = function(message){
      if(message === undefined){
        return ""
      }
      else{
        return message.split("").reverse().join("")
      }
    };
    $scope.alertmessage = function(name, message){
      alert(name + message);
    }
}])

.controller('View4Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data2";
    $scope.data = Data;
}])

.controller('View5Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data3";
    $scope.data = Data;
}])
// 2 directive connected to 'newdirective' and use it controllers (functions)
.directive("country",[function(){
    return {
      restrict: "E",
      scope: {},
      controller: function($scope){
        $scope.mainstring = "hello world";

        this.countrySay = function(say){
          console.log("Hello " + say)
        };

        this.consoleString = function(){
          console.log($scope.mainstring)
        }
      }
    }
}])

.directive("state", [function(){
    return {
      restrict: "E",
      require: "^country",
      controller: function(){
        this.stateSay = function(say){
          console.log("Bay: " + say)
        }
      },
      link: function(scope, element,attr,directiveName){
      }
    }
}])

.directive("city", [function(){
  return {
    require: ["^state","^country"],
    link: function(scope, element,attr,cntls){
      cntls[0].stateSay("John");
      cntls[1].consoleString();
      cntls[1].countrySay("World");

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

// = - bind data across isolated scopes of directive (shared data across several same directive(bind to object)
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
    template: '<input type="text" ng-model="data">' + '<button ng-click="flawor({message:data})">{{data}}</button>' + '<div>{{apple}}</div>'

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
  };
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
  };
  return{
    restrict: "E",
    replace: true,
    template: '<div><input type=\"text\" ng-model=\"model.data\"></div>',
    compile: function(templateE){
      templateE.append(divBlock);
      return link;
    }
  }
}])

//$templateCache service

.run(function($templateCache){
  $templateCache.put("exemplar.html",'<div><input type="text" ng-model="cacheData"><div ng-bind="cacheData"></div></div>')
})

.directive('templates',['$templateCache',function($templateCache){
    $templateCache.get("exemplar.html");
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
        alert("How!");
        return("it was empty")
      }
      else{
        return "it was" + par;
      }
    })
    .then(function(par){
      alert(par);
    })};
  defer.resolve("");
}])

//write some resolves and on weekends try to download $http with it (resolve property - list of promises need to to do before template loaded (used in view2)

// resolve routeChangeError event (controller that store downloading errors) this alternative controller for view3 should be created in app.js (but i'm able to call this cntrl in index.html
//because it is only for test and learn of angular it is located in sanbox (this cntrl listening all $routeChangeError and not specified for routeChange to view3
.controller('AlternativeCntrl',['$scope','$rootScope', function($scope, $rootScope){
  $rootScope.$on('$routeChangeError',function(event, current, previous, rejection){
    console.log(event);
    console.log(current);
    console.log(previous);
    console.log(rejection);
  })
}])

//route change life cycle can be traced by listen routeChangeStart and routeChangeSuccess events
//$event and $log and "Controller as" syntax
.controller('testCntrl',['$log', function($log){
  this.myFunct = function(ev){
    $log.debug(ev);
  }
}])

// angular.copy

.controller("angularCopy",['$scope',function($scope){
  $scope.Datas = [
    {name:'name1',job:'JavaDev'},
    {name:'name2',job:'JSDev'},
    {name:'name3',job:'GroovyDev'}
  ];
  $scope.selected = null;
  $scope.selectedCopy = null;
  $scope.selectContact = function(contact){
    $scope.selected = contact;
    $scope.selectedCopy = angular.copy(contact);
  };
  $scope.changeValue = function(){
    $scope.selected.name = $scope.selectedCopy.name;
  }
}])

// animation via $animate
.controller("angularAnimates",['$scope',function($scope){
  $scope.toggle = false;
}])

.directive("hide",['$animate',function($animate){
  return function(scope, element, attrs){
    scope.$watch(attrs.hide, function(val){
      if(val){
        $animate.addClass(element, "toggled");
      }
      else{
        $animate.removeClass(element, "toggled");
      }
    })
  }
}])

.animation(".toggled", function(){
  return {
    addClass: function(element, className){
      TweenMax.to(element, 1, {opacity:0});
    },
    removeClass: function(element, className){
      TweenMax.to(element, 1, {opacity:1});
    }
  }
})

// forms and validation
.directive("text",[function(){
  var INTEGER_REGEXP = /^\-?\D+@example\.com$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.email = function(modelValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(modelValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
}])

.directive("url",[function(){
  var INTEGER_REGEXP = /^\-?\D+@example\.com$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.url = function(modelValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(modelValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
}]);
