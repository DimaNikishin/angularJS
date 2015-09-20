'use strict';

angular.module('myApp.view4', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/PlanSelection', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])
//filter for displaying sectors names from array with selected sectors
.filter('selectedNames', function(){
  return function(list){
    var string = "";
    function plansList(element, index, array){
      string = string + element.name + "; "
    }
    list.forEach(plansList);
    return string
  }
})
// service for HTTPRequest
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
  $scope.showDetails = true;
//array with selected sectors and all sectors for each industry type
//use array with selected sectors for display its names and total amount of selected sectors for each industry type
  $scope.industrySectors = [{name:"Healthcare Sector", selected:[], list: []},{name:"Technology Sector", selected:[], list: []},{name:"Basic Materials Sector", selected:[], list: []}];
  HealthCareSector.success(function(data){
    $scope.HealthCareSectorData = data;
    $scope.industrySectors[0].list = data.list;
  });
//add function which search by name for selected sector in array with all sectors and pushing selected into array with selected sectors
  $scope.addFunction = function(sectorName){
    function sectorSearch(element, index, array){
      for (var name in element){
        if(element.name === sectorName){
          //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
          element.selected = true;
          return element;
        }
      }
    }
    var searchResult = $scope.industrySectors[0].list.filter(sectorSearch);
    //adding sector into appropriate industry type
    if(searchResult[0].sectorType === "HC"){
      $scope.industrySectors[0].selected.push(searchResult[0]);

    }
    else if(searchResult[0].sectorType === "TC"){
      $scope.industrySectors[1].selected.push(searchResult[0]);
    }
    else{
      $scope.industrySectors[2].selected.push(searchResult[0]);
    }
  };
  $scope.selectedProducts = function(selectedList){
    if(selectedList.length === 0){
      return false;
    }
    else {
      return true;
    }
  };
}])
//directive for displaying industry sectors
//create directive's functions and bind values from DOM to directive's template variables
.directive('product',[function(){
  return {
    scope: {
      planName: '@name',
      price: '@',
      selected: '@',
      propertyOne: '@',
      propertyTwo: '@',
      defaultPropertyOne: '@',
      defaultPropertyTwo: '@',
      addFunction: '&'
    },
    templateUrl: 'view4/ProductTemplate/ProductTemplate.html',
    link: function(scope, element, attrs){
      //TODO: make more detailed inspection
      scope.showEnabledProperty = function(property){
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
      scope.hideBuyButton = function(value){
        var myBool = value === "true";
        return myBool;
      }
    }
  }
}]);