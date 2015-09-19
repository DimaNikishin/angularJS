'use strict';

angular.module('myApp.view4', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/PlanSelection', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.controller('View4Ctrl', ['$scope',function($scope) {
  $scope.industrySectors = ['Healthcare Sector','Technology Sector','Basic Materials Sector']

}])

.directive('product',[function(){
  return {
    scope: {},
    templateUrl: 'view4/ProductTemplate/ProductTemplate.html',
    link: function(scope, element, attrs){
      scope.flawor = attrs.name;
    }
  }
}]);