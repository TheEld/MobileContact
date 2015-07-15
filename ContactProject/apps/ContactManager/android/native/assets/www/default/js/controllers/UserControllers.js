
/* JavaScript content from js/controllers/UserControllers.js in folder common */
/**
 * This file contains all the controllers related to User creation functionality
 */

var app = angular.module('user.controllers', ['ionic'])

var busyIndicator = new WL.BusyIndicator;

app
		.controller(
				'addUserCtrl',
				function($scope, $state, $stateParams, ContactService,
						LoginService, $ionicPopup, UserService) {
					$scope.contactForm = {};

					$scope.addUser = function() {

						busyIndicator.show();
						if ($scope.contactForm.pw1 == $scope.contactForm.pw2) {

							if ($scope.contactForm.userName != "") {

								UserService
										.addUser($scope.contactForm.userName,
												$scope.contactForm.pw1)
										.then(
												function(res) {

													busyIndicator.hide();
													var alertPopup = $ionicPopup
															.alert({
																title : 'User creation successful!'
															});
													$state.go('login');

												},
												function(bad) {

													busyIndicator.hide();
													var alebracketsrtPopup = $ionicPopup
															.alert({
																title : 'Fail to create user, try a different username!'
															});

												});

							} else {

								busyIndicator.hide();
								var alertPopup = $ionicPopup.alert({
									title : 'Username is obligatory!'
								});

							}
							;

						} else {

							busyIndicator.hide();
							var alertPopup = $ionicPopup.alert({
								title : 'Password does not match!'
							});

						}
						;

					};

					$scope.$on('$destroy', function iVeBeenDismissed() {
						// release resources, cancel request...
					})
				});