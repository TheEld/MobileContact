angular.module('contact.services', [])

.factory('ContactService', function($q) {
	
	var items = [];
	
	function getContacts(USERID) {
		var deferred = $q.defer();
		var invocationData = {
			adapter: 'ContactManagerAdapter',
			procedure: 'getContacts',
			parameters: [USERID]
		};
		var options = {
			onSuccess: function (res) {
				deferred.resolve(res.invocationResult.resultSet);
			},
			onFailure: function (bad) {
				console.log("bad");
                console.dir(bad);
				deferred.reject("um something here");
			},
			invocationContext: {}
		};
		WL.Client.invokeProcedure(invocationData, options);
		
		return deferred.promise;
	}
	
	function getContactDetail(CONTACT_ID) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'ContactManagerAdapter',
				procedure: 'getContactDetail',
				parameters: [CONTACT_ID]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.resultSet;
			    	deferred.resolve(res.invocationResult.resultSet);
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
	
	function addContact(USER_ID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE, CONTACT_MAIL, CONTACT_IMAGE) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'ContactManagerAdapter',
				procedure: 'addContact',
				parameters: [USER_ID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE, CONTACT_MAIL, CONTACT_IMAGE]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.resultSet;
			    	deferred.resolve(res.invocationResult.resultSet);
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
	
    function updateContact(CONTACTID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
		CONTACT_MAIL, CONTACT_IMAGE) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'ContactManagerAdapter',
				procedure: 'updateContact',
				parameters: [CONTACTID, CONTACT_NAME, CONTACT_PHONE, CONTACT_MOBILE,
		CONTACT_MAIL, CONTACT_IMAGE]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.resultSet;
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
    
	function deleteContact(CONTACT_ID) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'ContactManagerAdapter',
				procedure: 'deleteContact',
				parameters: [CONTACT_ID]
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.invocationResult.resultSet;
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
    
    function changeContPic(CONTACT_IMAGE, CONTACT_ID) {
		var deferred = $q.defer();
		var invocationData = {
				adapter: 'ContactManagerAdapter',
				procedure: 'changeContPic',
				parameters: [CONTACT_IMAGE, CONTACT_ID]
			};
		var options = {
				    onSuccess : function(res){
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
			getContacts:getContacts,
			getContactDetail:getContactDetail,
			addContact:addContact,
			updateContact:updateContact,
            deleteContact:deleteContact,
            changeContPic:changeContPic
	};

});





