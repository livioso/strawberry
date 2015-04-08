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
    }).error(function () {
    });

    $scope.loading = true;

    $scope.shoppinglists = [
        {'name': 'Maria und Livio'},
        {'name': 'At my parents'}
      ];

    $scope.createShoppingItem = function () {
      ShoppingList.create($scope.formData.text);
    };
  }
]);
