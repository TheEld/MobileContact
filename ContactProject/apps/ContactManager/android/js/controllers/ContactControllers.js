/**
 * This file contains all the controllers related to User creation functionality
 */

var app = angular.module('contact.controllers', [ 'ionic' ])

var busyIndicator = new WL.BusyIndicator;

app.controller('ContactListCtrl', function($scope, $ionicSideMenuDelegate,
		$ionicPopup, $timeout, ContactService, $stateParams, LoginService,
		$state, $rootScope) {

	$scope.init = function() {
		if (LoginService.isUserLogged()) {
			busyIndicator.show();
			ContactService.getContacts(LoginService.getUserID()).then(
					function(res) {
						$scope.content = res;
					})
			$rootScope.toogledrag = true;
			busyIndicator.hide();
		} else {
			$state.go('login');
		}
		;
	};

	$scope.init();

	$scope.doRefresh = function() {
		busyIndicator.show();
		ContactService.getContacts(LoginService.getUserID()).then(
				function(res) {
					if (LoginService.isUserLogged()) {
						$scope.content = res;
					}
					busyIndicator.hide();
					$scope.$broadcast('scroll.refreshComplete');
				});
	};

	$scope.showConfirm = function(contactid) {
		busyIndicator.show();
		ContactService.deleteContact(contactid).then(function(res) {
		});
		busyIndicator.hide();
		$scope.doRefresh();
	};

	$scope.openDetails = function(contactid) {
		$state.go('login');
	};

	$scope.logoutUser = function() {
		LoginService.logoutUser();
		$rootScope.toogledrag = false;
		$state.go("login");
	};

	$scope.$on('$destroy', function iVeBeenDismissed() {
		// release resources, cancel request...
	});

});

app
		.controller(
				'ListDetailCtrl',
				function($scope, $state, $ionicPlatform, $stateParams,
						ContactService, $timeout, $ionicPopup, $cordovaDevice,
						$cordovaCamera) {

					busyIndicator.show();
					$scope.detail = {};
					$scope.visibility = {};
					$scope.visibility.uploadButton = false;
					$scope.visibility.editFormDiv = false;
					$scope.visibility.displayContactInfo = true;
					$scope.visibility.editButton = true;
					$scope.visibility.backButton = true;
					$scope.isClickable = false;
					
					$scope.init = function() {
						ContactService
								.getContactDetail($stateParams.itemId)
								.then(
										function(result) {

											$scope.detail = result[0];
											busyIndicator.hide();

											if ($scope.detail.CONTACT_IMAGE === null) {
												$scope.imageUrl = "images/defaultContact.png";
											} else {
												$scope.imageUrl = $scope.detail.CONTACT_IMAGE;
											}
										});

					};

					$scope.init();

					$scope.editContact = function(param) {
						if (param === true) {
							$scope.visibility.displayContactInfo = false;
							$scope.visibility.displayEditForm = true;
							$scope.visibility.editButton = false;
							$scope.visibility.backButton = false;
							$scope.isClickable = true;
						} else {
							$scope.visibility.displayContactInfo = true;
							$scope.visibility.displayEditForm = false;
							$scope.visibility.editButton = true;
							$scope.visibility.backButton = true;
							$scope.isClickable = false;
							$state.go('detail', {
								itemId : $stateParams.itemId
							}, {
								reload : true
							});
						}
					};

					$scope.updateContact = function() {
						busyIndicator.show();
						ContactService
								.updateContact($stateParams.itemId,
										$scope.detail.NAME,
										$scope.detail.TELEPHONE,
										$scope.detail.MOBILE,
										$scope.detail.EMAIL,
										$scope.imageUrl)
								.then(
										function(res) {
											busyIndicator.hide();
											$state.go('detail', {
												itemId : $stateParams.itemId
											}, {
												reload : true
											});
										},
										function(bad) {
											busyIndicator.hide();
											var alebracketsrtPopup = $ionicPopup
													.alert({
														title : 'Fail to update contact, please check your connection or if you inserted at least a name!'
													});
										});
					};

					$scope.openFileDialog = function() {
						
						$ionicPlatform.ready(function() {
							var options = {
								quality : 100,
								destinationType : Camera.DestinationType.DATA_URL,
								sourceType : Camera.PictureSourceType.CAMERA,
								allowEdit : true,
								encodingType : Camera.EncodingType.JPEG,
								targetWidth : 100,
								targetHeight : 100,
								popoverOptions : CameraPopoverOptions,
								saveToPhotoAlbum : false
							};
							$cordovaCamera.getPicture(options).then(function(imageData) {
								$scope.imageUrl = "data:image/jpeg;base64," + imageData;
							}, function(err) {
								console.log(err);
							});
						});
					};

					$scope.$on('$destroy', function iVeBeenDismissed() {
						// release resources, cancel request...
					})

				});

app
		.controller(
				'addContactCtrl',
				function($scope, $stateParams, $ionicPlatform, ContactService, LoginService,
						$state, $ionicPopup, $cordovaDevice, $cordovaCamera) {
					$scope.contactForm = {};

					$scope.init = function () {
						$scope.imageUrl = "images/defaultContact.png";
					}
					
					$scope.init();
					
					$scope.openFileDialog = function() {
						
						$ionicPlatform.ready(function() {
							var options = {
								quality : 100,
								destinationType : Camera.DestinationType.DATA_URL,
								sourceType : Camera.PictureSourceType.CAMERA,
								allowEdit : true,
								encodingType : Camera.EncodingType.JPEG,
								targetWidth : 100,
								targetHeight : 100,
								popoverOptions : CameraPopoverOptions,
								saveToPhotoAlbum : false
							};
							$cordovaCamera.getPicture(options).then(function(imageData) {
								$scope.imageUrl = "data:image/jpeg;base64," + imageData;
							}, function(err) {
								console.log(err);
							});
						});
					};
					
					$scope.addContact = function() {
						busyIndicator.show();
						ContactService
								.addContact(LoginService.getUserID(),
										$scope.contactForm.contactName,
										$scope.contactForm.phoneNumber,
										$scope.contactForm.mobileNumber,
										$scope.contactForm.email, $scope.imageUrl)
								.then(
										function(res) {
											busyIndicator.hide();
											$state.go('contact');
										},
										function(bad) {
											busyIndicator.hide();
											var alebracketsrtPopup = $ionicPopup
													.alert({
														title : 'Fail to insert contact, please check your connection or if you inserted at least a name!'
													});
										});
					};
					
					$scope.$on('$destroy', function iVeBeenDismissed() {
						// release resources, cancel request...
					})
				});