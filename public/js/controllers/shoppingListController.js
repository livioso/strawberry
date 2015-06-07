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
        var members = response.data[0].members;
        members.map(function (member) {
          // the profileId is unique therefore
          // we will find exactly one match.
          var match = $scope.users;
          match = match.filter(function (user) {
            // we only want the matching one
            return user.profileId === member.profileId;
          });
          // fill in the details we are interest in
          member.fullName = match[0].fullName;
          member.givenName = match[0].givenName;
          member.familyName = match[0].familyName;
          member.profileImage = match[0].profileImage;
        });

        // tbd: refactor this -> ugly, ugly :)
        $scope.shoppinglistMembers = members;
        $scope.shoppinglistItems = response.data[0].items;
        $scope.shoppinglistName = response.data[0].name;
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

    $scope.saveChanges = function () {
      var updates = {
        'name' : $scope.shoppinglistName,
        'members' : $scope.shoppinglistMembers
      };
      ShoppingList.updateLists($scope.currentList, updates).then(function () {
        $scope.loadShoppinglists();
      });
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

    $scope.addMember = function () {
      if ($scope.formDataAddMember !== null &&
          $scope.formDataAddMember !== {}) {
        $scope.shoppinglistMembers.push($scope.formDataAddMember);
        $scope.formDataMember = {};
      }
    };

    // setup the data :)
    $scope.formData = {};
    $scope.formDataMember = {};
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
        user.fullName = user.givenName + ' ' + user.familyName;
      });
      $scope.users = users;
    });
  }
]);
