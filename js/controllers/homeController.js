(function() {
	'use strict';

	angular.module('chatApp')
		.controller('homeController', main);

	main.$inject = ['$scope', '$state', 'firebaseData', 'mainData'];

	function main($scope, $state, firebase, mainData) {

		$scope.firebase = firebase;
		$scope.mainData = mainData;
		$scope.brand = "chat-box";

		$scope.messages = [
			{user: 'Sally', status: 'Online'},
			{user: 'Corbin', status: 'Away'},
			{user: 'Billy', status: 'Offline'}
		]

		// on view load
		$scope.$on('$viewContentLoaded', function() {
			distributeWidth();
			setStatusColor();
		})

		// on window resize
		$(window).resize(function() {
			distributeWidth();
		})

		// on window load, default to home state
		$(document).ready(function() {
			$state.go('home');
		})

		function distributeWidth() {
			// distribute width of screen between navigation and ui-view
			var navWidth = parseInt($('#chat-nav').css('width'));
			$('#angular-body').css('width', `${window.innerWidth-navWidth}px`);		
		}

		function setStatusColor() {
			$scope.messages.forEach(function(message) {
				var element = $(`#${message.user}-status`);
				var color;
				if (message.status === 'Online') {
					color = 'rgb(117,255,117)';
				}
				else if (message.status === 'Away') {
					color = 'rgb(255,227,117)';
				}
				else if (message.status === 'Offline') {
					color = 'rgb(255,117,117)';
				}
				element.css('background', color);
			})
		}


	} // end of main

})();