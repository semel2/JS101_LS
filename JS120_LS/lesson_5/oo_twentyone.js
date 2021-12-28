const readline = require('readline-sync');

const gameflow = {

  getQuery(valueType) {
    switch (valueType) {
      case 'hit':
        return 'Would you like to hit or stay? (h/s)';
      case 'playAgain':
        return '\nWould you like to play again? (y/n)';
      case 'startGame':
        return 'Hit ENTER when you are ready to begin.';
    }
  },

  getValidChoices(valueType) {
    switch (valueType) {
      case 'hit':
        return ['h', 's', 'hit', 'stay'];
      case 'playAgain':
        return ['y', 'n', 'yes', 'no'];
      case 'startGame':
        return '';
    }
  },

  joinOr(array, delimiter = ',', conjunction = 'or') {
    if (array.length === 1) return array[0];
    delimiter = delimiter.trim();
    return array.slice(0, array.length - 1).join(delimiter + ' ') +
    ((array.length > 2) ? delimiter : '') +
    ' ' + conjunction + ' ' + array[array.length - 1].toString();
  },

  acquireValueAndValidate(valueType, context) {
    let choice;
    while (true) {
      console.log(this.getQuery(valueType, context));
      choice = readline.question().trim().toLowerCase();

      if (this.getValidChoices(valueType, context).includes(choice)) break;
      console.log("Sorry, that's not a valid choice.");
    }
    return choice;
  }
};

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = Card.VALUES[rank].default;
  }

  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
  static SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  static VALUES = {
    2: {default: 2},
    3: {default: 3},
    4: {default: 4},
    5: {default: 5},
    6: {default: 6},
    7: {default: 7},
    8: {default: 8},
    9: {default: 9},
    10: {default: 10},
    Jack: {default: 10},
    Queen: {default: 10},
    King: {default: 10},
    Ace: {default: 11, hard: 1}
  }

  flipAceValue() {
    if (this.rank === 'Ace') this.value = Card.VALUES.Ace.hard;
  }

  toString() {
    return this.rank;
  }
}

class Deck {

  init() {
    this.cards = [];
    for (let vdx = 0; vdx < Card.RANKS.length; vdx += 1) {
      for (let sdx = 0; sdx < Card.SUITS.length; sdx += 1) {
        this.cards.push(new Card(Card.RANKS[vdx], Card.SUITS[sdx]));
      }
    }
  }

  shuffle() {
    for (let idx = 0; idx < this.cards.length - 1; idx += 1) {
      let jdx = Math.floor(Math.random() * (this.cards.length - idx)) + idx;
      [this.cards[idx], this.cards[jdx]] = [this.cards[jdx], this.cards[idx]];
    }
  }

  dealCard(cardholder) {
    cardholder.hand.push(this.cards.pop());
  }

  dealHand(cardholder) {
    this.dealCard(cardholder);
    this.dealCard(cardholder);
  }
}

class Participant {
  constructor() {
    this.hand = [];
  }

  clearHand() {
    this.hand = [];
  }

  getCurrentHandSum() {
    let handCopy = this.hand.slice();
    return handCopy.reduce((accum, card) => {
      return accum + card.value;
    }, 0);
  }

  getUnflippedAceIndex() {
    return this.hand.map(card => card.value).indexOf(Card.VALUES.Ace.default);
  }

  getHandValue() {
    while (this.getUnflippedAceIndex() !== -1 &&
    this.getCurrentHandSum() > TwentyOneGame.BLACKJACK) {
      this.hand[this.getUnflippedAceIndex()].flipAceValue();
    }
    return this.getCurrentHandSum();
  }
}

class Player extends Participant {
  constructor() {
    super();
    this.money = Player.STARTING_MONEY;
  }

  static STARTING_MONEY = 5;

  hitOrStay() {
    let choice = gameflow.acquireValueAndValidate('hit');
    return choice;
  }

  adjustMoney(result) {
    switch (result) {
      case 'player':
        this.money += 1;
        break;
      case 'tie':
        break;
      default:
        this.money -= 1;
        break;
    }
  }

  getMoney() {
    return this.money;
  }
}

class Dealer extends Participant {
  constructor() {super()}
}


class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  static BLACKJACK = 21;
  static MAX_DEALER_HIT_SCORE = 17;
  static BROKE = 0;
  static RICH = 10;

  play() {
    this.startGame();

    do {
      this.playSingleRound();
    } while (this.playerHasValidMoney() && this.playAgain());

    this.finalizeGame();
  }

  startGame() {
    console.clear();
    this.displayWelcomeMessage();
    gameflow.acquireValueAndValidate('startGame', this);
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One! You are starting the game with $5.');
  }

  playSingleRound() {
    this.initRound();
    this.playerTurn();
    this.dealerTurn();
    this.finalizeRound();
  }

  initRound() {
    console.clear();
    this.deck.init();
    this.deck.shuffle();
    this.player.clearHand();
    this.dealer.clearHand();
    this.deck.dealHand(this.player);
    this.deck.dealHand(this.dealer);
  }

  playerTurn() {
    while (this.player.getHandValue() < TwentyOneGame.BLACKJACK) {
      this.displayScore('playerTurn');
      if (this.player.hitOrStay()[0] === 's') break;
      this.deck.dealCard(this.player);
    }
  }

  dealerTurn() {
    if (this.player.getHandValue() <= TwentyOneGame.BLACKJACK) {
      while (this.dealer.getHandValue() < TwentyOneGame.MAX_DEALER_HIT_SCORE) {
        this.deck.dealCard(this.dealer);
      }
    }
  }

  displayScore(condition) {
    let playerTurnClause = `${this.dealer.hand[0]} and unknown card.`;
    let finalScoreClause = `${gameflow.joinOr(this.dealer.hand, ',', 'and')} (${this.dealer.getHandValue()}).`;
    console.log(`You ${condition === 'playerTurn' ? 'have' : 'ended with'}: ${gameflow.joinOr(this.player.hand, ',', 'and')} (${this.player.getHandValue()}).`);
    console.log(`Dealer ${condition === 'playerTurn' ? 'has' : 'ended with'}: ${condition === 'playerTurn' ? playerTurnClause : finalScoreClause}\n`);
  }

  finalizeRound() {
    let result = this.determineResult();
    this.player.adjustMoney(result);
    this.displayScore('finalScore');
    this.displayResult(result);
  }

  determineResult() {
    let playerScore = this.player.getHandValue();
    let dealerScore = this.dealer.getHandValue();
    let diff = Math.sign(playerScore - dealerScore);
    if (playerScore > TwentyOneGame.BLACKJACK) {
      return 'bust';
    } else if (dealerScore > TwentyOneGame.BLACKJACK) {
      return 'player';
    } else switch (diff) {
      case 1:
        return 'player';
      case 0:
        return 'tie';
      case -1:
        return 'dealer';
    }
  }

  displayResult(result) {
    switch (result) {
      case 'player':
        console.log('You win! You have won a dollar.');
        break;
      case 'tie':
        console.log('You tied with the dealer- your money remains unchanged.');
        break;
      case 'dealer':
        console.log('Dealer wins- you have lost a dollar.');
        break;
      case 'bust':
        console.log('You busted- you have lost a dollar.');
        break;
    }
    console.log(`You now have ${this.player.getMoney()} dollars.\n`);
  }

  playerHasValidMoney() {
    return this.player.money > TwentyOneGame.BROKE &&
      this.player.money < TwentyOneGame.RICH;
  }

  playAgain() {
    let choice = gameflow.acquireValueAndValidate('playAgain', this);
    return choice[0] === 'y';
  }

  finalizeGame() {
    this.displayFinalMoney();
    this.displayGoodbyeMessage();
  }

  displayFinalMoney() {
    if (this.player.getMoney() === TwentyOneGame.BROKE) {
      console.log('Oh no- you went broke! Better luck next time.');
    } else if (this.player.getMoney() === TwentyOneGame.RICH) {
      console.log('Wow- you bankrupted the casino!\n' +
      'Hey, why are those guys in suits walking towards you really quickly?');
    } else console.log(`You ended with ${this.player.getMoney()} dollars.`);
  }

  displayGoodbyeMessage() {
    console.log('\nThanks for playing Twenty-One. Bye!');
  }
}

let game = new TwentyOneGame();
game.play();