(function () {
    'use strict';

    var serviceId = 'deck';
    angular
        .module('app')
        .factory(serviceId, [
			'hand',
            deck
        ]);

    function deck(hand) {
        var service = {
            Deck: Deck
        };
		
        return service;
			
        function Deck(hand) {
			this.cards = [];
			this.shuffle = shuffle;
			this.stack = stack;
			this.deal = deal;
			
			for (var i = 1; i <= 52; i++) 
			{
				this.cards.push(i);
			}
			
			function shuffle() {
				var deck = this;
				var shuffled = [];

				for (var i = 0; i < 52; i++) {
					var randomNumber = Math.floor((Math.random() * (52 - i)));

					shuffled[i] = deck.cards[randomNumber];
					deck.cards.splice(randomNumber, 1);
				}
				
				deck.cards = shuffled;
			}
			
			function stack(inputs) {
				var deck = this;
			
				var min = inputs.min;
				var max = inputs.max;
				var length = inputs.firstSuitLength;
										
				if (length >= 4 && length <= 13) {	
					var suit = pickSuit();
					
					var stacked = suit.drawSuit(length);
					var remainder = suit.drawRemainder(stacked, deck);
					
					deck.cards = stacked.concat(remainder); 
				}
			}
			
			function pickSuit() {
				var randomSuit = Math.floor((Math.random() * 4));
				var suitArray = [1,2,3,4,5,6,7,8,9,10,11,12,13];
				for (var i = 0; i < 13; i++) {
					suitArray[i] += randomSuit * 13;
				}
				return { id: randomSuit, cards: suitArray, drawSuit: drawSuit, drawRemainder: drawRemainder };
			}
			
			function drawSuit(length) {
				var suit = this;
				var hand = [];				
				for (var j = 0; j < length; j++) {
					var randomNumber = Math.floor(Math.random() * (13 - j));
					hand[j] = suit.cards[randomNumber];		
					suit.cards.splice(randomNumber, 1);
				}
				return hand;
			}
			
			function drawRemainder(stacked, deck) {
				var drawnSuit = this;
				var suits = [0, 0, 0, 0];					
				var length = stacked.length;
				var remainder = [];

				for (var k = 0; k < 52; k++) {
					var card = deck.cards[k];
					if (stacked.indexOf(card) < 0) {
						var suit = getSuit(card);
						if (suit !== drawnSuit.id && stacked.length < 13) {			
							if (suits[suit] < length) {
								stacked.push(card);
								suits[suit]++;
							} 		
						} 
						remainder.push(card);
					} 
				}
				
				return remainder;
			}
			
			function getSuit(number) {
				return Math.ceil(number / 13) - 1;
			}
										
			function deal(hand) {
				var deck = this;
				
				var north = new hand.Hand(deck);
				north.arrange();
				deck.cards = deck.cards.slice(13);
				
				var south = new hand.Hand(deck);
				south.arrange();
				deck.cards = deck.cards.slice(13);
				
				var east = new hand.Hand(deck);
				east.arrange();
				deck.cards = deck.cards.slice(13);
				
				var west = new hand.Hand(deck);
				west.arrange();
				
				return { 
					'north' : north, 
					'south' : south, 
					'east'  : east, 
					'west'  : west 
				};
			}
        }
    }
})();