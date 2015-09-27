'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.version',
  'ngAnimate'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/Home'});
}])
.controller('indexCntrl',['$scope','$location',function($scope, $location){
  $scope.routeChangeStatus = function(isError,isStart,isComplete){
    $scope.isError = isError;
    $scope.isStart = isStart;
    $scope.isComplete = isComplete;
  }
  $scope.navigateTo = function(path){
    $scope.routeChangeStatus(false,false,false);
    $location.path(path)
  }
}])
//moved from view2 module to app module
//$routeScope.on() is listening an events that come up to root scope
// $routeChangeError is displaying in directive (also I'm allowed to pass $rootScope into directive and listen root scope angular events from there
// directive is displayed with status of routeChange event (start/success)
.directive('ajaxError',['$rootScope','$timeout','$cacheFactory', function($rootScope,$timeout,$cacheFactory){
  return{
    restrict:'E',
    template:'<div class="alert-warning" ng-show="isError"><h4>failed to load JSON file</h4></div>'+'<div class="alert-info" ng-show="isStart"><h4>Loading JSON file is started</h4></div>'+'<div class="alert-success" ng-show="isComplete"><h4>Loading JSON file is completed</h4></div>',
    link: function($scope){
      $rootScope.$on('$routeChangeStart',function(event, current){//start routeChange event - downloading template and promises
        if(current.$$route !== undefined) {// kind of crutch to not see in console error when app is opened (error is displayed because current.$$route is undefined in first $routeChangeStart event)
          if(current.$$route.templateUrl === "view2/view2.html"){ //displaying error .directive only when error is displayed for load view2
            $scope.routeChangeStatus(false,true,false);
          }
        }
      })
      $rootScope.$on('$routeChangeSuccess',function(event, current){//complete routeChange event - displayed template and stores data from promises
        if(current.loadedTemplateUrl === "view2/view2.html"){ //displaying error .directive only when error is displayed for load view2
          $scope.routeChangeStatus(false,false,true);
          $timeout(function(){$scope.routeChangeStatus(false,false,false);},500);
        }
      })
      $rootScope.$on('$routeChangeError',function(event, current){
        if(current.loadedTemplateUrl === "view2/view2.html"){ //displaying error .directive only when error is displayed for load view2
          $scope.routeChangeStatus(true,false,false);
        }
      })
    }
  }
}])

.directive('cachedArray',['$rootScope','$cacheFactory', function($rootScope,$cacheFactory){
  return{
    restrict:'E',
    link: function($scope){
      $rootScope.$on('$routeChangeStart',function(event, current, previous){//start routeChange event - downloading template and promises
        if(previous !== undefined) {// kind of crutch to not see in console error when app is opened (error is displayed because current.$$route is undefined in first $routeChangeStart event)
          if (previous.$$route !== undefined) {
            if (previous.$$route.templateUrl === "view4/view4.html") { //displaying error .directive only when error is displayed for load view2
              $cacheFactory.get('industrySectors').put('industrySectors', $scope.industrySectors)
            }
          }
        }
      })
    }
  }
}]);