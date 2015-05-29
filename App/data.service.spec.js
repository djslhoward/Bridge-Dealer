describe('Data Factory', function() {
	'use strict';	
	var dataService;
	
	beforeEach(function (){			
				
		module('app');
			
		inject(function(_data_){
			dataService = _data_;
		});
	});
	
	it('should have a set function', function() {
		expect(dataService.set).toBeDefined();
	});
		
	it('should have a get function', function() {
		expect(dataService.get).toBeDefined();
	});
	
	describe('set and get functions', function() {
		it('should save and return the data', function() {
			var data = { test: data };		
			expect(dataService.get()).not.toEqual(data);
			
			dataService.set(data);		
			expect(dataService.get()).toEqual(data);
		});
	});
});
