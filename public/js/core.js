var app = angular.module('strawberry', ['todoService', 'ngResource', 'ngRoute', 'ui.bootstrap'])

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


app.controller('AdminCtrl', function($scope, $http) {

});

app.controller('WelcomeMessageController',	function($scope, $filter) {
	var date = new Date();
	var hourOfDay = $filter('date')(date.getTime(), 'H');
	var openItemsCount = 4;

	$scope.welcomeUser = 'Livio';

	if(hourOfDay >= 6 && hourOfDay < 12) {
		$scope.welcomeMessage = 'Good Morning';
	}

	if(hourOfDay >= 12 && hourOfDay < 18) {
		$scope.welcomeMessage = 'Good Afternoon';
	}

	if((hourOfDay >= 18 && hourOfDay < 24) || (hourOfDay >= 0 && hourOfDay < 6)) {
		$scope.welcomeMessage = 'Good Evening';
	}

	// items count comment
	if(openItemsCount === 0) {
		$scope.openItemsComment = 'Our shopping list is empty.';
	}

	if(openItemsCount === 1) {
		$scope.openItemsComment = 'We have one item in our shopping list.';
	}

	if(openItemsCount > 1) {
		$scope.openItemsComment = 'We have ' + openItemsCount + ' items in our shopping list.';
	}
});
