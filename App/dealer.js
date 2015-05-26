(function () {
    'use strict';

    var controllerId = 'dealer';
    angular.module('app')
        .controller(controllerId, [
			'card',
			'deck',
			'hand',
			'$location',
			Dealer
		]);

    function Dealer(card, deck, hand, $location) {
		var vm = this;
		
		vm.$location = $location;
		vm.dealCards = dealCards;
		
		dealCards();
					
		function dealCards() {		
			var deckOfCards = new deck.Deck(hand);	
			deckOfCards.shuffle();
			var hands = deckOfCards.deal(hand);

			vm.positions = {
				'North' : { hand: hands.north, pos: 'North'},
				'South' : { hand: hands.south, pos: 'South'},
				'East'  : { hand: hands.east, pos: 'East'},
				'West'  : { hand: hands.west, pos: 'West'}
			}
					
			var points = vm.positions.North.hand.points;
			var min = vm.minPoints || 0;
			var max = vm.maxPoints || 40;	
			
			var suits = vm.positions.North.hand.suits;
			var suitLengths = [suits.Spades.length, suits.Hearts.length, suits.Diamonds.length, suits.Clubs.length];
			
			var firstLength = Math.max.apply(null, suitLengths);
			var firstSuitLength = vm.firstSuitLength;			
			
			suitLengths.splice(suitLengths.indexOf(firstLength), 1);
			
			var secondLength = Math.max.apply(null, suitLengths);
			var secondSuitLength = vm.secondSuitLength;	
			
			if (points < min || 
			points > max || 
			(firstSuitLength >= 4 && firstSuitLength <= 13 && firstLength != firstSuitLength) || 
			(secondSuitLength >= 0 && secondSuitLength <= 6 && secondLength != secondSuitLength)) {
				dealCards();
			}
		}
	}
})();