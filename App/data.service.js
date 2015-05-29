(function () {
    'use strict';

    var serviceId = 'data';
    angular
        .module('app')
        .factory(serviceId, [
            data
        ]);

	function data() {
		var savedData = {};
		var service = {
			set: set,
			get: get,
        };
		
        return service;		
		
		function set(data) {
			savedData = data;
		}
		
		function get() {
			return savedData;
		}
	}  
})();