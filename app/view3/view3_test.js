'use strict';

describe('myApp.view3 module', function() {

    beforeEach(module('myApp.view3'));

    describe('view3 controller', function(){

        it('should ....', inject(function($controller, $rootScope) {
            //spec body
            var scope = $rootScope.$new()
            var view3Ctrl = $controller('View3Ctrl', {$scope:scope });
            expect(view3Ctrl).toBeDefined();
        }));

    });
});

describe('myApp.view3 filter', function() {

    beforeEach(module('myApp.view3'));

    describe('view3 reverse filter', function(){

        it('should reverse string', inject(function(reverseFilter) {
            //spec body
            expect(reverseFilter("Dima")).toEqual("amiD");
        }));

    });
});