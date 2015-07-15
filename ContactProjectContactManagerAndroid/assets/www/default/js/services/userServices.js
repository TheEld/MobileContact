
/* JavaScript content from js/services/userServices.js in folder common */
angular.module('user.services', [])

.factory('UserService', function($q) {
	
	var items = [];
    
	function addUser(USERNAME, PASSWORD) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'UserManagerAdapter',
				procedure: 'addUser',
				parameters: [USERNAME, PASSWORD]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.existentUser;
			    	deferred.resolve(res.invocationResult);
			    },
			    onFailure : function(bad){
			    	console.log("bad");
					deferred.reject("um something here");
			    },
			    invocationContext: {}
			};
		WL.Client.invokeProcedure(invocationData, options);

		return deferred.promise;
	}	
	
    function loginUser(USERNAME, PASSWORD) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'UserManagerAdapter',
				procedure: 'loginUser',
				parameters: [USERNAME, PASSWORD]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.existentUser;
			    	deferred.resolve(res.invocationResult);
			    },
			    onFailure : function(bad){
			    	console.log("bad");
                    console.dir(bad);
					deferred.reject("um something here");
			    },
			    invocationContext: {}
			};
		WL.Client.invokeProcedure(invocationData, options);

		return deferred.promise;
	}	
    
	return {
			addUser:addUser,
            loginUser: loginUser
	};

});





