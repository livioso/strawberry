angular.module('shoppingListService', [])
.factory('ShoppingList', [
  '$http',
  function ($http) {
    'use strict';
    return {
      get: function () {
        return $http.get('/api/todos');
      },
      create: function (shoppinglistdata) {
        var json = {'items': [
          {'name': shoppinglistdata, 'checked': false}
        ]};

        //json = JSON.stringify(json);

        console.log(json);

        return $http.put('/api/list/55081de2162072120758fc53',
           json);
      },
      delete: function (id) {
        return $http.delete('/api/todos/' + id);
      }
    };
  }
]);
