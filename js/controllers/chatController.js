(function() {
	'use strict';

	angular.module('chatApp')
		.controller('chatController', main);

	main.$inject = ['$scope', 'mainData'];

	function main($scope, mainData) {
		
		$scope.mainData = mainData;

		$scope.$on('$viewContentLoaded', function() {
		})

	} // end of main

})()