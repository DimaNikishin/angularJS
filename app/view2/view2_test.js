'use strict';
//TODO:write utit test for AJAX call from ngroute promise (don't know how to generate call from promise in test) - need make some investigation in future
//change AJAX call in view2 and cover it with unit test
describe('myApp.view2 module', function() {

  var scope, view2Ctrl, httpBackend;

  beforeEach(module('myApp.view2'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend){{
    scope = $rootScope;
    view2Ctrl = $controller('View2Ctrl', {$scope:scope});
    httpBackend = $httpBackend;
    httpBackend.expectGET('http://localhost:8000/app/gallery.json').
      respond([{name: 'AJAX'}, {name: 'CALL'}, {name: 'TEST'}]);
  }}));

  describe('view2 controller', function(){

    it('should ....', inject(function() {
      //spec body
      expect(view2Ctrl).toBeDefined();
    }));

  });

  describe('view2 hide functions works', function(){

    it('should ....', inject(function() {
      expect(scope.isContentVisible).toBe(true);
      scope.hideContent();
      expect(scope.isContentVisible).toBe(false);
      scope.showContent();
      expect(scope.isContentVisible).toBe(true);
    }));

  });

  describe('view2 AJAX call', function(){

    it('should ....', inject(function() {
      expect(scope.appGallery).toBeUndefined();
      httpBackend.flush();

      expect(scope.appGallery).toEqual([{name: 'AJAX'}, {name: 'CALL'}, {name: 'TEST'}]);
    }));

  });

  describe('view2 weather directive shoudl create img DOMNode', function(){

    it('should ....', inject(function($compile) {
      var weather = angular.element("<div><weather></weather></div>");
      $compile(weather)(scope);
      expect(weather.find('img').length).toBe(1);
    }));

  });
});