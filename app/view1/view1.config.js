/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
//TODO: write comments

angular
  .module('myApp.view1')
  .config(view1Config);

view1Config.$inject = ['$routeProvider']

function view1Config($routeProvider){
  $routeProvider.when('/Home', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Controller'
  });
}