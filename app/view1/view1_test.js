'use strict';

describe('myApp.view1 module', function() {

  var view1Ctrl;
  var scope;

  beforeEach(module('myApp.view1'));
  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope;
    view1Ctrl = $controller('View1Ctrl', {$scope:scope});
  }));

  describe('view1 controller', function(){

    it('should ....', inject(function() {
      //spec body
      expect(view1Ctrl).toBeDefined();
    }));

  });

  describe('contentHoverFunc directive', function(){

    it('should change background-color....', inject(function($compile) {
      //spec body
      var menu = angular.element("<div class=\"main-menu\" ><div class = \"\" content-hover-func></div></div>");
      $compile(menu)(scope);
      menu.children().eq(0).triggerHandler("mouseenter");
      expect(menu.children().eq(0).hasClass("blackContentСrutch")).toBe(true);
      menu.children().eq(0).triggerHandler("mouseleave");
      expect(menu.children().eq(0).hasClass("blackContentСrutch")).toBe(false);
    }));

  });

  describe('View1Ctrl', function(){

    it('should create content model with 3 content div blocks and 3 menu blocks', inject(function() {
      expect(scope.documentContent.length).toBe(3);
      expect(Boolean(scope.documentContent[0].title)).toBe(true);
      expect(Boolean(scope.documentContent[0].menu)).toBe(true);
      expect(Boolean(scope.documentContent[1].title)).toBe(true);
      expect(Boolean(scope.documentContent[1].menu)).toBe(true);
      expect(Boolean(scope.documentContent[2].title)).toBe(true);
      expect(Boolean(scope.documentContent[2].menu)).toBe(true);
    }));

    it('should be not empty document title object', function() {
      expect(typeof scope.documentTitle).toBe('object');
      expect(scope.documentTitle.title).toBe("AngularJS App");
      expect(scope.documentTitle.menu).toBe("Main menu");
    });
  });

});