(function() {
	'use strict';

	angular.module('chatApp')
		.controller('chatController', main);

	main.$inject = ['$scope', 'mainData', 'firebaseData'];

	function main($scope, mainData, firebase) {
		
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

		$('#chat-input').keydown(function(e) {
			if(e.keyCode === 13) {
				// update firebase
				var message = {
					user: mainData.user.name,
					body: $scope.newMessage
				}
				firebase.ref('messages/' + mainData.chatIndex).push(message);

				// clear chat-input
				$('#chat-input').val('');
			}
		})

	} // end of main

})()