'use strict';

angular.module('myApp.view4', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/PlanSelection', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])

.factory('HealthCareSector', ['$http', function($http) {
  return $http.get('http://localhost:8080/app/Healthcare Sector.json')
    .success(function(data) {
      return angular.fromJson(data);
    })
    .error(function(err) {
      return err;
    });
}])

.controller('View4Ctrl', ['$scope','HealthCareSector',function($scope,HealthCareSector) {
  $scope.industrySectors = ['Healthcare Sector','Technology Sector','Basic Materials Sector']
  HealthCareSector.success(function(data){
    $scope.HealthCareSectorData = data;
  });
  //TODO: make more detailed inspection
  $scope.showEnabledProperty = function(property){
    if(property === undefined){
      return false;
    }
    else{
      if(property.length === 0){
        return false;
      }
      else {
        return true;
      }
    }

  }
}])

.directive('product',[function(){
  return {
    scope: {
      planName: '@name',
      price: '@',
      propertyOne: '@',
      propertyTwo: '@',
      defaultPropertyOne: '@',
      defaultPropertyTwo: '@',
      showPropFunction: '&'
    },
    templateUrl: 'view4/ProductTemplate/ProductTemplate.html',
    link: function(scope, element, attrs){

    }
  }
}]);