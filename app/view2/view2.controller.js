'use strict';
angular
  .module('myApp.view2')
  .controller('View2Controller',View2Controller);

View1Controller.$inject = ['$scope','$http'];
// main view2 controller with methods
//weather was deleted from dependency because it was changed to ajax call from resolve
//ajax call is moved to controller to cover it with unit test (don't know how to trigger ajax call from route resolve in karma test
function View2Controller($scope,$http){
  var req = {
    method: 'GET',
    url: 'http://localhost:8080/app/gallery.json',
    headers: {
      'Authorization': undefined
    }
  };

  $http(req).success(function(data) {
    $scope.appGallery = data;
  })
    .error(function(err) {
      return err;
    });
  //$scope.appGallery = promisesGallery.data;
  //weather.success(function(data){
  //  $scope.weatherObjects = data;
  //})
  $scope.isContentVisible = true;
  $scope.hideContent = function(){
    $scope.isContentVisible = false;
  };
  $scope.showContent = function(){
    $scope.isContentVisible = true;
  };
  $scope.viewBackground = function(backgroundPic){
    angular.element('.jumbotron').css({
      'background-image': 'url(' +backgroundPic +')',
      'background-repeat': 'no-repeat'
    })
  }
}
