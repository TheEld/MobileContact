
/* JavaScript content from js/controllers/controllers.js in folder common */
var app = angular.module('app.controllers', ['ionic'])

var busyIndicator = new WL.BusyIndicator;

app.controller('MainCtrl', function MainCtrl($scope, $ionicSideMenuDelegate,
		$ionicPopup, $timeout, LoginService) {
	console.log("MainCtrl");
});