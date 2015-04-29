angular.module('shoppingListService', [])
.factory('ShoppingList', [
  '$http',
  function ($http) {
    'use strict';
    return {
      get: function () {
        return $http.get('/api/list/55081de2162072120758fc53');
      },
      create: function (shoppinglistdata) {

        var json = {'items':
          {'name': shoppinglistdata, 'checked': false}
        };

        return $http.put('/api/list/55081de2162072120758fc53', json);
      },
      delete: function (id) {
        if (id !== undefined) {
          return $http.delete('/api/list/item/' + id);
        }
      }
    };
  }
]);
