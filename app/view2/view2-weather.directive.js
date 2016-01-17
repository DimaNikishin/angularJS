/**
 * Created by dimanikishin on 17.01.16.
 */
'use strict';
// pic directive
angular
  .module('myApp.view2')
  .directive('weather',weather);

weather.$inject = [];

function weather(){
  return {
    restrict:'E',
    replace: true,
    scope: {
      picture:"@"
    },
    template:'<img ng-src="{{picture}}">'
  }
}
