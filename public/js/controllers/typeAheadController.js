angular.module('strawberry')

.controller('TypeaheadCtrl', function($scope, $http, limitToFilter) {
	$http.get("/category").
    success(function(data, status, headers, config) {
        $scope.products = data;
    }).
    error(function(data, status, headers, config) {
        alert(status);
    });
});
