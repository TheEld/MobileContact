
/* JavaScript content from js/wlInit.js in folder common */
// Uncomment the initialization options as required. For advanced initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center 
 
 var wlInitOptions = {
	//autoHideSplash: false,
	showIOS7StatusBar: false
	//onConnectionFailure: function (){},
	//timeout: 30000,
	//heartBeatIntervalInSecs: 20 * 60,
	//enableFIPS : false,
	//busyOptions: {text: "Loading..."}
};
 
function wlCommonInit(){
	var env = WL.Client.getEnvironment();
    if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
        document.body.classList.add('platform-ios');
    } else if(env === WL.Environment.ANDROID){
        document.body.classList.add('platform-android');

    }
 
    angular.element(document).ready(function() {
		angular.bootstrap(document,['app']);
		location.hash = 'login';
	})

	// Common initialization code goes here
	  WL.Client.connect({
			onSuccess:function() {				
				angular.element(document).ready(function() {
					WL.App.hideSplashScreen();
				});
			},
			onFailure:function(f) {
				alert("Failed to connect to MFP server.", f);
			}
	    });

	}

	Messages = {};

	  if (window.addEventListener) {
	        window.addEventListener('load', function() {      
	            WL.Client.init(wlInitOptions); }, false);
	    } else if (window.attachEvent) {
	        window.attachEvent('onload',  function() { 
	            WL.Client.init(wlInitOptions); });
	    }