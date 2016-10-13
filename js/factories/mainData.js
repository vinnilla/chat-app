(function() {
	'use strict';

	angular.module('chatApp')
		.factory('mainData', main);

	main.$inject = ['$state', 'firebaseData'];

	function main($state, firebase) {
		var factory = {};

		factory.user = {
			name: 'Vincent',
			status: 'Online'
		};

		firebase.ref('/chats/').on('value', function(snapshot) {
			factory.chats = snapshot.val();
		})

		factory.loadChat = function(message) {
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
						$state.go('chat');
					})
				}
			}) // end of factory.chats.forEach
		}

		return factory;
	}

})();