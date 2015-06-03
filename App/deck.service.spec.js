describe('Deck Factory', function() {
	'use strict';
	var deckService, handService;
		
	beforeEach(function (){			
		module('app', function($provide) {		
			handService = {};
			handService.Hand = jasmine.createSpy().and.returnValue({cards: [16, 34, 18, 44, 48, 46, 7, 45, 2, 13, 5, 10, 22], arrange: jasmine.createSpy()});
					
			$provide.value('hand', handService);
		});
			
		inject(function(_deck_){
			deckService = _deck_;
		});	
	});
	
	describe('Deck objects', function() {
		var deck;
		
		beforeEach(function() {		
			deck = new deckService.Deck();
		});
		
		it('should contain 52 cards', function() {
			expect(deck.cards.length).toBe(52);
		});
		
		it('should have a shuffle function', function() {
			expect(deck.shuffle).toBeDefined();
		});
		
		describe('shuffle function', function() {
			it('should randomise the order of the cards', function() {				
				var unshuffled = deck.cards;	
				
				deck.shuffle();
				
				expect(deck.cards).not.toEqual(unshuffled);
				expect(deck.cards.length).toBe(52);
			});
		});
		
		it('should have a stack function', function() {
			expect(deck.stack).toBeDefined();
		});
		
		describe('stack function', function() {
			var unstacked, getPoints, getSuitLength;
			
			beforeEach(function() {
				unstacked = deck.cards;
				
				getPoints = function() {
					var points = 0;
					for (var i = 0; i < 13; i++) {
						var card = deck.cards[i];
						var rank = card % 13;
						switch (rank) {
							case 10:
								points++;
								break;
							case 11:
								points += 2;
								break;
							case 12:
								points += 3;
								break;
							case 0:
								points += 4;
								break;
						}
					}
					return points;
				}
				
				getSuitLength = function() {
					var suits = [0, 0, 0, 0];				
					for (var i = 0; i < 13; i++) {
						var card = deck.cards[i];
						var suit = Math.ceil(card / 13) - 1;
						suits[suit]++;
					};
					return Math.max.apply(null, suits);
				}
			});
		
			it('should do nothing if input is empty', function() {
				var inputs = {};
				
				deck.stack(inputs);
				
				expect(deck.cards).toEqual(unstacked);
			});
			
			it('should ensure the first 13 cards contain at least the minimum specified points', function() {
				var inputs = {
					min: 24
				};
				
				deck.stack(inputs);
				
				var points = getPoints();
				
				expect(Math.ceil(points)).toEqual(Math.floor(points));
				expect(points).toBeGreaterThan(23);
			});
			
			it('should ensure the first 13 cards contain at most the maximum specified points', function() {
				var inputs = {
					max: 3
				};
				
				deck.stack(inputs);
				
				var points = getPoints();
				
				expect(Math.ceil(points)).toEqual(Math.floor(points));
				expect(points).toBeLessThan(4);
			});
			
			it('should ensure the first 13 cards fall within the specified point range', function() {
				var inputs = {
					min: 27,
					max: 29
				};
				
				deck.stack(inputs);
				
				var points = getPoints();
				
				expect(Math.ceil(points)).toEqual(Math.floor(points));
				expect(points).toBeGreaterThan(26);
				expect(points).toBeLessThan(30);
			});
			
			it('should ensure the first 13 cards contain a suit with the specified length', function() {
				var inputs = {
					firstSuitLength : 7
				};
				
				deck.stack(inputs);
				
				var suitLength = getSuitLength();
				
				expect(suitLength).toEqual(7);
			});
			
			it('should do all of the above at once', function() {
				var inputs = {
					min: 20,
					max: 23,
					firstSuitLength: 4
				};
				
				deck.stack(inputs);
				
				var points = getPoints();
				var suitLength = getSuitLength();
							
				expect(Math.ceil(points)).toEqual(Math.floor(points));
				expect(points).toBeGreaterThan(19);
				expect(points).toBeLessThan(24);
				expect(suitLength).toEqual(4);
			});
		});
		
		it('should have a deal function', function() {
			expect(deck.deal).toBeDefined();
		});
		
		describe('deal function', function() {
			var hands;
			
			beforeEach(function() {
				hands = deck.deal(handService);	
			});
		
			it('should deal four hands of thirteen cards', function() {				
				expect(hands.north.cards.length).toBe(13);
				expect(hands.south.cards.length).toBe(13);
				expect(hands.east.cards.length).toBe(13);
				expect(hands.west.cards.length).toBe(13);
			});
			
			it('should arrange each hand', function() {
				expect(handService.Hand().arrange.calls.count()).toBe(4);			
			});
		});
	});
});
