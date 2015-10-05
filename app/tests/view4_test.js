'use strict';

describe('myApp.view4 module', function() {

  describe('view4 controller', function(){
    var view4Ctrl;
    var scope;
    var cacheFactory;

    beforeEach(module('myApp.view4'));
    beforeEach(inject(function($controller, $rootScope,$cacheFactory,HealthCareSector,additionalSectors){
      scope = $rootScope;
      view4Ctrl = $controller('View4Ctrl', {$scope:scope,HealthCareSector:HealthCareSector,additionalSectors:additionalSectors});
      cacheFactory = $cacheFactory;

      spyOn(additionalSectors, 'get').and.callFake(function() {
        return {
          success: function(callback) { callback({TechnologyList: '1',BasicMaterialsList:'2'})}
        };
      });
    }));

    it('should ....', inject(function() {
      //spec body
      expect(view4Ctrl).toBeDefined();
    }));

    it('should return string with sorted by length sectors names', inject(function(selectedNamesFilter) {
      //spec body
      expect(selectedNamesFilter([{name:'name'},{name:'name three'},{name:'name two'}])).toEqual("name; name two; name three; ");
    }));

    it('controller should save array into cache', inject(function(){
      //first run of controllerFunction when controller is injected
      expect(scope.industrySectors).toBe(cacheFactory.get('industrySectors').get('industrySectors'));
      expect(scope.cache).toBe(cacheFactory.get('industrySectors'));
      expect(scope.showDetails).toBe(true);

      expect(scope.cache.info()).toEqual({
        id: 'industrySectors',
        size: 1
      });
      expect(scope.cache.get('industrySectors')).toBe(scope.industrySectors);

      scope.cache.removeAll();
      expect(scope.cache.info()).toEqual({
        id: 'industrySectors',
        size: 0
      });
      //test second run of controllerFunction and creating scope.selectedHC within
      scope.controllerFunction();
      expect(scope.selectedHC).toBe(true);

    }));

    it('function selectedProducts should return true or false depending on argument length',inject(function(){

      expect(scope.selectedProducts([])).toBe(false);
      expect(scope.selectedProducts([1,2])).toBe(true);

    }));

    it('function selectedSector should change vars depending on argument',inject(function(){
      //in test also added call of scope.downloadSectors()
      scope.selectedSector(scope.industrySectors[0].name);
      expect(scope.selectedHC).toBe(true);
      expect(scope.selectedTC).toBe(false);
      expect(scope.selectedBMC).toBe(false);
      expect(scope.industrySectors[1].list).toEqual('1');
      expect(scope.industrySectors[2].list).toEqual('2');

      scope.industrySectors[1].list = ['not empty'];
      scope.industrySectors[2].list = [];
      scope.selectedSector(scope.industrySectors[1].name);
      expect(scope.selectedHC).toBe(false);
      expect(scope.selectedTC).toBe(true);
      expect(scope.selectedBMC).toBe(false);
      expect(scope.industrySectors[1].list).toEqual(['not empty']);
      expect(scope.industrySectors[2].list).toEqual('2');

      scope.industrySectors[1].list = [];
      scope.industrySectors[2].list = ['not empty'];
      scope.selectedSector(scope.industrySectors[2].name);
      expect(scope.selectedHC).toBe(false);
      expect(scope.selectedTC).toBe(false);
      expect(scope.selectedBMC).toBe(true);
      expect(scope.industrySectors[1].list).toEqual('1');
      expect(scope.industrySectors[2].list).toEqual(['not empty']);
    }));

    it('function should call for factory and set to additional sectors lists values from factory depending on its length ', inject(function(){
//tested call to factory by Jasmine.js spies and fake callback, depending on additional sectors lists length, callback from
// factory should be saved into additional sectors lists

      scope.downloadSectors();
      expect(scope.industrySectors[1].list).toEqual('1');
      expect(scope.industrySectors[2].list).toEqual('2');

      scope.industrySectors[1].list = ['not empty'];
      scope.industrySectors[2].list = [];
      scope.downloadSectors();
      expect(scope.industrySectors[1].list).toEqual(['not empty']);
      expect(scope.industrySectors[2].list).toEqual('2');

      scope.industrySectors[1].list = [];
      scope.industrySectors[2].list = ['not empty'];
      scope.downloadSectors();
      expect(scope.industrySectors[1].list).toEqual('1');
      expect(scope.industrySectors[2].list).toEqual(['not empty']);

      scope.industrySectors[1].list = ['not empty'];
      scope.industrySectors[2].list = ['not empty'];
      scope.downloadSectors();
      expect(scope.industrySectors[1].list).toEqual(['not empty']);
      expect(scope.industrySectors[2].list).toEqual(['not empty']);

    }));

    it('addFunction should search selected sector in industrySectors.list and push in industrySectors.selected',inject(function(){
      scope.industrySectors = [{name:"Healthcare Sector", selected:[], list: [{name: "Health", sectorType:"HC"}]},{name:"Technology Sector", selected:[], list: [{name: "Tech", sectorType:"TC"}]},{name:"Basic Materials Sector", selected:[], list: [{name: "Basic Materials", sectorType:"BMC"}]}];
      expect(scope.industrySectors[0].selected.length).toBe(0);
      expect(scope.industrySectors[1].selected.length).toBe(0);
      expect(scope.industrySectors[2].selected.length).toBe(0);
      scope.addFunction("Health")
      expect(scope.industrySectors[0].selected.length).toBe(1);
      expect(scope.industrySectors[0].selected).toEqual([{name: "Health", sectorType:"HC", selected: true}]);
      expect(scope.industrySectors[1].selected.length).toBe(0);
      expect(scope.industrySectors[2].selected.length).toBe(0);
      scope.addFunction("Tech")
      expect(scope.industrySectors[0].selected.length).toBe(1);
      expect(scope.industrySectors[0].selected).toEqual([{name: "Health", sectorType:"HC", selected: true}]);
      expect(scope.industrySectors[1].selected.length).toBe(1);
      expect(scope.industrySectors[1].selected).toEqual([{name: "Tech", sectorType:"TC", selected: true}]);
      expect(scope.industrySectors[2].selected.length).toBe(0);
      scope.addFunction("Basic Materials")
      expect(scope.industrySectors[0].selected.length).toBe(1);
      expect(scope.industrySectors[0].selected).toEqual([{name: "Health", sectorType:"HC", selected: true}]);
      expect(scope.industrySectors[1].selected.length).toBe(1);
      expect(scope.industrySectors[1].selected).toEqual([{name: "Tech", sectorType:"TC", selected: true}]);
      expect(scope.industrySectors[2].selected.length).toBe(1);
      expect(scope.industrySectors[2].selected).toEqual([{name: "Basic Materials", sectorType:"BMC", selected: true}]);
    }));

    it('removeFunction should move element to end remove from industrySectors.selected', inject(function(){
      scope.industrySectors = [{name:"Healthcare Sector", selected:[{name: "Health", sectorType:"HC"}], list: [{name: "Health", sectorType:"HC"}]},{name:"Technology Sector", selected:[{name: "Tech", sectorType:"TC"}], list: [{name: "Tech", sectorType:"TC"}]},{name:"Basic Materials Sector", selected:[{name: "Basic Materials", sectorType:"BMC"}], list: [{name: "Basic Materials", sectorType:"BMC"}]}];
      expect(scope.industrySectors[0].selected.length).toBe(1);
      expect(scope.industrySectors[1].selected.length).toBe(1);
      expect(scope.industrySectors[2].selected.length).toBe(1);

      scope.removeFunction("Health");
      expect(scope.industrySectors[0].selected.length).toBe(0);
      expect(scope.industrySectors[0].list).toEqual([{name: "Health", sectorType:"HC", selected: false}]);

      expect(scope.industrySectors[1].selected.length).toBe(1);
      expect(scope.industrySectors[1].list).toEqual([{name: "Tech", sectorType:"TC"}]);
      expect(scope.industrySectors[1].selected).toEqual([{name: "Tech", sectorType:"TC"}]);

      expect(scope.industrySectors[2].selected.length).toBe(1);
      expect(scope.industrySectors[2].list).toEqual([{name: "Basic Materials", sectorType:"BMC"}]);
      expect(scope.industrySectors[2].selected).toEqual([{name: "Basic Materials", sectorType:"BMC"}]);

      scope.removeFunction("Tech");
      expect(scope.industrySectors[0].selected.length).toBe(0);
      expect(scope.industrySectors[0].list).toEqual([{name: "Health", sectorType:"HC", selected: false}]);

      expect(scope.industrySectors[1].selected.length).toBe(0);
      expect(scope.industrySectors[1].list).toEqual([{name: "Tech", sectorType:"TC", selected: false}]);

      expect(scope.industrySectors[2].selected.length).toBe(1);
      expect(scope.industrySectors[2].list).toEqual([{name: "Basic Materials", sectorType:"BMC"}]);
      expect(scope.industrySectors[2].selected).toEqual([{name: "Basic Materials", sectorType:"BMC"}]);

      scope.removeFunction("Basic Materials");
      expect(scope.industrySectors[0].selected.length).toBe(0);
      expect(scope.industrySectors[0].list).toEqual([{name: "Health", sectorType:"HC", selected: false}]);

      expect(scope.industrySectors[1].selected.length).toBe(0);
      expect(scope.industrySectors[1].list).toEqual([{name: "Tech", sectorType:"TC", selected: false}]);

      expect(scope.industrySectors[2].selected.length).toBe(0);
      expect(scope.industrySectors[2].list).toEqual([{name: "Basic Materials", sectorType:"BMC", selected: false}]);

      //moving elements in array
      scope.industrySectors = [{name:"Healthcare Sector", selected:[{name: "Health", sectorType:"HC"},{name: "Health1", sectorType:"HC"},{name: "Health2", sectorType:"HC"}], list: [{name: "Health", sectorType:"HC"},{name: "Health1", sectorType:"HC"},{name: "Health2", sectorType:"HC"}]},{name:"Technology Sector", selected:[{name: "Tech", sectorType:"TC"},{name: "Tech1", sectorType:"TC"},{name: "Tech2", sectorType:"TC"}], list: [{name: "Tech", sectorType:"TC"},{name: "Tech1", sectorType:"TC"},{name: "Tech2", sectorType:"TC"}]},{name:"Basic Materials Sector", selected:[{name: "Basic Materials", sectorType:"BMC"},{name: "Basic1 Materials", sectorType:"BMC"},{name: "Basic2 Materials", sectorType:"BMC"}], list: [{name: "Basic Materials", sectorType:"BMC"},{name: "Basic1 Materials", sectorType:"BMC"},{name: "Basic2 Materials", sectorType:"BMC"}]}];
      expect(scope.industrySectors[0].selected[0].name).toEqual("Health");
      scope.removeFunction("Health");
      expect(scope.industrySectors[0].selected[0].name).toEqual("Health2");
      expect(scope.industrySectors[0].selected[1].name).toEqual("Health1");
      expect(scope.industrySectors[0].selected.length).toBe(2);
      scope.removeFunction("Health2");
      expect(scope.industrySectors[0].selected[0].name).toEqual("Health1");
      expect(scope.industrySectors[0].selected.length).toBe(1);

      expect(scope.industrySectors[1].selected[2].name).toEqual("Tech2");
      scope.removeFunction("Tech2");
      expect(scope.industrySectors[1].selected[0].name).toEqual("Tech");
      expect(scope.industrySectors[1].selected[1].name).toEqual("Tech1");
      expect(scope.industrySectors[1].selected.length).toBe(2);
      scope.removeFunction("Tech1");
      expect(scope.industrySectors[1].selected[0].name).toEqual("Tech");
      expect(scope.industrySectors[1].selected.length).toBe(1);

      expect(scope.industrySectors[2].selected[1].name).toEqual("Basic1 Materials");
      scope.removeFunction("Basic1 Materials");
      expect(scope.industrySectors[2].selected[0].name).toEqual("Basic Materials");
      expect(scope.industrySectors[2].selected[1].name).toEqual("Basic2 Materials");
      expect(scope.industrySectors[2].selected.length).toBe(2);
      scope.removeFunction("Basic2 Materials");
      expect(scope.industrySectors[2].selected[0].name).toEqual("Basic Materials");
      expect(scope.industrySectors[2].selected.length).toBe(1);
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

      var returnedPromise = httpBasedService.get();

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

      var returnedPromise = secondHttpBasedService.get();

      var result;
      returnedPromise.then(function(response) {
        result = response.data;
      });

      httpBackend.flush();

      expect(result).toEqual(returnData);
    });
  });

});