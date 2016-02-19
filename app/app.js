'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.authentication',
  'myApp.index',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.version',
  'ngAnimate',
  'ngCookies'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/Home'});
}])

.run(['$rootScope', '$location', '$cookieStore', '$http','HealthCareSector', function ($rootScope, $location, $cookieStore, $http,HealthCareSector) {
  //// keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    console.log($rootScope.globals)
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in and navigate to gallery
    if ($location.path() === '/CodeSandbox' && !$rootScope.globals.currentUser) {
      $location.path('/Authentication');
    }
  });
}]);