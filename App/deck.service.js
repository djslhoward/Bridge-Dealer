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
			this.cards = getAllCards();
			this.shuffle = shuffle;
			this.stack = stack;
			this.deal = deal;
			
			function getAllCards() {
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
				
				var stackedHand = inputs.stackedHand || 'North';
				var min = inputs.min || 0;
				var max = inputs.max || 37;
				var length = inputs.firstSuitLength;
				
				var stacked = [];
				var	points = 0;
				var	shape = [0, 0, 0, 0];	
				
				validLength() ? drawLongestSuit() :	length = 13;
				validPointRange() ?	drawMinPoints() : null;
								
				if (deckIsStacked()) {
					drawRestOfHand();						
					shuffleRemainderIntoDeck();
					insertHandIntoDeck();
				}		
				
				return stacked;
											
				function validLength() {
					return length >= 4 && length <= 13;
				}	
								
				function drawLongestSuit() {
					var suitCards = getSuitCards();	
					while (stacked.length < length) {									
						drawCard(suitCards);
					}	
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
							
				function getSuit(number) {
					return Math.ceil(number / 13) - 1;
				}
				
				function getPoints(number) {
					var rank = number % 13;
					var points = (rank === 0) ? 4 : Math.max(rank - 9, 0);
					return points;
				}		
				
				function validPointRange() {
					return min > 0 || max < 37;
				}
							
				function drawMinPoints() {
					var honours = getHonourCards();
					while (points < min && stacked.length < 13) {
						drawCard(honours);
					}
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
				
				function deckIsStacked() {
					return stacked.length > 0 || max < 37;
				}
				
				function drawRestOfHand() {
					var allCards = getAllCards();
					while (stacked.length < 13) {						
						drawCard(allCards);
					} 	
				}
			
				function shuffleRemainderIntoDeck() {
					var remainder = getRemainingCards();
					deck.cards = remainder;
					deck.shuffle();
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
				
				function insertHandIntoDeck() {
					var positions = { 
						'North' : 0, 
						'South' : 1,
						'East'  : 2, 
						'West'  : 3
					};
					var pos = positions[stackedHand] * 13;
					deck.cards = deck.cards.slice(0,pos).concat(stacked).concat(deck.cards.slice(pos));	
				}				
			}			
													
			function deal(hand) {
				var deck = this;
				
				return {
					North : { hand: drawHand(deck), pos: 'North'},
					South : { hand: drawHand(deck), pos: 'South'},
					East  : { hand: drawHand(deck), pos: 'East'},
					West  : { hand: drawHand(deck), pos: 'West'}
				}
				
				function drawHand() {				
					var drawnHand = new hand.Hand(deck);
					drawnHand.arrange();
					deck.cards = deck.cards.slice(13);
					
					return drawnHand;
				}
			}
        }
    }
})();