describe('Dealer Controller', function() {
	'use strict';
	var ctrl, scope, createController, cardService, dataService, deckService, handService;
	
	beforeEach(function() {
		module('app', function ($provide) {
			var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
					
			cardService = {};
			cardService.Card = jasmine.createSpy().and.callFake(function(number) {
				var object = {
					rank : number % 13,
					suit : suits[Math.ceil(number / 13) - 1]
				};
				return object;
			});
			
			dataService = {};
			dataService.set = jasmine.createSpy();
			dataService.get = jasmine.createSpy().and.returnValue({
				min: 5,
				max: 9,
				firstSuitLength: 5,
				secondSuitLength: 4
			});	
			
			deckService = {};
			deckService.Deck = jasmine.createSpy().and.returnValue({
			    cards: [16, 34, 18, 44, 48, 46, 7, 45, 2, 13, 5, 10, 22,
			    28, 25, 20, 51, 52, 8, 37, 24, 19, 27, 36, 15, 40,
			    32, 50, 49, 30, 47, 43, 29, 6, 39, 35, 1, 4, 14,
			    33, 42, 9, 26, 12, 31, 41, 3, 23, 38, 17, 21, 11],
				shuffle: jasmine.createSpy(),
				deal: jasmine.createSpy().and.returnValue({
					north: {
						suits: {
							Spades: [48, 46, 45, 44],
							Hearts: [34],
							Diamonds: [22, 18, 16],
							Clubs: [13, 10, 7, 5, 2]
						},
						cards: [16, 34, 18, 44, 48, 46, 7, 45, 2, 13, 5, 10, 22],
						points: 5
					},
					south: {
						suits: {
							Spades: [],
							Hearts: [],
							Diamonds: [],
							Clubs: []
						},
						cards: [28, 25, 20, 51, 52, 8, 37, 24, 19, 27, 36, 15, 40],
					},
					east: {
						suits: {
							Spades: [],
							Hearts: [],
							Diamonds: [],
							Clubs: []
						},
						cards: [32, 50, 49, 30, 47, 43, 29, 6, 39, 35, 1, 4, 14],
					},
					west: {
						suits: {
							Spades: [],
							Hearts: [],
							Diamonds: [],
							Clubs: []
						},
						cards: [33, 42, 9, 26, 12, 31, 41, 3, 23, 38, 17, 21, 11],
					}
				})
			});
			
			handService = {};
			handService.Hand = jasmine.createSpy().and.returnValue({
			    cards: [16, 34, 18, 44, 48, 46, 7, 45, 2, 13, 5, 10, 22],
			});
			
			$provide.value('card', cardService);
			$provide.value('data', dataService);
			$provide.value('deck', deckService);
			$provide.value('hand', handService);
		});
		
		inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			createController = function() {
				return $controller('dealer', {
					$scope: scope,
					card: cardService,
					data: dataService,
					deck: deckService,
					hand: handService
				});
			};
		});
		
		ctrl = createController();
		scope.$digest();
	});
	
	it('should assign a save function to the scope', function() {
		expect(ctrl.saveData).toBeDefined();
	});
	
	describe('save function', function() {
		it('should save using the data service', function() {
			ctrl.saveData();
			expect(dataService.set).toHaveBeenCalled();
		});
	});
	
	it('should shuffle the deck', function() {
		expect(deckService.Deck().shuffle).toHaveBeenCalled();
	});
	
	it('should deal the cards', function() {
		expect(deckService.Deck().deal).toHaveBeenCalled();
	});
	
	it('should create four hands and assign them to the scope', function () {
		expect(ctrl.positions.North).toBeDefined();
		expect(ctrl.positions.South).toBeDefined();
		expect(ctrl.positions.East).toBeDefined();
		expect(ctrl.positions.West).toBeDefined();
    });
	
	it('should get data from the data service', function() {
		expect(dataService.get).toHaveBeenCalled();
	});	
});

