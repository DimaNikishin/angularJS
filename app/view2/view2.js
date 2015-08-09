'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Gallery', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','weather',function($scope, weather) {
  weather.success(function(data){
    $scope.weatherObjects = data;
  })
}])

.factory('weather', ['$http', function($http) {
  return $http.get('http://localhost:8000/app/gallery.json')
    .success(function(data) {
      return angular.fromJson(data);
    })
    .error(function(err) {
      return err;
    });
}])

.directive('weather',[function(){
  return {
    restrict:'E',
    scope: {
      picture:"@"
    },
    template:'<img ng-src="{{picture}}">'
  }
}])