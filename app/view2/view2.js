'use strict';

angular.module('myApp.view2', ['ngRoute','ngAnimate'])
// make ajax call in resolve service and comment ajax call in service(factory)
  // 3 ways of AJAX call:
  // 1 - in servicec via .factory ('weather')
  // 2- in resolve of $routeProvider via direct call $http ('gallery')
  //3 - in resolve of $routeProvider via $q and promises ('promisesGallery')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Gallery', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl',
    resolve: {
      timeout: ['$timeout','$q', function($timeout, $q){//add timeout for listen routeChange events (without it goes to fast)
        var defer = $q.defer();
        $timeout(function(){defer.resolve();},2000);
        return defer.promise;
      }]
      //promisesGallery: ['$http', function($http) {
      //  return $http.get('http://localhost:8000/app/gallery.json')
      //    .success(function(item) {
      //      return angular.fromJson(item);
      //    })
      //    .error(function(err) {
      //      return err;
      //    });
      //}],
      //promisesGallery: ['$http','$q','$timeout', function($http, $q, $timeout){
      //  var defer = $q.defer();
      //  $timeout(function(){defer.resolve();},2); //add timeout for listen routeChange events (without it goes to fast)
      //  return defer.promise.then(function(){return $http.get('http://localhost:8000/app/gallery.json')
      //    .success(function(item) {
      //      return angular.fromJson(item);
      //    })
      //    .error(function(err) {
      //      return err;
      //    });})
      //}]
    }
  });
}])
// main view2 controller with methods
//weather was deleted from dependency because it was changed to ajax call from resolve
//ajax call is moved to controller to cover it with unit test (don't know how to trigger ajax call from route resolve in karma test
.controller('View2Ctrl', ['$scope','$http', function($scope, $http) {
  $http.get('http://localhost:8080/app/gallery.json').success(function(data) {
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
// controller that console reason why view2 controller is not loaded

.controller('AlternativeCntrlView2',['$scope','$rootScope', function($scope, $rootScope){
  $rootScope.$on('$routeChangeError',function(event, current, previous, rejection){
    console.log("failed to load JSON file");
    console.log(event);
    console.log(current);
    console.log(previous);
    console.log(rejection);
  })
}])

//toggle animation via TweenMax
.animation(".toggle", function(){
  return {
    leave: function(element, done){
      TweenMax.fromTo(element,1, {opacity: 1}, {opacity:0, onComplete:done})
    },
    enter: function(element, done){
      TweenMax.fromTo(element,1, {opacity: 0}, {opacity:1, onComplete:done})
    }
  }
});
