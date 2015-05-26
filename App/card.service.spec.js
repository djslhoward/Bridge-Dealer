describe('Card Factory', function() {
	'use strict';
	var cardService;
		
	beforeEach(function (){
			
		module('app');
			
		inject(function(_card_){
			cardService = _card_;
		});
	});
	
	describe('Card objects', function() {
		var card, honour;
		
		beforeEach(function() {		
			card = new cardService.Card(5, 'Spades');
			honour = new cardService.Card('J', 'Diamonds');
		});
		
		it('should have the specified rank', function() {
			expect(card.rank).toBe(5);
			expect(honour.rank).toBe('J');
		});
		
		it('should have the specified suit', function() {
			expect(card.suit).toBe('Spades');
			expect(honour.suit).toBe('Diamonds');
		});	
						
		it('should error if rank is not a number or valid honour', function() {
			var invalidRank;
			invalidRank = function() {
				return new cardService.Card('fish', 'Spades');
			};
			expect(invalidRank).toThrow();
								
			invalidRank = function() {
				return new cardService.Card('S', 'Clubs');
			};
			expect(invalidRank).toThrow();
		});
		
		it('should error if rank is not an integer', function() {
			var notAnInteger = function() {
				return new cardService.Card('7.6', 'Hearts');
			};
			expect(notAnInteger).toThrow();
		});
		
		it ('should error if rank is out of range', function() {
			var outOfRange;
			outOfRange = function() {
				return new cardService.Card(13, 'Diamonds');
			};
			expect(outOfRange).toThrow();
			
			outOfRange = function() {
				return new cardService.Card(1, 'Clubs');
			};
			expect(outOfRange).toThrow();
			
			outOfRange = function() {
				return new cardService.Card(77, 'Hearts');
			};
			expect(outOfRange).toThrow();
	
		});
		
		it('should error if given a suit that doesn\'t exist', function() {
			var invalidSuit = function() {
				return new cardService.Card(8, 'Pentacles');
			};
			expect(invalidSuit).toThrow();
		});
		
		it('should generate from the numbers 1-52', function() {
			card = new cardService.Card(39);
			expect(card.rank).toBe('A');
			expect(card.suit).toBe('Hearts');
			
			card = new cardService.Card(1);
			expect(card.rank).toBe(2);
			expect(card.suit).toBe('Clubs');
		});
		
		it('should error if input is not a number', function() {
			var notANumber = function() {
				return new cardService.Card('fish');
			};
			expect(notANumber).toThrow();
		});
		
		it('should error if number is not an integer', function() {		
			var notAnInteger;
			notAnInteger = function() {
				return new cardService.Card(5.8);
			};
			expect(notAnInteger).toThrow();
			
			notAnInteger = function() {
				return new cardService.Card(6.3);
			};
			expect(notAnInteger).toThrow();
		});
		
		it('should error if number is out of range', function() {
			var outOfRange;
			outOfRange = function() {
				return new cardService.Card(0);
			};
			expect(outOfRange).toThrow();
			
			outOfRange = function() {
				return new cardService.Card(53);
			};
			expect(outOfRange).toThrow();
			
			outOfRange = function() {
				return new cardService.Card(101);
			};
			expect(outOfRange).toThrow();
		});
		
		it('should have the right number of High Card Points: 1 for a Jack, 2 for a Queen, 3 for a King and 4 for an Ace', function() {
			expect(card.points).toBe(0);
			
			expect(honour.points).toBe(1);
			
			honour = new cardService.Card(24);
			expect(honour.points).toBe(2);
			
			honour = new cardService.Card('K', 'Diamonds');
			expect(honour.points).toBe(3);
			
			honour = new cardService.Card(13);
			expect(honour.points).toBe(4);
		});
	});
});
