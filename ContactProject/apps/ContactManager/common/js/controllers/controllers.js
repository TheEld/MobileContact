var app = angular.module('app.controllers', ['ionic'])

var busyIndicator = new WL.BusyIndicator;

app.controller('MainCtrl', function MainCtrl($scope, $ionicSideMenuDelegate,
		$ionicPopup, $timeout, LoginService) {
	console.log("MainCtrl");
});