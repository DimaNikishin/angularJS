'use strict';

describe('myApp module', function() {

  var scope, indexCntrl;
  beforeEach(module('myApp'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    indexCntrl = $controller('indexCntrl', {$scope:scope});
  }));

  describe('indexCntrl controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      expect(indexCntrl).toBeDefined();
    }));

  });

  describe('view2 hide functions works', function(){

    it('should ....', inject(function() {
      expect(scope.isError).toBeUndefined();
      expect(scope.isStart).toBeUndefined();
      expect(scope.isComplete).toBeUndefined();
      scope.routeChangeStatus(false,false,false);
      expect(scope.isError).toBe(false);
      expect(scope.isStart).toBe(false);
      expect(scope.isComplete).toBe(false);
    }));

  });
});