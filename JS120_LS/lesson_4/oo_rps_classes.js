const readline = require('readline-sync');

const gameflow = {
  USER_QUERIES: {
    seriesLength: {query: 'Would you like to play one game or a best of 5 series? Type 1 for one game or 5 for best of 5.',
      choices: ['1', '5']},
    userChoice: {query: `Choose r/rock, p/paper, sc/scissors, l/lizard, or sp/spock.`,
      choices: ['rock', 'paper', 'scissors', 'lizard', 'spock', 'r', 'p', 'sc', 'l', 'sp']},
    playAgain: {query: 'Do you want to play again? (y/n)',
      choices: ['yes', 'no', 'y', 'n']},
    nextGame: {query: 'Press ENTER to continue.', choices: ['']}
  },

  prompt(message) {
    console.log(`=> ${message}`);
  },

  acquireValueAndValidate(inputType) {
    this.prompt(this.USER_QUERIES[inputType].query);
    let choice = readline.question().trim().toLowerCase();

    while (!this.USER_QUERIES[inputType].choices.includes(choice)) {
      this.prompt ("Invalid choice entered- please choose again.");
      choice = readline.question().trim().toLowerCase();
    }

    if (inputType === 'userChoice' && choice.length <= 2) {
      choice = this.USER_QUERIES[inputType].
        choices[(this.USER_QUERIES[inputType].choices.indexOf(choice) - 5)];
    }
    return choice;
  }
};

class Player {
  constructor() {
    this.move = null;
    this.moveHistory = [];
  }
}

class Computer extends Player {
  constructor() {super()}

  choose(context) {
    let humanMoves = context.human.moveHistory;
    let memoryLength = 5;
    let moveWeight = 1;
    let recentMoves = (humanMoves.length >= memoryLength) ?
      humanMoves.slice(humanMoves.length - memoryLength) : humanMoves.slice();
    let moveScoreObject = {rock: 1, paper: 1, scissors: 1, lizard: 1, spock: 1};
    recentMoves.forEach(move => {
      RPSGame.losingCombos[move].forEach(counterMove => {
        moveScoreObject[counterMove] += moveWeight;
      });
    });
    let maxScore = Math.max(...Object.values(moveScoreObject));
    let possibleMoves = Object.keys(moveScoreObject).filter(key => {
      return moveScoreObject[key] === maxScore;
    });
    this.move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    this.moveHistory.push(this.move);
  }
}

class Human extends Player {
  constructor() {super()}
  choose() {
    this.move = gameflow.acquireValueAndValidate('userChoice');
    this.moveHistory.push(this.move);
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.scoreboard = [0,0,0];
  }

  static maxWins = 5;
  static playerWin = 0;
  static computerWin = 1;
  static tie = 2;
  static winningCombos = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
  }
  static losingCombos = {
    rock: ['paper', 'spock'],
    paper: ['scissors', 'lizard'],
    scissors: ['rock', 'spock'],
    lizard: ['scissors', 'rock'],
    spock: ['lizard', 'paper']
  }

  askForSeriesLength() {
    return gameflow.acquireValueAndValidate('seriesLength');
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!");
  }

  updateScoreCount() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let scoreboardIndex;

    if (RPSGame.winningCombos[humanMove].includes(computerMove)) {
      scoreboardIndex = RPSGame.playerWin;
    } else if (humanMove === computerMove) {
      scoreboardIndex = RPSGame.tie;
    } else scoreboardIndex = RPSGame.computerWin;

    this.scoreboard[scoreboardIndex] += 1;
  }

  displayGameWinner() {
    console.log(`You chose: ${this.human.move}.`);
    console.log(`The computer chose: ${this.computer.move}.`);
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (RPSGame.winningCombos[humanMove].includes(computerMove)) {
      console.log('You win!');
    } else if (humanMove === computerMove) {
      console.log("It's a tie.");
    } else {
      console.log("Computer wins!");
    }
  }

  displaySeriesWinner() {
    if (this.scoreboard[0] === RPSGame.maxWins) {
      console.log('You win the series!');
    } else if (this.scoreboard[1] === RPSGame.maxWins) {
      console.log('Computer wins the series.');
    }
  }

  displayScoreBoard() {
    console.log('');
    gameflow.prompt('Current scoreboard:');
    console.log('                      ');
    console.log('  Player1 | Computer | Draw');
    console.log(' _________|__________|_______');
    console.log(`     ${this.scoreboard[0]}    |    ${this.scoreboard[1]}     |   ${this.scoreboard[2]}`);
    console.log('');
  }

  getHumanSortedMoves() {
    let humanMoveHistory = {rock: 0,
      paper: 0, scissors: 0, lizard: 0, spock: 0};
    this.human.moveHistory.forEach(move => {
      humanMoveHistory[move] += 1;
    });
    let humanSortedMoves = Object.keys(humanMoveHistory).sort((a, b) => {
      return humanMoveHistory[b] - humanMoveHistory[a];
    });
    return [humanMoveHistory, humanSortedMoves];
  }

  getComputerSortedMoves() {
    let computerMoveHistory = {rock: 0,
      paper: 0, scissors: 0, lizard: 0, spock: 0};
    this.computer.moveHistory.forEach(move => {
      computerMoveHistory[move] += 1;
    });
    let computerSortedMoves = Object.keys(computerMoveHistory).sort((a, b) => {
      return computerMoveHistory[b] - computerMoveHistory[a];
    });
    return [computerMoveHistory, computerSortedMoves];
  }

  displayMoveHistory() {
    let [humanMoveHistory, humanSortedMoves] = this.getHumanSortedMoves();
    let [computerMoveHistory, computerSortedMoves] = this.getComputerSortedMoves();
    console.log('');
    console.log('         Move History         ');
    console.log('');
    console.log('   Human            Computer');
    console.log('--------------    --------------');
    console.log('  Move    | #       Move    | #');
    console.log('----------|---    ----------|---');
    for (let idx = 0; idx < humanSortedMoves.length; idx += 1) {
      let humanSpaces = 9 - humanSortedMoves[idx].length;
      let computerSpaces = 9 - computerSortedMoves[idx].length;
      console.log(` ${humanSortedMoves[idx]}${' '.repeat(humanSpaces)}| ${humanMoveHistory[humanSortedMoves[idx]]}     ` +
        ` ${computerSortedMoves[idx]}${' '.repeat(computerSpaces)}| ${computerMoveHistory[computerSortedMoves[idx]]}`);
      console.log('----------|---    ----------|---');
    }
    console.log('');
  }

  playAgain() {
    return gameflow.acquireValueAndValidate('playAgain')[0] === 'y';
  }

  playSingleGame() {
    console.clear();
    this.human.choose();
    this.computer.choose(this);
    this.displayGameWinner();
  }

  playSeries() {
    while (this.scoreboard.slice(0,2).every(number => number < RPSGame.maxWins)) {
      console.clear();
      this.human.choose();
      this.computer.choose(this);
      this.updateScoreCount();
      this.displayGameWinner();
      this.displayScoreBoard();
      gameflow.acquireValueAndValidate('nextGame');
    }
    this.displaySeriesWinner();
    this.scoreboard = [0,0,0];
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      if (this.askForSeriesLength() === '1') {
        this.playSingleGame();
      } else {
        this.playSeries();
      }
      this.displayMoveHistory();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
}

let game = new RPSGame();

game.play();