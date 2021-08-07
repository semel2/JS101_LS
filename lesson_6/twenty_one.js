const readline = require("readline-sync");
const MAX_HAND_VALUE = 21;
const NUM_SUITS = 4;
const DEALER_STAY_VALUE = 17;
const PLAYER1_WIN = 0;
const DEALER_WIN = 1;
const DRAW = 2;
const MATCH_WIN = 5;
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

const MASTER_KEY = {
  boardSelection: {query: "Choose a position to mark.",
    choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9']},
  playAgain: {query: "Do you want to play again? (y/n)",
    choices: ['yes', 'no', 'y', 'n']},
  playerHit: {query: "Do you want to hit or stay? (h/s)",
    choices: ['hit', 'stay', 'h', 's']}
};

function getUserSelectionAndValidate(validationType) {
  prompt(MASTER_KEY[validationType].query);
  let outputValue = readline.question().trim().toLowerCase();

  while (!MASTER_KEY[validationType].choices.includes(outputValue)) {
    prompt("Invalid choice entered- please select again.");
    outputValue = readline.question().trim().toLowerCase();
  }
  return outputValue;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function hit(hand, deck) {
  hand.push(deck.shift());
}

function joinOr(array, delimiter = ',', conjunction = 'or') {
  return array.slice(0, array.length - 1).join(delimiter + ' ') +
    ((array.length > 2) ? delimiter : "") + ' ' + conjunction +
    ' ' + array[array.length - 1];
}

function initializeDeck() {
  let deck = Array(NUM_SUITS).fill(Object.keys(CARDS)).flat();
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]];
  }
  return deck;
}

function initializeGameVariables() {
  let deck = initializeDeck();
  let playerHand = {hand: [], hit: 'h', value: 0};
  let dealerHand = {hand: [], value: 0};

  for (let index = 0; index < 2; index += 1) {
    hit(playerHand.hand, deck);
    hit(dealerHand.hand, deck);
  }

  playerHand.value = getHandValue(playerHand.hand);
  dealerHand.value = getHandValue(dealerHand.hand);
  return [deck, playerHand, dealerHand];
}


function sumCurrentHandValues(currentHandValues) {
  return currentHandValues.reduce((sum, card) => sum + card, 0);
}

function getHandValue(hand) {
  let currentHandValues = hand.map(card => {
    if (card !== 'Ace') {
      return CARDS[card];
    } else return CARDS[card]['soft'];
  });

  while (sumCurrentHandValues(currentHandValues) > MAX_HAND_VALUE && currentHandValues.indexOf(CARDS['Ace']['soft']) !== -1) {
    currentHandValues[currentHandValues.indexOf(CARDS['Ace']['soft'])] = CARDS['Ace']['hard'];
  }
  return sumCurrentHandValues(currentHandValues);
}

function playerTurn(playerHand, dealerHand, deck) {
  while (playerHand.hit === 'h' && playerHand.value < MAX_HAND_VALUE) {
    prompt(`Dealer has: ${dealerHand.hand[0]} and unknown card
   You have: ${joinOr(playerHand.hand, ',', 'and')} (${playerHand.value})`);
    playerHand.hit = getUserSelectionAndValidate('playerHit');
    if (playerHand.hit[0].toLowerCase() === 'h') {
      hit(playerHand.hand, deck);
      playerHand.value = getHandValue(playerHand.hand);
    }
  }
  if (playerHand.value >= MAX_HAND_VALUE) {
    prompt(`You have: ${joinOr(playerHand.hand, ',', 'and')} (${playerHand.value})`);
  }
  return playerHand;
}

function dealerTurn(dealerHand, playerHand, deck) {
  if (playerHand.value <= MAX_HAND_VALUE) {
    while (dealerHand.value < DEALER_STAY_VALUE) {
      hit(dealerHand.hand, deck);
      dealerHand.value = getHandValue(dealerHand.hand);
    }
  }
  prompt(`Dealer ended with ${joinOr(dealerHand.hand, ',','and')} (${dealerHand.value})`);
  return dealerHand;
}

function getGameResult(playerHand, dealerHand) {
  let gameResult = 0;
  if (playerHand.value > MAX_HAND_VALUE) {
    gameResult = DEALER_WIN;
  } else if ((dealerHand.value > MAX_HAND_VALUE) ||
    (playerHand.value > dealerHand.value)) {
    gameResult = PLAYER1_WIN;
  } else if (playerHand.value < dealerHand.value) {
    gameResult = DEALER_WIN;
  } else gameResult = DRAW;
  return gameResult;
}

function updateWinCount(gameResult, winCount) {
  winCount[gameResult] += 1;
}

function displayGameResultAndWinCount(gameResult, winCount) {
  switch (gameResult) {
    case PLAYER1_WIN:
      prompt('You win!');
      break;
    case DEALER_WIN:
      prompt('Dealer wins.');
      break;
    case DRAW:
      prompt("It's a draw.");
      break;
  }
  prompt('Current scoreboard:');
  console.log('                      ');
  console.log('  Player1 |  Dealer  | Draw');
  console.log(' _________|__________|_______');
  console.log(`     ${winCount[0]}    |    ${winCount[1]}     |   ${winCount[2]}`);
  console.log('');

  if (winCount[PLAYER1_WIN] === MATCH_WIN) {
    prompt("You win the match!");
  } else if (winCount[DEALER_WIN] === MATCH_WIN) {
    prompt("Dealer wins the match.");
  }
}

console.clear();
prompt("Welcome to twenty-one!");
let winCount = [0,0,0];
do {
  winCount = (winCount.indexOf(MATCH_WIN) === -1) ? winCount : [0,0,0];

  let [deck, playerHand, dealerHand] = initializeGameVariables();
  playerHand = playerTurn(playerHand, dealerHand, deck);
  dealerHand = dealerTurn(dealerHand, playerHand, deck);

  let gameResult = getGameResult(playerHand, dealerHand);
  updateWinCount(gameResult, winCount);
  displayGameResultAndWinCount(gameResult, winCount);
} while (getUserSelectionAndValidate('playAgain')[0] === 'y' && (console.clear() || true));