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
