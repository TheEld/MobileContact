
var app = angular.module('app', ['ionic', 'ui.mask', 'ui.router', 'app.controllers', 'login.controllers', 'contact.controllers', 'user.controllers', 'news.controllers', 'contact.services', 'feed.services', 'login.services', 'user.services', 'ngCordova', 'ngTouch']);

app.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
	    // for form inputs)
		  /*
			 * if(window.cordova && window.cordova.plugins.Keyboard) {
			 * cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true); }
			 */
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	  });
	})
	
//$scope.userID = null;
//$scope.existentUser = false;

app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

	  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|sms|tel):/);
	
	  // Ionic uses AngularUI Router which uses the concept of states
	  // Learn more here: https://github.com/angular-ui/ui-router
	  // Set up the various states which the app can be in.
	  // Each state's controller can be found in controllers.js
	  $stateProvider

	    $stateProvider
	    .state('contact', {
	      url: '/contact/',
	      templateUrl: 'views/contact.html',
	      controller: 'ContactListCtrl',
	      })
	      
	    .state('addContact', {
	      url: '/addContact/',
	      templateUrl: 'views/addContact.html',
	      controller: 'addContactCtrl'
	    })
	    
	    .state('addUser', {
	      url: '/addUser/',
	      templateUrl: 'views/addUser.html',
	      controller: 'addUserCtrl'
	    })
	    
	  .state('detail', {
	      url: '/contact/:itemId',
	      templateUrl: 'views/details.html',
	      controller: 'ListDetailCtrl'
	  })
	  
	  .state('newsFeed', {
		  url: '/newsFeed/',
		  templateUrl: 'views/newsFeed.html',
		  controller: 'NewsCtrl'
	  })
	  
	  .state('login', {
		  url: '/login/',
		  templateUrl: 'views/login.html',
		  controller: 'LoginCtrl'
	  })
	  
	    // if none of the above states are matched, use this as the fallback
	    $urlRouterProvider.otherwise('/login/');

	});