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
				switch (rank) {
					case 10:
						rank = 'J';
						break;
					case 11:
						rank = 'Q';
						break;
					case 12:
						rank = 'K';
						break;
					case 0:
						rank = 'A';
						break;
					default:
						rank += 1;
						break;
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
			
			var points;
			switch (rank) {
				case 'J':
					points = 1;
					break;
				case 'Q':
					points = 2;
					break;
				case 'K':
					points = 3;
					break;
				case 'A':
					points = 4;
					break;
				default:
					points = 0;
					break;
			}
			
			this.rank = rank;
			this.suit = suit;
			this.points = points;
		}			
    }
})();