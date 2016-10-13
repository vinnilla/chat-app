(function() {
	'use strict';

	angular.module('chatApp')
		.controller('chatController', main);

	main.$inject = ['$scope', 'mainData'];

	function main($scope, mainData) {
		
		$scope.mainData = mainData;

		$scope.$on('$viewContentLoaded', function() {
		})

		$scope.checkSelf = function(user) {
			if (user === mainData.user.name) {
				return 'own-message';
			}
			else {
				return '';
			}
		}

	} // end of main

})()