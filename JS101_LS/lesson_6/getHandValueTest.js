const CARDS = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  Jack: 10,
  Queen: 10,
  King: 10,
  Ace: {hard: 1, soft: 11}
};
const MAX_HAND_VALUE = 21;

function getHandValue(hand) {
  let allAces = hand.filter(card => card === 'Ace');
  let sortedHand = hand.filter(card => card !== 'Ace').concat(allAces);
  let currentHandValues = sortedHand.map(card => {
    if (card !== 'Ace') {
      return CARDS[card];
    } else return CARDS[card]['soft'];
  });
  while (sumCurrentHandValues(currentHandValues) > 21 && currentHandValues.indexOf(CARDS['Ace']['soft']) !== -1) {
    currentHandValues[currentHandValues.indexOf(CARDS['Ace']['soft'])] = CARDS['Ace']['hard'];
  }
  return sumCurrentHandValues(currentHandValues);
}

function sumCurrentHandValues(hand) {
  return hand.reduce((sum, card) => sum + card, 0);
}


function checkGameStatus(playerHand, dealerHand) {
  let gameStatus = "";
  debugger;
  if ((getHandValue(playerHand.hand) > MAX_HAND_VALUE) || (getHandValue(playerHand.hand) < getHandValue(dealerHand.hand))) {
    gameStatus = "Dealer wins.";
  } else if ((getHandValue(dealerHand.hand) > MAX_HAND_VALUE) || (getHandValue(playerHand.hand) > getHandValue(dealerHand.hand))) {
    gameStatus = "You win!"
    console.log('reached this branch')
  } else gameStatus = "It's a tie.";
  return gameStatus;
}

let playerHand = {hand: ['Ace', '7']};
let dealerHand = {hand: ['Queen', '4', 'Queen']};

checkGameStatus(playerHand, dealerHand)