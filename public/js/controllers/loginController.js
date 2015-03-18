angular.module('strawberry')
.controller('LoginCtrl', function ($scope, $rootScope, $http, $location) {
  'use strict';
  // will be filled by the form
  $scope.user = {};
  $scope.login = function () {
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password
    }).success(function () {
      // No error: authentication OK
      $location.url('/main');
    }).error(function () {
      // Error: authentication failed
      $scope.user.password = '';
      $scope.error = true;
      $location.url('/login');
    });
  };
});
