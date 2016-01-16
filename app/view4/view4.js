'use strict';
//TODO:Also this code needs refactor, will be done when got time
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
  return {
    get: function(){
      var req = {
        method: 'GET',
        url: 'http://localhost:8080/app/Healthcare Sector.json',
        headers: {
          'Authorization': undefined
        }
      };
      return $http(req)
        .success(function (data) {
          return angular.fromJson(data);
        })
        .error(function (err) {
          return err;
        });
    }
  }
}])

.factory('additionalSectors', ['$http', function($http) {
  return{
    get: function(){
      var req = {
        method: 'GET',
        url: 'http://localhost:8080/app/Additional Sectors.json',
        headers: {
          'Authorization': undefined
        }
      };
      return $http(req)
        .success(function(data) {
          return angular.fromJson(data);
        })
        .error(function(err) {
          return err;
        });
    }
  }
}])
//when user leaves from view4 - array with selected and list sectors is added to cache and got form cache when user returns to view4 from another view
.controller('View4Ctrl', ['$scope','HealthCareSector','additionalSectors','$cacheFactory',function($scope,HealthCareSector,additionalSectors,$cacheFactory) {
  $scope.showDetails = true;
  $scope.hiddenSectors =[];
  function hideSector(element, index, array) {
    if (!element.price || element.price == "0.00") {
      var lastItem = array[array.length - 1];
      array[index] = lastItem;
      array[array.length - 1] = element;
      array.pop();
      $scope.hiddenSectors.push(element);
    }
  }
//array with selected sectors and all sectors for each industry type
//use array with selected sectors for display its names and total amount of selected sectors for each industry type
//anonymous function is not good enough in unit-testing
//TODO:rewrite from cache to services/factories
  $scope.controllerFunction = function(){
    if(!angular.isUndefined($cacheFactory.get('industrySectors'))){
      $scope.industrySectors = $cacheFactory.get('industrySectors').get('industrySectors');//find cached value in cacheId
      $scope.industrySectors[0].list.forEach(hideSector);
      $scope.selectedHC = true;
    }
    else{
      $scope.cache = $cacheFactory('industrySectors');//create cacheId and put there value if this cacheId not found
      $scope.industrySectors = [{name:"Healthcare Sector", selected:[], list: []},{name:"Technology Sector", selected:[], list: []},{name:"Basic Materials Sector", selected:[], list: []}];
      HealthCareSector.get().success(function(data){
        $scope.industrySectors[0].list = data.list;
        $scope.industrySectors[0].list.forEach(hideSector)
        $scope.selectedHC = true;
      });
      $scope.cache.put('industrySectors', $scope.industrySectors)
    }
  };
  $scope.controllerFunction();
//ADD & REMOVE functions was refactored and moved in one main function which return object with all functions
//add function which search by name for selected sector in array with all sectors and pushing selected into array with selected sectors
//  $scope.addFunction = function(sectorName){
//    function sectorSearch(element, index, array){
//      for (var name in element){
//        if(element.name === sectorName){
//          //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
//          element.selected = true;
//          return element;
//        }
//      }
//    }
//    var searchResult = (function(){
//      if($scope.industrySectors[0].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[0].list.filter(sectorSearch)}
//      else if($scope.industrySectors[1].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[1].list.filter(sectorSearch)}
//      else{return $scope.industrySectors[2].list.filter(sectorSearch)}
//    })();
//    //adding sector into appropriate industry type
//    if(searchResult[0].sectorType === "HC"){
//      $scope.industrySectors[0].selected.push(searchResult[0]);
//    }
//    else if(searchResult[0].sectorType === "TC"){
//      $scope.industrySectors[1].selected.push(searchResult[0]);
//    }
//    else{
//      $scope.industrySectors[2].selected.push(searchResult[0]);
//    }
//  };
////TODO: rewrite comments
//  $scope.removeFunction = function(sectorName){
//    function sectorSearch(element, index, array){
//      for (var name in element){
//        if(element.name === sectorName){
//          //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
//          element.selected = false;
//          return element;
//        }
//      }
//    }
//    var innerRemoveFunction = function(n){
//      var removeItem = $scope.industrySectors[n].selected.filter(sectorSearch);
//      var indexOfRemoveItem = $scope.industrySectors[n].selected.indexOf(removeItem[0])
//      var lastItem = $scope.industrySectors[n].selected[$scope.industrySectors[n].selected.length-1];
//      $scope.industrySectors[n].selected[indexOfRemoveItem] = lastItem;
//      $scope.industrySectors[n].selected[$scope.industrySectors[n].selected.length-1] = removeItem[0];
//      $scope.industrySectors[n].selected.pop();
//    };
//    var searchResult = (function(){
//      if($scope.industrySectors[0].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[0].list.filter(sectorSearch)}
//      else if($scope.industrySectors[1].list.filter(sectorSearch)[0] !== undefined){return $scope.industrySectors[1].list.filter(sectorSearch)}
//      else{return $scope.industrySectors[2].list.filter(sectorSearch)}
//    })();
//    //removing sector from appropriate industry type
//    if(searchResult[0].sectorType === "HC"){
//      innerRemoveFunction(0);
//    }
//    else if(searchResult[0].sectorType === "TC"){
//      innerRemoveFunction(1);
//    }
//    else{
//      innerRemoveFunction(2);
//    }
//  };
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
      additionalSectors.get().success(function(data){
        $scope.industrySectors[1].list = data.TechnologyList;
        $scope.industrySectors[2].list = data.BasicMaterialsList;
        $scope.industrySectors[1].list.forEach(hideSector);
        $scope.industrySectors[2].list.forEach(hideSector);
      });
    }
    else {
      if($scope.industrySectors[1].list.length === 0){
        additionalSectors.get().success(function(data){
          $scope.industrySectors[1].list = data.TechnologyList;
          $scope.industrySectors[1].list.forEach(hideSector);
        });
      }
      else if($scope.industrySectors[2].list.length === 0){
        additionalSectors.get().success(function(data){
          $scope.industrySectors[2].list = data.BasicMaterialsList;
          $scope.industrySectors[2].list.forEach(hideSector);
        });
      }
    }
  };
  $scope.selectedSector = function(sectorName){
    var innerSelectedSectorFunction = function(selectedHC,selectedTC,selectedBMC){
      $scope.downloadSectors();
      $scope.selectedHC = selectedHC;
      $scope.selectedTC = selectedTC;
      $scope.selectedBMC = selectedBMC;
    };
    if(sectorName == $scope.industrySectors[0].name){
      innerSelectedSectorFunction(true,false,false);
    }
    else if (sectorName == $scope.industrySectors[1].name){
      innerSelectedSectorFunction(false,true,false);
    }
    else{
      innerSelectedSectorFunction(false,false,true);
    }
  };

  //when controller loaded, check sector status and updated property status
  for(var i = 0; i < $scope.industrySectors.length; i++) {
    if ($scope.industrySectors[i].list.length > 0) {
      $scope.industrySectors[i].list.forEach(function (element, index, array) {
        if (!element.selected) {
          element.price = element.standardRates;
          element.details.PropertyOne.selected = false;
          element.details.PropertyTwo.selected = false;
        }
      })
    };
  }

//main function with inner function and returned object with functions which used in directive
  $scope.mainFunctional = function(sectorName){

    //filter function for all main functionality (search correct sector in array)
    function sectorSearch(element, index, array){
      for (var name in element){
        if(element.name === sectorName){
          return element;
        }
      }
    };

    //inner remove function to change order of elements and fully delete element from array
    function innerRemoveFunction(n){
      var removeItem = $scope.industrySectors[n].selected.filter(sectorSearch);
      var indexOfRemoveItem = $scope.industrySectors[n].selected.indexOf(removeItem[0])
      var lastItem = $scope.industrySectors[n].selected[$scope.industrySectors[n].selected.length-1];
      $scope.industrySectors[n].selected[indexOfRemoveItem] = lastItem;
      $scope.industrySectors[n].selected[$scope.industrySectors[n].selected.length-1] = removeItem[0];
      $scope.industrySectors[n].selected.pop();
    };

    return {
      //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
      addFunction : function(){
        var searchResult = (function(){
          for(var i = 0; i < $scope.industrySectors.length; i++){
            if($scope.industrySectors[i].list.filter(sectorSearch)[0] !== undefined){
              $scope.industrySectors[i].list.filter(sectorSearch)[0].selected = true;
              return $scope.industrySectors[i].list.filter(sectorSearch)
            }
          }
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
      },

      removeFunction : function(){
        //change selected flag fot sector object to correctly display add/remove sector buttons (avoid opportunity to add several times each sector)
        var searchResult = (function(){
          for(var i = 0; i < $scope.industrySectors.length; i++){
            if($scope.industrySectors[i].list.filter(sectorSearch)[0] !== undefined){
              $scope.industrySectors[i].list.filter(sectorSearch)[0].selected = false;
              return $scope.industrySectors[i].list.filter(sectorSearch)
            }
          }
        })();
        //removing sector from appropriate industry type
        if(searchResult[0].sectorType === "HC"){
          innerRemoveFunction(0);
        }
        else if(searchResult[0].sectorType === "TC"){
          innerRemoveFunction(1);
        }
        else{
          innerRemoveFunction(2);
        }
      },
      updateRates: function(sectorName, propertyStatusObject){
        var searchResult = (function(){
          for(var i = 0; i < $scope.industrySectors.length; i++){
            if($scope.industrySectors[i].list.filter(sectorSearch)[0] !== undefined){
              return $scope.industrySectors[i].list.filter(sectorSearch)
            }
          }
        })();
        if(searchResult[0].selected){
          searchResult[0].selected = false;
          alert("Rate was changed, sector is removed from cart")
          this.removeFunction();
        }
        if(propertyStatusObject.firstProperty || propertyStatusObject.secondProperty){
          if(propertyStatusObject.firstProperty){
            searchResult[0].price = ((Number(searchResult[0].price) * (100 + (searchResult[0].details.PropertyOne.value)))*0.01).toFixed(2);
            searchResult[0].details.PropertyOne.selected = true;
          }
          else{
            searchResult[0].price = ((Number(searchResult[0].price) * (100 + (searchResult[0].details.PropertyTwo.value)))*0.01).toFixed(2);
            searchResult[0].details.PropertyTwo.selected = true;
          }
        }
        else{
          searchResult[0].price = searchResult[0].standardRates;
        }
      }
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
      mainFunctional: '&'

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
      };
      scope.booleanVal = function(value){
        var myBool = value == "true";
        return myBool;
      };
      scope.formStrintToObject = function(string){
        var object = scope.$eval("(" + string + ')');
        return object;
      };//TODO:this object fails unittest, need fix in test or another solution in native angular object
      scope.additionalPropertyStatus = {
        firstProperty: scope.$eval(scope.sector).details.PropertyOne.selected,
        secondProperty: scope.$eval(scope.sector).details.PropertyTwo.selected
      }
    }
  }
}]);