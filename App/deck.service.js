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
			this.deal = deal;
			
			for (var i = 1; i <= 52; i++) 
			{
				this.cards.push(i);
			}
			
			function shuffle() {
				var shuffled = [];

				for (var i = 0; i < 52; i++) {
					var randomNumber = Math.floor((Math.random() * (52 - i)));

					shuffled[i] = this.cards[randomNumber];
					this.cards.splice(randomNumber, 1);
				}
				
				this.cards = shuffled;
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