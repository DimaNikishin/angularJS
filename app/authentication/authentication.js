'use strict';

angular.module('myApp.authentication', ['ngRoute', 'ngAnimate'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Authentication', {
      templateUrl: 'authentication/authentication.html',
      controller: 'AuthenticationCtrl'
    });
  }])

  .controller('AuthenticationCtrl', ['$scope',function($scope) {

  }]);