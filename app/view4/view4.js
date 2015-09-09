'use strict';

angular.module('myApp.view4', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/PlanSelection', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])
.controller('View4Ctrl', ['$scope',function($scope) {

}]);