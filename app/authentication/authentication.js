'use strict';

angular.module('myApp.authentication', ['ngRoute', 'ngAnimate','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/Authentication', {
  templateUrl: 'authentication/authentication.html',
  controller: 'AuthenticationCtrl'
});
}])

.factory('AuthenticationService',
['$http', '$cookieStore', '$rootScope', '$timeout',
function ($http, $cookieStore, $rootScope, $timeout) {
  var service = {};

  service.Login = function (username, password, callback) {

    //Dummy authentication for testing, uses $timeout to simulate api call
    $timeout(function(){
      var response = { success: username === 'Username' && password === 'Password' };
      if(!response.success) {
        response.message = 'Username or password is incorrect';
      }
      callback(response);
    }, 1000);

    //Real post request to server
    //$http.post('/api/authenticate', { username: username, password: password })
    //    .success(function (response) {
    //        callback(response);
    //    });

  };

  service.SetCredentials = function (username, password) {
    //don't encode user's credentials
    var authdata = username + ':' + password;

    $rootScope.globals = {
      currentUser: {
        username: username,
        authdata: authdata
      }
    };

    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $cookieStore.put('globals', $rootScope.globals);
  };

  service.ClearCredentials = function () {
    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic ';
  };

  return service;
}])

.controller('AuthenticationCtrl', ['$scope', '$rootScope', '$location', 'AuthenticationService',
function ($scope, $rootScope, $location, AuthenticationService) {
  // reset login status
  $scope.logout = function(){
    AuthenticationService.ClearCredentials();
  };

  $scope.login = function () {
    AuthenticationService.Login($scope.username, $scope.password, function(response) {
      if(response.success) {
        AuthenticationService.SetCredentials($scope.username, $scope.password);
        $location.path('/');
        var currentActiveLink = $(".active");
        currentActiveLink.removeClass("active");
        $(".nav-link:contains('Home')").parent().addClass("active");
      } else {
        $scope.error = response.message;
      }
    });
  };
}]);