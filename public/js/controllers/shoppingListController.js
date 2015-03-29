angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  function ($scope) {
    'use strict';

    $scope.loading = true;

    $scope.shoppinglists = [
        {'name': 'Maria und Livio'},
        {'name': 'At my parents'}
      ];
  }
]);
