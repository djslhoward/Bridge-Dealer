(function () {
	'use strict'; 

    angular
        .module('app')
		.config(routes);
		
		function routes($routeProvider) {
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
})();