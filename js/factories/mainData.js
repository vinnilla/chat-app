(function() {
	'use strict';

	angular.module('chatApp')
		.factory('mainData', main);

	main.$inject = ['$state'];

	function main($state) {
		var factory = {};

		factory.user = {
			name: 'Vincent',
			status: 'Online'
		};
		factory.messages = [
			{
				user1: 'Vincent',
				user2: 'Sally',
				msgArray: [
					{user: 'Vincent', body: 'Hello'},
					{user: 'Sally', body: 'Hi'}
				]
			}
		]

		factory.loadChat = function(message) {
			factory.message = message; // message.user is the other username
			// loop through message array to find correct chat
			factory.messages.forEach(function(chat) {
				if (factory.user.name === chat.user1 || factory.user.name === chat.user2) {
					if (factory.message.user === chat.user1 || factory.message.user === chat.user2) {
						factory.chat = chat;
					}
				}
			})
			$state.go('chat');
		}

		return factory;
	}

})();