angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    $scope.currentList = '';

    $scope.loadShoppinglists = function() {
      ShoppingList.getLists().then(function (response) {
        $scope.shoppinglists = response.data;
      });
    };

    $scope.switchList = function(listid) {
      $scope.currentList = listid;
      $scope.loadData();
    };

    $scope.deleteList = function(listid) {
      ShoppingList.delete(listid).then(function () {
        $scope.loadShoppinglists();
      });
    };

    $scope.loadData = function() {
      ShoppingList.get($scope.currentList).then(function (response) {
        $scope.shoppinglistItems = response.data[0].items;
      });
    };

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      if (item !== '' && item !== undefined &&
          $scope.currentList !== undefined && $scope.currentList !== '') {
        ShoppingList.create($scope.currentList, item).then(function () {
          $scope.loadData();
        });
        // read for next entry
        $scope.formData = {};
      }
    };

    $scope.checkShoppingItem = function (itemId) {
      ShoppingList.update($scope.currentList, itemId, true).then(function () {
        $scope.loadData();
      });
    };

    $scope.createShoppingList = function () {
      var list = $scope.newListModel.text;
      ShoppingList.createLists(list).then(function () {
        $scope.loadShoppinglists();
      });
    };

    // setup the data :)
    $scope.formData = {};
    $scope.loading = true;
    $scope.loadShoppinglists();
    $scope.loadData();
    $scope.newListModel = {};

    // set the type ahead data -> Move me to service!
    $http.get('/category').success(function (data) {
      $scope.products = data;
    });

    // set the user object
    $http.get('/loggedin').success(function (user) {
      $scope.user = user;
      $scope.user.profileImage =
        'https://graph.facebook.com/v2.3/' + user.profileId + '/picture';
    });

    $http.get('api/user').success(function (users) {
      users.map(function (user) {
        user.profileImage =
        'https://graph.facebook.com/v2.3/' + user.profileId + '/picture';
      });
      $scope.users = users;
    });
  }
]);
