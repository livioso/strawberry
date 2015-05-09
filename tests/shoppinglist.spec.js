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
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('get shopping list', function() {
    it('should call the get api backend callback', function() {
      httpBackend.expectGET('/api/list/55081de2162072120758fc53').respond('');
      serviceUnderTest.get();
      httpBackend.flush();
    });
  });

  describe('update shopping list item', function() {
    it('should call the get api backend callback', function() {
      httpBackend.expectPUT('/api/list/55081de2162072120758fc53/2').respond('');
      serviceUnderTest.update(2, true);
      httpBackend.flush();
    });
  });

  describe('create shopping list item', function() {
    it('should call the create api backend callback', function() {
      httpBackend.expectPUT('/api/list/55081de2162072120758fc53').respond('');
      serviceUnderTest.create();
      httpBackend.flush();
    });
  });

  describe('delete shopping list item', function() {
    it('should not call delete api backend callback with no id', function() {
      serviceUnderTest.delete();
    });

    it('should call the delete api backend callback with id', function() {
      var expectedID = 431234567;
      httpBackend.expectDELETE('/api/list/item/' + expectedID).respond('');
      serviceUnderTest.delete(expectedID);
      httpBackend.flush();
    });
  });
});
