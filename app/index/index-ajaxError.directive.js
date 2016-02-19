/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
//TODO rewrite comments
angular
  .module('myApp.index')
  .directive('ajaxError',ajaxError);

ajaxError.$inject = ['$rootScope','$timeout'];
//moved from view2 module to app module
//$routeScope.on() is listening an events that come up to root scope
// $routeChangeError is displaying in directive (also I'm allowed to pass $rootScope into directive and listen root scope angular events from there
// directive is displayed with status of routeChange event (start/success)
function ajaxError($rootScope,$timeout){
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
};