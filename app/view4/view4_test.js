'use strict';

describe('myApp.view4 module', function() {

  var view4Ctrl;
  var scope;
  var httpBackend;

  beforeEach(module('myApp.view4'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend){
    scope = $rootScope;
    httpBackend = $httpBackend;
    view4Ctrl = $controller('View4Ctrl', {$scope:scope});
  }));

  describe('view4 controller', function(){

    it('should ....', inject(function() {
      //spec body
      expect(view4Ctrl).toBeDefined();
    }));

  });

  describe('view4 selectedNames filter', function(){

    it('should return string with sorted by length sectors names', inject(function(selectedNamesFilter) {
      //spec body
      expect(selectedNamesFilter([{name:'name'},{name:'name three'},{name:'name two'}])).toEqual("name; name two; name three; ");
    }));

  });

});