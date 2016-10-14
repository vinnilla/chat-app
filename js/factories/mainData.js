(function() {
	'use strict';

	angular.module('chatApp')
		.factory('mainData', main);

	main.$inject = ['$state', '$rootScope', 'firebaseData'];

	function main($state, $rootScope, firebase) {
		var factory = {};

		factory.message = {};
		factory.user = {
			name: 'Vincent',
			status: 'Online'
		};
		factory.chatIndex;


		firebase.ref('/chats/').on('value', function(snapshot) {
			factory.chats = snapshot.val();
		})

		factory.loadChat = function(message) {
			if (factory.message.username != message.username){

			factory.message = message; // message.username
			// loop through message array to find correct chat
			factory.chats.forEach(function(chat, i) {
				var foundSelf = false;
				var foundOther = false;
				chat.forEach(function(user) {
					if (user === factory.user.name) {
						foundSelf = true;
					}
					else if (user === message.username) {
						foundOther = true;
					}
				})
				// if correct chat is found, retrieve the chat history
				if (foundSelf && foundOther) {
					firebase.ref('/messages/' + i).on('value', function(snapshot) {
						factory.chat = snapshot.val();
						factory.chatIndex = i;
						$rootScope.$digest(); // necessary for first visit to chat but afterwards produces errors
					})
				}
			}) // end of factory.chats.forEach

			}
		}

		return factory;
	}

})();