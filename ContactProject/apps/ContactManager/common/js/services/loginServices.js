angular.module('login.services', [])

.factory('LoginService', function($q) {
	
	var userID = null;
	var existentUser = false;

	function isUserLogged() {
		return existentUser;
	}
	
	function loginUser() {
		existentUser = true;
	}
	
	function logoutUser() {
		existentUser = false;
	}
	
	function getUserID(){
		return userID;
	}
	
	function setUserID(id) {
		userID = id;
	}
	
	return {
		isUserLogged:isUserLogged,
		loginUser:loginUser,
		logoutUser:logoutUser,
		getUserID:getUserID,
		setUserID:setUserID
};
	
});