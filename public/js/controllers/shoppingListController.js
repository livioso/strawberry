angular.module('strawberry')
.controller('shoppingListController', [
  '$scope',
  '$http',
  'ShoppingList',
  function ($scope, $http, ShoppingList) {
    'use strict';

    $scope.currentList = '';

    $scope.$watch('shoppinglists', function() {
      if ($scope.currentList === '' &&
          $scope.shoppinglists !== '' &&
          $scope.shoppinglists !== undefined &&
          $scope.shoppinglists.length >= 0) {
        // set the currentList to
        // something meaningful if we can
        $scope.currentList = $scope.shoppinglists[0]._id;
        $scope.loadData();
      }
    });

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
        $scope.currentList = '';
        $scope.loadData();
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

        // the open items are the uncheck ones
        $scope.shoppinglistOpenItems = $scope.shoppinglistItems.filter(
          function (item) {
            return item.checked === false;
          }).length;
      });
    };

    $scope.createShoppingItem = function () {
      var item = $scope.formData.text;
      if (item !== '' && item !== undefined) {
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
      if ($scope.newListModel.text !== '') {
        var list = $scope.newListModel.text;
        ShoppingList.createLists(list).then(function () {
          $scope.loadShoppinglists();
        });
        $scope.newListModel.text = '';
      }
    };

    $scope.addMember = function () {
      var memberToAdd = $scope.formDataAddMember;

      if (typeof memberToAdd !== 'undefined' &&
          memberToAdd !== null &&
          'profileId' in memberToAdd) {

        var filterMembers =
          $scope.shoppinglistMembers.filter(function (member) {
          return member.profileId === memberToAdd.profileId;
        });

        if (filterMembers.length === 0) {
          $scope.shoppinglistMembers.push(memberToAdd);
          $scope.formDataAddMember = null;
        }
      }
    };

    $scope.removeMember = function (profileId) {
      // filter out the one that should be removed
      var filterOut = $scope.shoppinglistMembers.filter(function (member) {
        return member.profileId !== profileId;
      });
      $scope.shoppinglistMembers = filterOut;
    };

    // setup the data :)
    $scope.loadShoppinglists();
    $scope.loadData();

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
