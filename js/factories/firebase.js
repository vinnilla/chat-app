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

	  // seed data
	  function seedUsers() {

		  database.ref('users/' + 1).set({
		  	username: 'Sally',
		  	status: 'Online'
		  });
		  database.ref('users/' + 2).set({
		  	username: 'Corbin',
		  	status: 'Away'
		  });
		  database.ref('users/' + 3).set({
		  	username: 'Billy',
		  	status: 'Offline'
		  });
		  database.ref('users/' + 4).set({
		  	username: 'Vincent',
		  	status: 'Online'
		  })

		  console.log('database users seeded');
	  }

	  function seedStates() {

	  	database.ref('states/' + 4).set({
	  		state: 'home',
	  		other: 'none'
	  	})

	  }


	  function seedChats() {

	  	database.ref('chats/' + 1).set(['Vincent', 'Sally'])
	  	database.ref('chats/' + 2).set(['Vincent', 'Corbin'])
	  	database.ref('chats/' + 3).set(['Billy', 'Vincent'])

	  }

	  function seedMessages() {

	  	database.ref('messages/' + 1).set([
				{user: 'Vincent', body: 'Hello'},
				{user: 'Sally', body: 'Hi'},
				{user: 'Vincent', body: 'Sed imperdiet lacinia tortor vel pharetra. Cras molestie bibendum convallis. Nullam ullamcorper dictum risus, at elementum leo placerat a. Morbi vel mauris a justo elementum interdum. Integer enim sapien, congue at vestibulum eu, pharetra a erat. Curabitur porttitor non nibh non laoreet. Morbi euismod ultricies nunc, ac viverra est iaculis a. Mauris eu lacus magna. Sed auctor, libero non ultrices condimentum, neque neque ultricies urna, posuere placerat ex libero at eros. Maecenas eget imperdiet sem. Nullam id sem tempor, molestie tellus vitae, placerat magna. Donec vel lacus ut sapien sodales commodo. Aliquam feugiat scelerisque tincidunt.'},
				{user: 'Vincent', body: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas a magna et orci imperdiet lacinia quis non ligula. Nulla convallis felis eget est molestie faucibus. Cras auctor, dolor vel consequat iaculis, eros turpis pretium diam, a cursus turpis lorem non eros. Nulla volutpat ullamcorper tortor quis semper. Praesent congue feugiat semper. Aenean nisi ex, accumsan vitae semper id, tincidunt at est. Curabitur metus leo, condimentum vel enim sit amet, placerat semper augue. Quisque eget porttitor eros. Donec faucibus nec mauris id interdum. Nullam lobortis ullamcorper semper.'},
				{user: 'Sally', body: 'Proin vel ex quis mauris congue ultrices vel in eros. Phasellus nunc augue, laoreet in dignissim et, venenatis vel metus. Nulla quis nisl non mauris dapibus finibus. In ornare sem in malesuada interdum. Mauris tincidunt ac elit et ultrices. Suspendisse viverra porttitor lectus, at vulputate est vehicula a. Nulla quis augue faucibus, ultricies erat at, pellentesque velit. Fusce tincidunt augue vel mi accumsan posuere. Cras eget fermentum enim. Ut luctus sed turpis nec pellentesque. Etiam nec mi a purus bibendum pretium.'}
			])
	  	database.ref('messages/' + 2).set([
  			{user: 'Vincent', body: 'Hello'},
  			{user: 'Corbin', body: 'Hi'}
  		])
	  	database.ref('messages/' + 3).set([
  			{user: 'Billy', body: 'Hello'},
  			{user: 'Vincent', body: 'Hi'}
  		])

	  }

	  // seedUsers();
	  // seedStates();
	  // seedChats();
	  // seedMessages();
	  return database;

	} // end of main

})();