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
					{user: 'Sally', body: 'Hi'},
					{user: 'Vincent', body: 'adsfadsfasdf asdf asd fas df asd f asdfasdfas df dsa f ads fasasdfasd fsa df sad f asd f asd f asdf  sad f sad f asd f asd f asd f asd f as df as  a a  a a a a a  a a a a a a a a  a a'},
					{user: 'Vincent', body: 'asdfasdf asd f asdf a sdf asd f sad f  '}
				]
			}
		]

		factory.loadChat = function(message) {
			factory.message = message; // message.user is the other username
			var change = false;
			// loop through message array to find correct chat
			factory.messages.forEach(function(chat) {
				if (factory.user.name === chat.user1 || factory.user.name === chat.user2) {
					if (factory.message.user === chat.user1 || factory.message.user === chat.user2) {
						factory.chat = chat;
						change = true;
					}
				}
			})
			if (!change) {
				factory.chat = 'New Chat';
			}
			$state.go('chat');
		}

		return factory;
	}

})();