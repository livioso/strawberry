angular.module('todoService', [])
.factory('Todos', [
  '$http',
  function ($http) {
    'use strict';
    return {
      get: function () {
        return $http.get('/api/todos');
      },
      create: function (todoData) {
        return $http.post('/api/todos', todoData);
      },
      delete: function (id) {
        return $http.delete('/api/todos/' + id);
      }
    };
  }
]);
