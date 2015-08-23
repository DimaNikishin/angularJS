'use strict';

describe('myApp module', function() {

  beforeEach(module('myApp'));

  describe('indexCntrl controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new()
      var view1Ctrl = $controller('indexCntrl', {$scope:scope });
      expect(view1Ctrl).toBeDefined();
    }));

  });
});