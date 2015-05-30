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

      delete: function (listid) {
        return $http.delete('/api/list/' + listid);
      },

      create: function (listid, shoppinglistdata) {
        var json = {'items':
          {'name': shoppinglistdata, 'checked': false}
        };
        return $http.post('/api/list/' + listid, json);
      },

      createLists: function (name) {
        var json = {'name': name};
        return $http.put('/api/list/', json);
      },

      update: function (listid, id, checked) {
        var json = {'checked': checked};
        return $http.put('/api/list/' + listid + '/' + id, json);
      }
    };
  }
]);
