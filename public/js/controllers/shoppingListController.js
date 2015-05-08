angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    // set the type ahead data
    $http.get('/category').success(function (data) {
      $scope.products = data;
    });

    $scope.loadData = function() {
      ShoppingList.get().success(function (data) {
        console.log(data[0].items);
        $scope.shoppinglistItems = data[0].items;
      });
    };

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      if (item !== '') {
        ShoppingList.create(item).success(function () {
          $scope.loadData();
        });
        // read for next entry
        $scope.formData = {};
      }
    };

    // setup the data :)
    $scope.formData = {};
    $scope.loading = true;
    $scope.loadData();
    $scope.shoppinglists = [
      {'name': 'Maria und Livio'},
      {'name': 'At my parents'}
    ];
  }
]);
