/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
angular
  .module('myApp.index')
  .controller('indexController',indexController);

indexController.$inject = ['$scope','$location'];

function indexController($scope,$location){
  $scope.routeChangeStatus = function(isError,isStart,isComplete){
    $scope.isError = isError;
    $scope.isStart = isStart;
    $scope.isComplete = isComplete;
  };
  $scope.navigateTo = function(path){
    $scope.routeChangeStatus(false,false,false);
    $location.path(path)
  }
};
