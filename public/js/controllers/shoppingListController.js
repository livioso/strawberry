angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    $scope.formData = {};

    // set the type ahead data
    $http.get('/category').success(function (data) {
      $scope.products = data;
    });

    $scope.loading = true;

    ShoppingList.get().success(function (data) {
      $scope.shoppinglistItems = data.items;
    });

    $scope.shoppinglists = [
        {'name': 'Maria und Livio'},
        {'name': 'At my parents'}
      ];

    $scope.createShoppingItem = function () {
      ShoppingList.create($scope.formData.text);
    };
  }
]);
