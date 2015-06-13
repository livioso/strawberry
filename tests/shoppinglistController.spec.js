describe('Shoppinglist Controller', function() {
  'use strict';

  var $controller, ShoppingListSpy;

  beforeEach(module('strawberry'));

  beforeEach(inject(function($rootScope, _$controller_, ShoppingList, $q) {
    this.scope = $rootScope.$new();

    $controller = _$controller_;
    ShoppingListSpy = ShoppingList;

    spyOn(ShoppingList, 'create').and.returnValue($q.when());
    spyOn(ShoppingList, 'get').and.returnValue($q.when());
    spyOn(ShoppingList, 'update').and.returnValue($q.when());

    $controller('shoppingListController', {
      $scope: this.scope,
      ShopplingList: ShoppingListSpy
    });
  }));

  describe('ShopplingListController loadData(...)', function() {
    it('should GET data from the ShoppingList', function() {
      this.scope.loadData();
      expect(ShoppingListSpy.get).toHaveBeenCalled();
    });
  });

  describe('ShopplingListController updateShoppingListItem(...)', function() {
    it('should GET data from the ShoppingList', function() {
      this.scope.currentlySelected = 'C0FFEEBABE';
      expect(ShoppingListSpy.get).toHaveBeenCalled();
    });
  });

  describe('ShopplingListController createShoppingItem(...)', function() {
    it('should create when formData.text is set', function() {
      var item = 'Cheese';
      var list = 'idlist';
      this.scope.formData = {};
      this.scope.formData.text = item;
      this.scope.currentList = list;
      this.scope.createShoppingItem();
      expect(ShoppingListSpy.create).toHaveBeenCalledWith(list, item);
    });

    it('should not create when formData.text is empty string', function() {
      this.scope.formData = {};
      this.scope.formData.text = '';
      this.scope.createShoppingItem();
      expect(ShoppingListSpy.create).not.toHaveBeenCalled();
    });

    it('should not create when formData.text is undefined', function() {
      this.scope.formData = {};
      this.scope.formData.text = undefined;
      this.scope.createShoppingItem();
      expect(ShoppingListSpy.create).not.toHaveBeenCalled();
    });
  });
});
