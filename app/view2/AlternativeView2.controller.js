'use strict';
angular
  .module('myApp.view2')
  .controller('AlternativeControllerView2',View2Controller);

View1Controller.$inject = ['$scope','$rootScope'];
// controller that console reason why view2 controller is not loaded
function View2Controller($scope,$rootScope){
  $rootScope.$on('$routeChangeError',function(event, current, previous, rejection){
    console.log("failed to load JSON file");
    console.log(event);
    console.log(current);
    console.log(previous);
    console.log(rejection);
  })
}
