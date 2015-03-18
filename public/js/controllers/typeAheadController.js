angular.module('strawberry')
.controller('TypeaheadCtrl', function ($scope, $http) {
  'use strict';
  $http.get('/category').success(function (data) {
    $scope.products = data;
  }).error(function () {
  });
});
