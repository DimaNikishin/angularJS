'use strict';

angular.module('myApp.view2', ['ngRoute'])
// make ajax call in resolve service and comment ajax call in service(factory)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Gallery', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    resolve: {
      gallery: ['$http', function($http) {
        return $http.get('http://localhost:8000/app/gallery.json')
          .success(function(item) {
            return angular.fromJson(item);
          })
          .error(function(err) {
            return err;
          });
      }]
    }
  });
}])
// main view2 controller with methods
//weather was deleted from dependency because it was changed to ajax call from resolve
.controller('View2Ctrl', ['$scope','gallery', function($scope, gallery) {
  $scope.appGallery = gallery.data;
  //weather.success(function(data){
  //  $scope.weatherObjects = data;
  //})
  $scope.isContentVisible = true;
  $scope.hideContent = function(){
    $scope.isContentVisible = false;
  }
  $scope.showContent = function(){
    $scope.isContentVisible = true;
  }
  $scope.viewBackground = function(backgroundPic){
    angular.element('.jumbotron').css({
      'background-image': 'url(' +backgroundPic +')',
      'background-repeat': 'no-repeat'
    })
  }
}])
// http request data
//.factory('weather', ['$http', function($http) {
//  return $http.get('http://localhost:8000/app/gallery.json')
//    .success(function(data) {
//      return angular.fromJson(data);
//    })
//    .error(function(err) {
//      return err;
//    });
//}])
// pic directive
.directive('weather',[function(){
  return {
    restrict:'E',
    replace: true,
    scope: {
      picture:"@"
    },
    template:'<img ng-src="{{picture}}">'
  }
}])