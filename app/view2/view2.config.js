/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
angular
  .module('myApp.view2')
  .config(view2Config);

view2Config.$inject = ['$routeProvider']
// make ajax call in resolve service and comment ajax call in service(factory)
// 3 ways of AJAX call:
// 1 - in servicec via .factory ('weather')
// 2- in resolve of $routeProvider via direct call $http ('gallery')
// 3 - in resolve of $routeProvider via $q and promises ('promisesGallery')
function view2Config($routeProvider){
  $routeProvider.when('/Gallery', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Controller',
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
}

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

