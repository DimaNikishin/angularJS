'use strict';

describe('myApp module', function() {

  var scope, indexCntrl, route;
  beforeEach(module('myApp'));
  beforeEach(inject(function($controller, $rootScope, $route){
    scope = $rootScope;
    indexCntrl = $controller('indexCntrl', {$scope:scope});
    route = $route;
  }));

  describe('indexCntrl controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      expect(indexCntrl).toBeDefined();
    }));

  });

  describe('indexCntrl hide functions works', function(){

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

  describe('app route functions', function(){

    it('should ....', inject(function() {
      expect(route.routes['/Home'].controller).toBe('View1Ctrl');
      expect(route.routes['/Home'].templateUrl).
        toEqual('view1/view1.html');

      expect(route.routes['/Gallery'].templateUrl).
        toEqual('view2/view2.html');
      expect(route.routes['/Gallery'].controller).
        toEqual('View2Ctrl');

      expect(route.routes['/CodeSandbox'].templateUrl).
        toEqual('view3/view3.html');
      expect(route.routes['/CodeSandbox'].controller).
        toEqual('View3Ctrl');

      // otherwise redirect to
      expect(route.routes[null].redirectTo).toEqual('/Home')
    }));

  });
});