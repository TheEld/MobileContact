
/* JavaScript content from js/services/feedServices.js in folder common */
angular.module('feed.services', [])

.factory('NewsService', function($q){
	
	var items = [];

	function getCNNFeed() {
		var deferred = $q.defer();
		//var req = new WLResourceRequest('/adapters/HTTPAdapter/getFeed', WLResourceRequest.GET);
		var invocationData = {
				adapter: 'NewsFeedAdapter',
				procedure: 'getCNNFeed'
		};
		var options = {
			    onSuccess : function(res){
			    	items = res.responseJSON.rss.channel.item;
			    	deferred.resolve(res.responseJSON.rss.channel.item);
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
		getCNNFeed:getCNNFeed
	};

});
	
	
	
	
	
	
	
