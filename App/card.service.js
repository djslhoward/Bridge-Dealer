(function () {
    'use strict';

    var serviceId = 'card';
    angular
        .module('app')
        .factory(serviceId, [
            card
        ]);
		
    function card() {
        var service = {
            Card: Card
        };

        return service;
			
        function Card(rank, suit) {		
			var ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
			var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
			var honours = ['J', 'Q', 'K', 'A'];
			var card;
			
			if (typeof suit === 'undefined') {
				checkForErrors(rank);
				card = getCard(rank);
			} else { 
				card = { rank: rank, suit: suit };	
				checkForErrors(card);
			}
			
			var points = honours.indexOf(card.rank) + 1 || 0;
	
			this.rank = card.rank;
			this.suit = card.suit;
			this.points = points;
			
			function getCard(rank) {					
				suit = suits[Math.ceil(rank / 13) - 1];
				rank = rank % 13;
				rank = ranks[rank];
				
				return { rank: rank, suit: suit };
			}
			
			function checkForErrors(input) {	
				var message = 'Invalid input: ' + input;
				
				var rank = input.rank || input;
				var suit = input.suit || null;
				
				var minRank = 1;
				var maxRank = 52; 
				
				if (suit) {
					suits.indexOf(suit) < 0 ? throwException(input) : minRank = 2, maxRank = 10;				
				}
				
				if(isNaN(rank)) {
					if (honours.indexOf(rank) < 0) {
						throw message;
					}
				} else if (Math.floor(rank) !== Math.ceil(rank) || rank < minRank || rank > maxRank) {
					throw message;
				}
			}
		}			
    }
})();