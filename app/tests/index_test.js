'use strict';

describe('myApp.index module', function() {

  var scope, indexCntrl, route;
  beforeEach(module('myApp.index'));
  beforeEach(inject(function($controller, $rootScope){
//создаю в rootScope обьект чайлд скоуп(scope) через функцию .$new() полсе чего передаю этот скоуп в функцию контструктор контлера IndexCntrl,
//которая создает проперити этому обьекту чайлд скопу и после чего тестирую на наличей этих пропертей(проверяю что конструктор работает)
//если бы у этого обьекта чайлд скоуп(scope) был вложеный обьект чайлд скоуп(scopeСhild) - создавал бы его через функцию .$new() уже дочернего скоупа(scope) (scope.$new()) а не главного($rootScope)
    scope = $rootScope.$new();
    indexCntrl = $controller('indexController', {$scope:scope});
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

});