describe('Hand Factory', function() {
	'use strict';
	var cardService, handService;
		
	beforeEach(function (){			
		module('app', function($provide) {	
			var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
			
			cardService = {};
			cardService.Card = jasmine.createSpy().and.callFake(function(number) {
				var object = {
					rank : number % 13,
					suit : suits[Math.ceil(number / 13) - 1],
					points: Math.max(number % 13 - 9, 0)
				};
				return object;
			});
			
			$provide.value('card', cardService);
		});
			
		inject(function(_hand_){
			handService = _hand_;
		});
	});
	
	describe('Hand objects', function() {
		var hand, deck;
		
		beforeEach(function() {	
			deck = {};
			deck.cards = [16, 34, 18, 44, 48, 46, 7, 45, 2, 12, 5, 10, 22, 
						  28, 25, 20, 51, 52, 8, 37, 24, 19, 27, 36, 15, 40, 
						  32, 50, 49, 30, 47, 43, 29, 6, 39, 35, 1, 4, 14, 
						  33, 42, 9, 26, 13, 31, 41, 3, 23, 38, 17, 21, 11];
			hand = new handService.Hand(deck);
		});
		
		it('should contain 13 numbers', function() {
			expect(hand.cards.length).toBe(13);
		});
		
		it('should should be drawn from the deck', function() {
			expect(hand.cards).toEqual([16, 34, 18, 44, 48, 46, 7, 45, 2, 12, 5, 10, 22]);
		});
		
		it('should have an arrange function', function() {
			expect(hand.arrange).toBeDefined();
		});
		
		describe('arrange function', function() {
			beforeEach(function() {
				hand.arrange();
			});
		
			it('should sort numbers into descending order', function() {		
				expect(hand.cards).toEqual([48, 46, 45, 44, 34, 22, 18, 16, 12, 10, 7, 5, 2]);
			});
			
			it('should convert the numbers into card objects', function() {
				expect(cardService.Card.calls.count()).toEqual(13);
			});
			
			it('should assign a points value to the hand', function() {
				expect(hand.points).toBe(4);
			});
			
			it('should arrange the cards into suits', function() {
				expect(hand.suits.Spades).toEqual([cardService.Card(48), cardService.Card(46), cardService.Card(45), cardService.Card(44)]);
				expect(hand.suits.Hearts).toEqual([cardService.Card(34)]);
				expect(hand.suits.Diamonds).toEqual([cardService.Card(22), cardService.Card(18), cardService.Card(16)]);
				expect(hand.suits.Clubs).toEqual([cardService.Card(12), cardService.Card(10), cardService.Card(7), cardService.Card(5), cardService.Card(2)]);
			});
		});
	});
});
