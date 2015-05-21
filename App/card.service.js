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
			var suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
			
			if (typeof suit === 'undefined') {
				if(isNaN(rank)) {
					throw 'no such card exists';
				}
			
				if (Math.floor(rank) !== Math.ceil(rank)) {
					throw 'no such card exists';
				}
			
				if (rank < 1 || rank > 52) {
					throw 'no such card exists';
				}
			
				suit = suits[Math.ceil(rank / 13) - 1];
				rank = rank % 13;								
				if (rank < 2 || rank > 10)  {
					switch (rank) {
						case 11:
							rank = 'J';
							break;
						case 12:
							rank = 'Q';
							break;
						case 0:
							rank = 'K';
							break;
						case 1:
							rank = 'A';
							break;
						default:
							break;
					}
				}				
			} else { 
				if(isNaN(rank)) {
					if (rank !== 'J' && rank !== 'Q' && rank !== 'K' && rank !== 'A') {
						throw 'no such rank exists';
					}
				} else if (Math.floor(rank) !== Math.ceil(rank)) {
					throw 'no such rank exists';
				}
			
				if (rank < 2 || rank > 10) {
					throw 'no such rank exists';
				} 
				if (suits.indexOf(suit) === -1) {
					throw 'no such suit exists';
				}
			}
			
			this.rank = rank;
			this.suit = suit;
		}			
    }
})();