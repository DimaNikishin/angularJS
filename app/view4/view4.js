'use strict';
//TODO:write unit-test for view4
angular.module('myApp.view4', ['ngRoute', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/PlanSelection', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl'
  });
}])
//filter for displaying sectors names from array with selected sectors
//sort arrays items by it length
.filter('selectedNames', function(){
  return function(list){
    var string = "";
    list.sort(function compare(a, b) {
      if (a.name.length < b.name.length) {
        return -1;
      }
      else if (a.name.length > b.name.length) {
        return 1;
      }
      else {
        return 0;
      }
    }).forEach(function plansList(element, index, array){
      string = string + element.name + "; "
    });
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

.factory('additionalSectors', ['$http', function($http) {
  return $http.get('http://localhost:8080/app/Additional Sectors.json')
    .success(function(data) {
      return angular.fromJson(data);
    })
    .error(function(err) {
      return err;
    });
}])
//when user leaves from view4 - array with selected and list sectors is added to cache and got form cache when user returns to view4 from another view
.controller('View4Ctrl', ['$scope','HealthCareSector','additionalSectors','$cacheFactory',function($scope,HealthCareSector,additionalSectors,$cacheFactory) {
  $scope.showDetails = true;
//array with selected sectors and all sectors for each industry type
//use array with selected sectors for display its names and total amount of selected sectors for each industry type
  (function(){
    if(!angular.isUndefined($cacheFactory.get('industrySectors'))){
      $scope.industrySectors = $cacheFactory.get('industrySectors').get('industrySectors');//find cached value in cacheId
      $scope.selectedHC = true;
    }
    else{
      $scope.cache = $cacheFactory('industrySectors');//create cacheId and put there value if this cacheId not found
      $scope.industrySectors = [{name:"Healthcare Sector", selected:[], list: []},{name:"Technology Sector", selected:[], list: []},{name:"Basic Materials Sector", selected:[], list: []}];
      HealthCareSector.success(function(data){
        $scope.selectedHC = true;
        $scope.industrySectors[0].list = data.list;
      });
      $scope.cache.put('industrySectors', $scope.industrySectors)
    }
  })();
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
    var searchResult = (function(){
      if($scope.industrySectors[0].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[0].list.filter(sectorSearch)}
      else if($scope.industrySectors[1].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[1].list.filter(sectorSearch)}
      else{return $scope.industrySectors[2].list.filter(sectorSearch)}
    })();
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
//TODO: rewrite comments
  $scope.removeFunction = function(sectorName){
    function sectorSearch(element, index, array){
      for (var name in element){
        if(element.name === sectorName){
          //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
          element.selected = false;
          return element;
        }
      }
    }
    var searchResult = (function(){
      if($scope.industrySectors[0].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[0].list.filter(sectorSearch)}
      else if($scope.industrySectors[1].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[1].list.filter(sectorSearch)}
      else{return $scope.industrySectors[2].list.filter(sectorSearch)}
    })();
    //removing sector from appropriate industry type
    if(searchResult[0].sectorType === "HC"){
      var removeItem = $scope.industrySectors[0].selected.filter(sectorSearch);
      var indexOfRemoveItem = $scope.industrySectors[0].selected.indexOf(removeItem[0])
      var lastItem = $scope.industrySectors[0].selected[$scope.industrySectors[0].selected.length-1];
      $scope.industrySectors[0].selected[indexOfRemoveItem] = lastItem;
      $scope.industrySectors[0].selected[$scope.industrySectors[0].selected.length-1] = removeItem[0];
      $scope.industrySectors[0].selected.pop();
    }
    else if(searchResult[0].sectorType === "TC"){
      var removeItem = $scope.industrySectors[1].selected.filter(sectorSearch);
      var indexOfRemoveItem = $scope.industrySectors[1].selected.indexOf(removeItem[0])
      var lastItem = $scope.industrySectors[1].selected[$scope.industrySectors[1].selected.length-1];
      $scope.industrySectors[1].selected[indexOfRemoveItem] = lastItem;
      $scope.industrySectors[1].selected[$scope.industrySectors[1].selected.length-1] = removeItem[0];
      $scope.industrySectors[1].selected.pop();
    }
    else{
      var removeItem = $scope.industrySectors[2].selected.filter(sectorSearch);
      var indexOfRemoveItem = $scope.industrySectors[2].selected.indexOf(removeItem[0])
      var lastItem = $scope.industrySectors[2].selected[$scope.industrySectors[2].selected.length-1];
      $scope.industrySectors[2].selected[indexOfRemoveItem] = lastItem;
      $scope.industrySectors[2].selected[$scope.industrySectors[2].selected.length-1] = removeItem[0];
      $scope.industrySectors[2].selected.pop();
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
  $scope.downloadSectors = function(){
    if($scope.industrySectors[1].list.length === 0 && $scope.industrySectors[2].list.length === 0){
      additionalSectors.success(function(data){
        $scope.industrySectors[1].list = data.TechnologyList;
        $scope.industrySectors[2].list = data.BasicMaterialsList;
      });
    }
    else {
      if($scope.industrySectors[1].list.length === 0){
        $scope.industrySectors[1].list = data.TechnologyList;
      }
      else if($scope.industrySectors[2].list.length === 0){
        $scope.industrySectors[2].list = data.BasicMaterialsList;
      }
    }
  };
  $scope.selectedSector = function(sectorName){
    if(sectorName == $scope.industrySectors[0].name){
      $scope.selectedHC = true;
      $scope.selectedTC = false;
      $scope.selectedBMC = false;
      $scope.downloadSectors()
    }
    else if (sectorName == $scope.industrySectors[1].name){
      $scope.selectedHC = false;
      $scope.selectedTC = true;
      $scope.selectedBMC = false;
      $scope.downloadSectors()
    }
    else{
      $scope.selectedHC = false;
      $scope.selectedTC = false;
      $scope.selectedBMC = true;
      $scope.downloadSectors()
    }
  }
}])
//directive for displaying industry sectors
//create directive's functions and bind values from DOM to directive's template variables
//bind to directive variable object in string format and convert it into object in template
.directive('product',[function(){
  return {
    scope: {
      sector: '@',
      selected: '@',
      addFunction: '&',
      removeFunction: '&'
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
        var myBool = value == "true";
        return myBool;
      }
      scope.formStrintToObject = function(string){
        var object = eval("(" + string + ')');
        return object;
      }
    }
  }
}]);