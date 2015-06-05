(function () {
    'use strict';

    var serviceId = 'hand';
    angular
        .module('app')
        .factory(serviceId, [
			'card',
            hand
        ]);

    function hand(card) {
        var service = {
            Hand: Hand
        };
		
        return service;
		
        function Hand(deck) {
            this.cards = deck.cards.slice(0, 13);
            this.suits = {};
			this.points = 0;
			this.arrange = arrange;
					
			function arrange() {
				sort(this.cards);
				var converted = convert(this.cards);
				this.points = getPoints(converted);
				sortIntoSuits(converted, this.suits);
			}
			
            function sort(cards) {
                cards.sort(function (a, b) {
                    return b - a;
                });
            }
			
			function convert(cards) {
				var suits = [];
				for (var i = 0; i < 13; i++) {				
					suits.push(new card.Card(cards[i]));
				}
				return suits;
			}
			
			function getPoints(suits) {
				var points = 0;
				for(var i = 0; i < 13; i++) {
					points += suits[i].points;
				}
				return points;
			}
			
			function sortIntoSuits(cards, suits) {
				suits.Spades = [];
				suits.Hearts = [];
				suits.Diamonds = [];
				suits.Clubs = [];
				for(var i = 0; i < 13; i++) {			
					var card = cards[i];	
					suits[card.suit].push(card);
				}
			}
        }
    }
})();