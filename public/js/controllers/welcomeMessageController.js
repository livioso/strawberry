angular.module('strawberry')

.controller('WelcomeMessageController',	function($scope, $filter) {
	var date = new Date();
	var hourOfDay = $filter('date')(date.getTime(), 'H');
	var openItemsCount = 2;

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
