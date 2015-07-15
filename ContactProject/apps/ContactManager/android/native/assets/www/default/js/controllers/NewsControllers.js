
/* JavaScript content from js/controllers/NewsControllers.js in folder common */
/**
 * This file contains all the controllers related to News Feed functionality
 */

var app = angular.module('news.controllers', [ 'ionic' ])

var busyIndicator = new WL.BusyIndicator;

app
		.controller(
				'NewsCtrl',
				function($scope, NewsService, $ionicPopup, $state, LoginService) {

					busyIndicator.show();

					$scope.init = function() {
						if (LoginService.isUserLogged()) {
							NewsService
									.getCNNFeed()
									.then(
											function(res) {
												$scope.feeds = res;
												busyIndicator.hide();
											},
											function(bad) {
												var alebracketsrtPopup = $ionicPopup
														.alert({
															title : 'Can not get any feed, please check your connection!'
														});
												busyIndicator.hide();
												$state.go('contact');
											});
						} else {
							busyIndicator.hide();
							$state.go('login');
						};
					};
					$scope.init();
					
					$scope.onRefresh = function() {
						busyIndicator.show();
						$scope.init();
						busyIndicator.hide();
						$scope.$broadcast('scroll.refreshComplete');
					};
				});
/* JavaScript content from js/controllers/NewsControllers.js in folder android */
/**
 * This file contains all the controllers related to News Feed functionality
 */

var app = angular.module('news.controllers', [ 'ionic' ])

var busyIndicator = new WL.BusyIndicator;

app
		.controller(
				'NewsCtrl',
				function($scope, NewsService, $ionicPopup, $state,
						LoginService, $cordovaInAppBrowser) {

					busyIndicator.show();

					$scope.init = function() {
						if (LoginService.isUserLogged()) {
							NewsService
									.getCNNFeed()
									.then(
											function(res) {
												$scope.feeds = res;
												busyIndicator.hide();
											},
											function(bad) {
												var alebracketsrtPopup = $ionicPopup
														.alert({
															title : 'Can not get any feed, please check your connection!'
														});
												busyIndicator.hide();
												$state.go('contact');
											});
						} else {
							busyIndicator.hide();
							$state.go('login');
						}
						;
					};
					$scope.init();

					$scope.onRefresh = function() {
						busyIndicator.show();
						$scope.init();
						busyIndicator.hide();
						$scope.$broadcast('scroll.refreshComplete');
					};

					$scope.openNews = function(url) {
						window.open(url, '_blank');
					};

					$scope.$on('$destroy', function iVeBeenDismissed() {
						$cordovaInAppBrowser.close();
					});

				});