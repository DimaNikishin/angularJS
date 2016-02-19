/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
//TODO rewrite comments
angular
  .module('myApp.index')
  .directive('cachedArray',cachedArray);

cachedArray.$inject = ['$rootScope','$cacheFactory'];

function cachedArray($rootScope,$cacheFactory){
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
};
