'use strict';

describe('myApp.view4 module', function() {

  var view4Ctrl;
  var scope;

  beforeEach(module('myApp.view4'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    view4Ctrl = $controller('View4Ctrl', {$scope:scope});
  }));

  describe('view4 controller', function(){

    it('should ....', inject(function() {
      //spec body
      expect(view4Ctrl).toBeDefined();
    }));

  });

});