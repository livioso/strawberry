describe('Shoppinglist Service', function() {
  'use strict';

  var httpBackend, http, serviceUnderTest;

  beforeEach(module('shoppingListService'));

  beforeEach(inject(function(_ShoppingList_, $httpBackend, $http) {
    httpBackend = $httpBackend;
    http = $http;
    serviceUnderTest = _ShoppingList_;
  }));

  afterEach(function() {
    //make sure we don't miss any expectations
    httpBackend.flush();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('create shopping list item', function() {
    it('should call the creation on the backend', function() {
      httpBackend.expectPUT('/api/list/55081de2162072120758fc53').respond('');
      serviceUnderTest.create();
    });
  });
});
