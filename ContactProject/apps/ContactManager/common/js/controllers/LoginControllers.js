/**
 * This file contains all the controllers related to login functionality
 */

var app = angular.module('login.controllers', ['ionic'])

var busyIndicator = new WL.BusyIndicator;

app
		.controller(
				'LoginCtrl',
				function($scope, $ionicSideMenuDelegate, $ionicPopup, $timeout,
						LoginService, UserService, $state, $rootScope,
						$stateParams) {

					$scope.form = {};
					$rootScope.toogledrag = false;
					LoginService.logoutUser();

					$scope.submitLogin = function() {
						busyIndicator.show();
						UserService
								.loginUser($scope.form.username,
										$scope.form.password)
								.then(
										function(res) {
											if (res.existentUser == true) {
												LoginService
														.setUserID(res.userid);
												LoginService.loginUser();
												$state.go('contact');
												busyIndicator.hide();
											} else {
												busyIndicator.hide();
												var alebracketsrtPopup = $ionicPopup
														.alert({
															title : 'User does not exist!'
														});
											}
										},
										function(bad) {
											busyIndicator.hide();
											var alebracketsrtPopup = $ionicPopup
													.alert({
														title : 'Could not retrieve user, please check your connection status!'
													});
										});
					};

				});
