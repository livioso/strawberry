angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    $scope.loadData = function() {
      ShoppingList.get().then(function (response) {
        $scope.shoppinglistItems = response.data[0].items;
      });
    };

    $scope.switchList = function(listid) {
      $scope.currentList = listid;
    };

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      if (item !== '' && item !== undefined) {
        ShoppingList.create(item).then(function () {
          $scope.loadData();
        });
        // read for next entry
        $scope.formData = {};
      }
    };

    $scope.checkShoppingItem = function (itemId) {
      ShoppingList.update(itemId, true).then(function () {
        $scope.loadData();
      });
    };

    // setup the data :)
    $scope.formData = {};
    $scope.loading = true;
    $scope.loadData();

    $scope.shoppinglists = [
      {
        'name': 'Maria und Livio',
        '_id': 'id1'
      },
      {
        'name': 'At my parents',
        '_id': 'id2'
      }];

    // set the type ahead data -> Move me to service!
    $http.get('/category').success(function (data) {
      $scope.products = data;
    });
  }
]);
