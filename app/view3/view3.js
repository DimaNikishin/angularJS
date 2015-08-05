'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/CodeSandbox', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
    });
}])

.factory('Data', function(){
    return {message: "I'am not only one"}
})

.filter('reverse', function(){
    return function(text){
        return text.split("").reverse().join("")
    }
})

.controller('View3Ctrl', ['$scope','Data', function($scope, Data) {
    $scope.message = "data1"
    $scope.data = Data
    $scope.messageReverted = function(message){
        return message.split("").reverse().join("")
    }
}])

.controller('View4Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data2"
    $scope.data = Data
}])

.controller('View5Ctrl', ['$scope', 'Data', function($scope, Data) {
    $scope.message = "data3"
    $scope.data = Data
}]);
