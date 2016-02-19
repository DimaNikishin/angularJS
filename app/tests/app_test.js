'use strict';

describe('myApp module', function() {

  var scope, indexCntrl, route;
  beforeEach(module('myApp'));
  beforeEach(inject(function($route){
//создаю в rootScope обьект чайлд скоуп(scope) через функцию .$new() полсе чего передаю этот скоуп в функцию контструктор контлера IndexCntrl,
//которая создает проперити этому обьекту чайлд скопу и после чего тестирую на наличей этих пропертей(проверяю что конструктор работает)
//если бы у этого обьекта чайлд скоуп(scope) был вложеный обьект чайлд скоуп(scopeСhild) - создавал бы его через функцию .$new() уже дочернего скоупа(scope) (scope.$new()) а не главного($rootScope)
    route = $route;
  }));

  describe('app route functions', function(){

    it('should ....', inject(function() {
      expect(route.routes['/Home'].controller).toBe('View1Controller');
      expect(route.routes['/Home'].templateUrl).
        toEqual('view1/view1.html');

      expect(route.routes['/Gallery'].templateUrl).
        toEqual('view2/view2.html');
      expect(route.routes['/Gallery'].controller).
        toEqual('View2Controller');

      expect(route.routes['/CodeSandbox'].templateUrl).
        toEqual('view3/view3.html');
      expect(route.routes['/CodeSandbox'].controller).
        toEqual('View3Ctrl');

      // otherwise redirect to
      expect(route.routes[null].redirectTo).toEqual('/Home')
    }));

  });
});