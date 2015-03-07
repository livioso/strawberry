angular.module('todoController', [])

	.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
			$scope.user.password = '';
			$scope.error = true;
      $location.url('/login');
    });
  };
});
