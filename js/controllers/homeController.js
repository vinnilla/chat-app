(function() {
	'use strict';

	angular.module('chatApp')
		.controller('homeController', main);

	main.$inject = ['$scope', '$rootScope', '$state', 'firebaseData', 'mainData'];

	function main($scope, $rootScope, $state, firebase, mainData) {

		$scope.firebase = firebase;
		$scope.mainData = mainData;
		$scope.brand = "chat-box";
		$scope.messages = [];

		firebase.ref('/users/').on('value', function(snapshot) {
			$scope.messages = snapshot.val();
			$scope.messages.shift();
			// filter out self
			$scope.messages = $scope.messages.filter(function(message, i) {
				if (message.username != mainData.user.name) {
					return message;
				}
			})
			// console.log($scope.messages);
			$rootScope.$apply();
			setStatusColor();
		})

		// on view load
		$scope.$on('$viewContentLoaded', function() {
			distributeWidth();
		})

		// on window resize
		$(window).resize(function() {
			distributeWidth();
		})

		function distributeWidth() {
			// distribute width of screen between navigation and ui-view
			var navWidth = parseInt($('#chat-nav').css('width'));
			$('#angular-body').css('width', `${window.innerWidth-navWidth}px`);		
		}

		function setStatusColor() {
			$scope.messages.forEach(function(message) {
				var element = $(`#${message.username}-status`);
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