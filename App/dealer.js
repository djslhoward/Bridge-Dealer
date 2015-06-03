(function () {
    'use strict';

    var controllerId = 'dealer';
    angular.module('app')
        .controller(controllerId, [
			'card',
			'data',
			'deck',
			'hand',
			'$location',
			Dealer
		]);

    function Dealer(card, data, deck, hand, $location) {
		var vm = this;

		vm.$location = $location;
		vm.dealCards = dealCards;
		vm.saveData = saveData;
		
		dealCards();

		function saveData() {
			var inputs = {
				min: vm.minPoints || 0,
				max: vm.maxPoints || 37,
				firstSuitLength: vm.firstSuitLength
			};	
			data.set(inputs);
		}
				
		function dealCards() {	
			var inputs = data.get();
		
			var deckOfCards = new deck.Deck(hand);	
			deckOfCards.shuffle();
			deckOfCards.stack(inputs);
			var hands = deckOfCards.deal(hand);

			vm.positions = {
				'North' : { hand: hands.north, pos: 'North'},
				'South' : { hand: hands.south, pos: 'South'},
				'East'  : { hand: hands.east, pos: 'East'},
				'West'  : { hand: hands.west, pos: 'West'}
			};
			
			var north = vm.positions.North.hand;		
			
			var points = north.points;	
			var suits = north.suits;
			
			var suitLengths = [suits.Spades.length, suits.Hearts.length, suits.Diamonds.length, suits.Clubs.length];
			var firstLength = Math.max.apply(null, suitLengths);			
						
			if (points < inputs.min || 
				points > inputs.max || 
				inputs.firstSuitLength >= 4 && inputs.firstSuitLength <= 13 && firstLength != inputs.firstSuitLength) {
				dealCards();
			} 
		}	
	}
})();