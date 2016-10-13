(function() {
	'use strict';

	angular.module('chatApp')
		.controller('homeController', main);

	main.$inject = ['$scope', 'firebaseData'];

	function main($scope, database) {

	} // end of main

})();