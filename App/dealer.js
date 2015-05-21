(function () {
    'use strict';

    var controllerId = 'dealer';
    angular.module('app')
        .controller(controllerId, [
			'card',
			'deck',
			'hand',
			Dealer
		]);

    function Dealer(card, deck, hand) {
		var vm = this;
		
		var deckOfCards = new deck.Deck();	
		deckOfCards.shuffle();
		var hands = deckOfCards.deal();
		
		vm.North = hands.north;	
		vm.South = hands.south;
		vm.East = hands.east
		vm.West = hands.west;
    }
})();