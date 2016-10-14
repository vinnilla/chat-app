(function() {
	'use strict';

	angular.module('chatApp')
		.controller('chatController', main);

	main.$inject = ['$scope', '$rootScope', 'mainData', 'firebaseData'];

	function main($scope, $rootScope, mainData, firebase) {
		
		$scope.mainData = mainData;

		$scope.$on('$viewContentLoaded', function() {
			// timeout is necessary because scroll bar does not load immediately
			setTimeout(function() {
				// auto scroll to bottom
				var height = $('#chat-body').height();
				$('#chat-body').scrollTop(height);
				pushToBottom();
			},1)

		})

		// add own-message class to messages sent by current user
		$scope.checkSelf = function(user) {
			if (user === mainData.user.name) {
				return 'own-message';
			}
			else {
				return '';
			}
		}

		function pushToBottom() {
			var bodyHeight = $('#chat-body').height();
			var containerHeight = $('#chat-container').height();
			$('#chat-spacer').height(containerHeight-bodyHeight);
		}

		// event listener for the enter key
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