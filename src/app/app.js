angular.module( 'orderCloud', [
	'templates-app',
	'ngSanitize',
	'ngAnimate',
	'ngMessages',
	'ngTouch',
	'ui.router',
	'orderCloud.sdk',
	'ngMaterial'
])

	.config( Routing )
	.config( ErrorHandling )
	.controller( 'AppCtrl', AppCtrl )
	.constant('ocscope', 'FullAccess')
	.constant('appname', 'OrderCloud')

	/*
	 Test
	 .constant('authurl', 'https://testauth.ordercloud.io/oauth/token')
	 .constant('apiurl', 'https://testapi.ordercloud.io/v1')
	 .constant('clientid', '8ec8ecdb-ccef-4294-802e-2c863cf061df')
	 */


	 .constant('authurl', 'https://qaauth.ordercloud.io/oauth/token')
	 .constant('apiurl', 'https://qaapi.ordercloud.io')
	 .constant('clientid', '16691dca-434a-4995-a366-480224eb86f7')

/*	//Local
	.constant('authurl', 'http://core.four51.com:11629/OAuth/token')
	.constant('apiurl', 'http://core.four51.com:9002/v1')
	.constant('clientid', '5e841037-b21c-4784-8cbb-746c4f1468ed')*/
;

function AppCtrl( $scope ) {
	var vm = this;
	$scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams ){
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			vm.pageTitle = 'OrderCloud | ' + toState.data.pageTitle;
		}
	});
}

function Routing( $urlRouterProvider, $urlMatcherFactoryProvider) {
	$urlMatcherFactoryProvider.strictMode(false);
	$urlRouterProvider.otherwise( '/home' );
	//$locationProvider.html5Mode(true);
	//TODO: For HTML5 mode to work we need to always return index.html as the entry point on the serverside
}

function ErrorHandling( $provide ) {
	$provide.decorator('$exceptionHandler', handler );

	function handler( $delegate, $injector ) {
		return function $broadcastingExceptionHandler( ex, cause ) {
			ex.status != 500 ?
				$delegate( ex, cause ) :
				( function() {
					try {
						//TODO: implement track js
						console.log(JSON.stringify( ex ));
						//trackJs.error("API: " + JSON.stringify(ex));
					}
					catch ( ex ) {
						console.log(JSON.stringify( ex ));
					}
				})();
			$injector.get( '$rootScope' ).$broadcast( 'exception', ex, cause );
		}
	}
}