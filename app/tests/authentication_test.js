'use strict';

describe('myApp.authentication module', function() {

  describe('AuthenticationService', function () {

    var AuthenticationService;
    var $timeout;
    var rootScope;
    var $cookieStore

    beforeEach(module('myApp.authentication'));
    beforeEach(inject(function(_AuthenticationService_,_$timeout_,$rootScope,_$cookieStore_) {
      AuthenticationService = _AuthenticationService_;
      $timeout = _$timeout_;
      rootScope = $rootScope.$new();
      $cookieStore = _$cookieStore_;

      spyOn($cookieStore, 'put').and.callFake(function() {
        return {
          success: function(callback) { callback(true)}
        };
      });
      spyOn($cookieStore, 'remove').and.callFake(function() {
        return {
          success: function(callback) { callback(true)}
        };
      });
    }));


    it('should create service with functions', function (){

      expect(AuthenticationService).toBeDefined;
      expect(typeof AuthenticationService.Login).toEqual("function");
      expect(typeof AuthenticationService.SetCredentials).toEqual("function");
      expect(typeof AuthenticationService.ClearCredentials).toEqual("function");
    });

    it('should create Login function', function (){
      var result;
      var callback = function(response) {
        if(response.success) {
          result = true;
        } else {
          result = false;
        }
      };

      AuthenticationService.Login('name','Password', callback);
      $timeout.flush();
      expect(result).toBeFalsy();
      AuthenticationService.Login('Username','Pass', callback);
      $timeout.flush();
      expect(result).toBeFalsy();
      AuthenticationService.Login('Username','Password', callback);
      $timeout.flush();
      expect(result).toBeTruthy();

    });

    it('should create SetCredentials function', function (){
      AuthenticationService.SetCredentials('name','password');
      expect(rootScope.globals).toBeDefined();
      expect(rootScope.globals.currentUser.username).toEqual('name');
      expect(rootScope.globals.currentUser.authdata).toEqual('name:password');
      var cookieCall = $cookieStore.put();
      expect(cookieCall).toBeTruthy()
    });

    it('should create ClearCredentials function', function (){
      AuthenticationService.SetCredentials('name','password');
      AuthenticationService.ClearCredentials();
      expect(rootScope.globals).toBeDefined();
      expect(rootScope.globals.currentUser).toBeUndefined();
      expect(typeof rootScope.globals).toEqual('object');
      var cookieCall = $cookieStore.remove();
      expect(cookieCall).toBeTruthy()
    });
  });


});