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
			this.cards = buildDeck();
			this.shuffle = shuffle;
			this.stack = stack;
			this.deal = deal;
			
			function buildDeck() {
				var cards = [];	
				for (var i = 1; i <= 52; i++) {
					cards.push(i);
				}
				return cards;
			}
			
			function shuffle() {
				var deck = this;
				var shuffled = [];
				var length = deck.cards.length;
				
				for (var i = 0; i < length; i++) {
					var randomNumber = Math.floor(Math.random() * (length - i));

					shuffled[i] = deck.cards[randomNumber];
					deck.cards.splice(randomNumber, 1);
				}
				
				deck.cards = shuffled;
			}
			
			function stack(inputs) {
				var deck = this;
				
				var min = inputs.min || 0;
				var max = inputs.max || 37;
				var length = inputs.firstSuitLength;
				
				var stacked = [];
				var	unstacked = [];
				var	points = 0;
				var	shape = [0, 0, 0, 0];
				
				var suit = getSuitCards();			
				var honours = getHonourCards();
				var any = buildDeck();
				
				validLength() ? drawLongestSuit() :	length = 13;
				validPointRange() ?	drawMinPoints() : null;
								
				if (deckIsStacked()) {
					drawRestOfHand();	
				
					unstacked = getRemainingCards();
					
					deck.cards = unstacked;
					deck.shuffle();
					deck.cards = stacked.concat(deck.cards);						
				}	
				
				function getSuitCards() {
					var suit = Math.floor(Math.random() * 4);
					var cards = [];
					for (var i = 1; i <= 52; i++) {
						if (getSuit(i) === suit) {
							cards.push(i);
						}
					}
					return cards;
				}
				
				function getSuit(number) {
					return Math.ceil(number / 13) - 1;
				}
				
				function getHonourCards() {
					var cards = [];
					for (var i = 1; i <= 52; i++) {
						if (getPoints(i) > 0) {
							cards.push(i);
						}
					}
					return cards;
				}
															
				function getPoints(number) {
					var rank = number % 13;
					var points = (rank === 0) ? 4 : Math.max(rank - 9, 0);
					return points;
				}		
				
				function validLength() {
					return length >= 4 && length <= 13;
				}	
				
				function drawLongestSuit() {
					while (stacked.length < length) {									
						drawCard(suit);
					}	
				}

				function validPointRange() {
					return min > 0 || max < 37;
				}
				
				function drawMinPoints() {
					while (points < min && stacked.length < 13) {
						drawCard(honours);
					}
				}
				
				function deckIsStacked() {
					return stacked.length > 0 || max < 37;
				}
				
				function drawRestOfHand() {
					while (stacked.length < 13) {						
						drawCard(any);
					} 	
				}
				
				function drawCard(array) {
					var number = Math.floor(Math.random() * array.length);
					var card = array[number];
					if (points + getPoints(card) <= max && stacked.indexOf(card) < 0 && shape[getSuit(card)] < length) {		
						stacked.push(card);
						points+= getPoints(card);
						shape[getSuit(card)]++;					
					}
					array.splice(number, 1);	
					return array;
				}	

				function getRemainingCards() {
					var cards = [];
					for (var k = 1; k <= 52; k++) {
						if (stacked.indexOf(k) < 0) {
							cards.push(k);
						}
					}
					return cards;
				}				
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