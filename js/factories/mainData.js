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
			status: 'Online',
			index: 4
		};
		factory.chatIndex;
		factory.once = true;

		// on window load, grab state from firebase and apply
		$(document).ready(function() {
			firebase.ref('states/' + factory.user.index).on('value', function(snapshot) {
				var state = snapshot.val();
				// $state.go(state.state);
				if (state.state === 'chat') {
					factory.loadChat({username: state.other});
				}
				else if (state.state === 'home') {
					factory.clearActive();
				}
			})
		})


		firebase.ref('/chats/').on('value', function(snapshot) {
			factory.chats = snapshot.val();
		})

		factory.loadChat = function(message) {
			factory.clearActive();
			$(`#${message.username}`).css('background', 'rgba(0, 128, 220, 1)').css('box-shadow', '1px 1px 5px rgba(0,128,220,0.7)');

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
						factory.updateSavedState('chat', message.username);
						$state.reload();
					})
				}
			}) // end of factory.chats.forEach

			}

			// mobile functionality
			factory.hideNav();
		}

		factory.updateSavedState = function(state, other) {
			firebase.ref('states/' + factory.user.index).set({
	  		state: state,
	  		other: other
	  	})
		}

		factory.clearActive = function() {
			$('.users').css('background', 'none').css('box-shadow', 'none');
		}

		factory.hideNav = function() {
			if (window.innerWidth < 480) {
				$('#chat-nav').css('display', 'none').css('width', '0');
			}
		}

		return factory;
	}

})();