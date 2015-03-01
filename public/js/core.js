var app = angular.module('strawberry', ['todoController', 'todoService', 'ngResource', 'ngRoute'])

.config(function($routeProvider, $locationProvider, $httpProvider) {

		var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){

		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function(user){

			// Authenticated
			if (user !== '0') {
				deferred.resolve();
			}

			// Not Authenticated
			else {
				deferred.reject();
				$location.url('/login');
			}
		});

		return deferred.promise;
	};


	$httpProvider.interceptors.push(function($q, $location) {
    return {
			response: function(response) {
				// do something on success
				return response;
			},
			responseError: function(response) {
				if (response.status === 401)
					$location.url('/login');
				return $q.reject(response);
			}
		};
	});


	$routeProvider
		.when('/', {
			templateUrl: '/views/main.html'
		})
		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'AdminCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
})

.run(function($rootScope, $http){

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $http.post('/logout');
    };
});

app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
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

app.controller('AdminCtrl', function($scope, $http) {
  // List of users got from the server
  $scope.users = [];

  // Fill the array to display it in the page
  $http.get('/users').success(function(users){
    for (var i in users)
      $scope.users.push(users[i]);
  });
});
