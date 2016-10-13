(function() {
	'use strict';

	angular.module('chatApp', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			// root
			$urlRouterProvider.otherwise('/home');

			$stateProvider
				.state('home', {
					url: '/home',
					controller: 'homeController',
					templateUrl: 'views/home.html'
				})
				.state('chat', {
					url: '/chat',
					controller: 'chatController',
					templateUrl: 'views/chat.html'
				})

		}) // end of config
})();