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

    $scope.loadData = function() {
      ShoppingList.get().success(function (data) {
        console.log('Working on it');
        $scope.shoppinglistItems = data[0].items;
      });
    };

    $scope.loadData();

    $scope.shoppinglists = [
        {'name': 'Maria und Livio'},
        {'name': 'At my parents'}
      ];

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      if (item !== '') {
        ShoppingList.create(item).success(function () {
          $scope.loadData();
        });
        $scope.formData = {};
      }
    };
  }
]);
