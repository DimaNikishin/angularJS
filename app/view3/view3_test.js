'use strict';

describe('myApp.view3 module', function() {

  var view3Ctrl;
  var scope;

  beforeEach(module('myApp.view3'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    view3Ctrl = $controller('View3Ctrl', {$scope:scope});
  }));


  describe('view3 controller', function(){

      it('should ....', inject(function() {
          //spec body
          expect(view3Ctrl).toBeDefined();
      }));

  });

  describe('view3 reverse filter', function(){

    it('should reverse string', inject(function(reverseFilter) {
      //spec body
      expect(reverseFilter("Dima")).toEqual("amiD");
    }));

  });
});
