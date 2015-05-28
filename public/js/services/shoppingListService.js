angular.module('shoppingListService', [])
.factory('ShoppingList', [
  '$http',
  function ($http) {
    'use strict';
    return {

      get: function (listid) {
        return $http.get('/api/list/' + listid);
      },

      getLists: function () {
        return $http.get('/api/list/');
      },

      create: function (listid, shoppinglistdata) {
        var json = {'items':
          {'name': shoppinglistdata, 'checked': false}
        };
        return $http.put('/api/list/' + listid, json);
      },

      update: function (listid, id, checked) {
        var json = {'checked': checked};
        return $http.put('/api/list/' + listid + '/' + id, json);
      },

      delete: function (id) {
        if (id !== undefined) {
          return $http.delete('/api/list/item/' + id);
        }
      }
    };
  }
]);
