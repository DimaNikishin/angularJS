'use strict';

describe('myApp.view4 module', function() {

  describe('view4 controller', function(){
    var view4Ctrl;
    var scope;

    beforeEach(module('myApp.view4'));
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope;
      view4Ctrl = $controller('View4Ctrl', {$scope:scope});
    }));

    it('should ....', inject(function() {
      //spec body
      expect(view4Ctrl).toBeDefined();
    }));

  });

  describe('view4 selectedNames filter', function(){
    var view4Ctrl;
    var scope;

    beforeEach(module('myApp.view4'));
    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope;
      view4Ctrl = $controller('View4Ctrl', {$scope:scope});
    }));

    it('should return string with sorted by length sectors names', inject(function(selectedNamesFilter) {
      //spec body
      expect(selectedNamesFilter([{name:'name'},{name:'name three'},{name:'name two'}])).toEqual("name; name two; name three; ");
    }));

  });

  describe('httpBasedService', function () {

    var httpBackend;
    var httpBasedService;

    beforeEach(module('myApp.view4'));
    beforeEach(inject(function($httpBackend, _HealthCareSector_){
      httpBasedService = _HealthCareSector_;
      httpBackend = $httpBackend;
    }));

    it('should return the response.', function (){

      var returnData = { exist: true };
      httpBackend.expectGET('http://localhost:8080/app/Healthcare Sector.json').respond(returnData);

      var returnedPromise = httpBasedService;

      var result;
      returnedPromise.then(function(response) {
        result = response.data;
      });

      httpBackend.flush();

      expect(result).toEqual(returnData);
    });
  });

  describe('second httpBasedService', function () {

    var httpBackend;
    var secondHttpBasedService;

    beforeEach(module('myApp.view4'));
    beforeEach(inject(function($httpBackend, _additionalSectors_){
      secondHttpBasedService = _additionalSectors_;
      httpBackend = $httpBackend;
    }));

    it('should return the response.', function (){

      var returnData = { exist: true };
      httpBackend.expectGET('http://localhost:8080/app/Additional Sectors.json').respond(returnData);

      var returnedPromise = secondHttpBasedService;

      var result;
      returnedPromise.then(function(response) {
        result = response.data;
      });

      httpBackend.flush();

      expect(result).toEqual(returnData);
    });
  });

});