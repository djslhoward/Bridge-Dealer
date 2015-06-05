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

		vm.dealCards = dealCards;
		vm.saveData = saveData;
		vm.stackedHand = 'North';
		
		dealCards();
			
		function dealCards() {	
			var inputs = data.get();
			inputs.stackedHand = inputs.stackedHand || 'North';
			
			var deckOfCards = buildDeck();
			vm.positions = deckOfCards.deal(hand);
			
			if (inputConditionsNotMet()) {
				dealCards();
			}
			
			function buildDeck() {
				var deckOfCards = new deck.Deck(hand);	
				deckOfCards.shuffle();
				deckOfCards.stack(inputs);
				return deckOfCards;
			}
						
			function inputConditionsNotMet() {
				var stackedHand = vm.positions[inputs.stackedHand].hand;				
				var points = stackedHand.points;	
				var suits = stackedHand.suits;
				
				var suitLengths = [suits.Spades.length, suits.Hearts.length, suits.Diamonds.length, suits.Clubs.length];
				var bestLength = Math.max.apply(null, suitLengths);			
							
				return points < inputs.min || points > inputs.max || inputs.firstSuitLength >= 4 && inputs.firstSuitLength <= 13 && bestLength != inputs.firstSuitLength;
			}
		}
		
		function saveData() {
			var inputs = {
				stackedHand: vm.stackedHand || 'North',
				min: vm.minPoints || 0,
				max: vm.maxPoints || 37,
				firstSuitLength: vm.firstSuitLength		
			};	
			data.set(inputs);
		}		
	}
})();