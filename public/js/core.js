var app = angular.module('strawberry', ['todoService', 'ngResource', 'ngRoute', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider, $httpProvider) {

	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
		// Initialize a new promise
		var deferred = $q.defer();
		// Make an AJAX call to check if the user is logged in
		$http.get('/loggedin').success(function(user) {

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
				if (response.status === 401) {
					$location.url('/login');
				}
				return $q.reject(response);
			}
		};
	});


	$routeProvider
		.when('/', {
			templateUrl: '/views/landing.html'
		})
		.when('/main', {
			templateUrl: 'views/main.html',
			resolve: { loggedin: checkLoggedin }
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
})


.run(function($rootScope, $http) {
	// logout function is
	// available in any pages
	$rootScope.logout = function() {
		$http.post('/logout');
	};
});
