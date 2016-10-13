(function() {
	'use strict';

	angular.module('chatApp')
		.factory('firebaseData', main);

	main.$inject = [];

	function main() {
		// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyB4wzOqPPN9h3WzEm3zNCWWMvyyEwW22l4",
	    authDomain: "chat-application-2844a.firebaseapp.com",
	    databaseURL: "https://chat-application-2844a.firebaseio.com",
	    storageBucket: "chat-application-2844a.appspot.com",
	    messagingSenderId: "896711447992"
	  };
	  firebase.initializeApp(config);

	  // Reference to database service
	  var database = firebase.database();
	  return database;

	} // end of main

})();