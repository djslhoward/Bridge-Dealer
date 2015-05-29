(function () {
	'use strict'; 

    angular
        .module('app', ['ngRoute'])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.when('/table', {
					templateUrl: 'table.html'
				});
				
				$routeProvider.when('/printable', {
					templateUrl: 'printable.html'					
				});
				
				$routeProvider.otherwise({
					redirectTo: '/table'
				});
			}
		]);	
})();