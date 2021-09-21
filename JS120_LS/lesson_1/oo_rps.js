const readline = require('readline-sync');
const USER_QUERIES = {
  seriesLength: {query: 'Would you like to play one game or a best of 5 series? Type 1 for one game or 5 for best of 5.',
    choices: ['1', '5']},
  userChoice: {query: `Choose r/rock, p/paper, sc/scissors, l/lizard, or sp/spock.`,
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock', 'r', 'p', 'sc', 'l', 'sp']},
  playAgain: {query: 'Do you want to play again? (y/n)',
    choices: ['yes', 'no', 'y', 'n']},
  nextGame: {query: 'Press ENTER to continue.', choices: ['']}
};

function prompt (message) {
  console.log(`=> ${message}`);
}

function acquireValueAndValidate (inputType) {
  prompt(USER_QUERIES[inputType].query);
  let choice = readline.question().trim().toLowerCase();

  while (!USER_QUERIES[inputType].choices.includes(choice)) {
    prompt ("Invalid choice entered- please choose again.");
    choice = readline.question().trim().toLowerCase();
  }

  if (inputType === 'userChoice' && choice.length <= 2) {
    choice = USER_QUERIES[inputType].
      choices[(USER_QUERIES[inputType].choices.indexOf(choice) - 5)];
  }
  return choice;
}

function createPlayer() {
  return {
    move: null,
    moveHistory: []
  }
}

function createComputer() {
  let computerObject = createPlayer();
  computerObject.choose = function() {
    let humanMoves = RPSGame.human.moveHistory;
    let memoryLength = 5;
    let moveWeight = 1;
    let recentMoves = humanMoves.length >= memoryLength ? humanMoves.slice(humanMoves.length - memoryLength) : humanMoves.slice();
    let moveScoreObject = {rock: 1, paper: 1, scissors: 1, lizard: 1, spock: 1}
    recentMoves.forEach(move => {
      RPSGame.losingCombos[move].forEach(counterMove => moveScoreObject[counterMove] += moveWeight);
    });
    let maxScore = Math.max(...Object.values(moveScoreObject));
    let possibleMoves = Object.keys(moveScoreObject).filter(key => moveScoreObject[key] === maxScore);
    this.move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    this.moveHistory.push(this.move);
  };
  return computerObject;
}

function createHuman() {
  let humanObject = createPlayer();
  humanObject.choose = function() {
    this.move = acquireValueAndValidate('userChoice');
    this.moveHistory.push(this.move);
  }
  return humanObject;
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  maxWins: 5,
  playerWin: 0,
  computerWin: 1,
  tie: 2,
  scoreboard : [0,0,0],
  winningCombos: {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
  },
  losingCombos: {
    rock: ['paper', 'spock'],
    paper: ['scissors', 'lizard'],
    scissors: ['rock', 'spock'],
    lizard: ['scissors', 'rock'],
    spock: ['lizard', 'paper']
  },

  askForSeriesLength() {
    return acquireValueAndValidate('seriesLength');
  },

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to Rock, Paper, Scissors, Lizard, Spock!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!");
  },

  updateScoreCount() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    let scoreboardIndex;

    if (this.winningCombos[humanMove].includes(computerMove)) {
      scoreboardIndex = this.playerWin;
    } else if (humanMove === computerMove) {
      scoreboardIndex = this.tie;
    } else scoreboardIndex = this.computerWin;

    this.scoreboard[scoreboardIndex] += 1;
  },

  displayGameWinner() {
    console.log(`You chose: ${this.human.move}.`);
    console.log(`The computer chose: ${this.computer.move}.`);
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (this.winningCombos[humanMove].includes(computerMove)) {
      console.log('You win!');
    } else if (humanMove === computerMove) {
      console.log("It's a tie.");
    } else {
      console.log("Computer wins!");
    }
  },

  displaySeriesWinner() {
    if (this.scoreboard[0] === this.maxWins) {
      console.log('You win the series!');
    } else if (this.scoreboard[1] === this.maxWins) {
      console.log('Computer wins the series.');
    };
  },

  displayScoreBoard() {
    console.log('')
    prompt('Current scoreboard:');
    console.log('                      ');
    console.log('  Player1 | Computer | Draw');
    console.log(' _________|__________|_______');
    console.log(`     ${this.scoreboard[0]}    |    ${this.scoreboard[1]}     |   ${this.scoreboard[2]}`);
    console.log('')
  },

  displayMoveHistory() {
    let humanMoveHistory = {rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0};
    let computerMoveHistory = {rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0};
    this.human.moveHistory.forEach(move => {
      humanMoveHistory[move] += 1;
    });
    this.computer.moveHistory.forEach(move => {
      computerMoveHistory[move] += 1;
    });
    let humanSortedMoves = Object.keys(humanMoveHistory).sort((a, b) => humanMoveHistory[b] - humanMoveHistory[a]);
    let computerSortedMoves = Object.keys(computerMoveHistory).sort((a, b) => computerMoveHistory[b] - computerMoveHistory[a]);
    console.log('')
    console.log('         Move History         ')
    console.log('')
    console.log('   Human            Computer')
    console.log('--------------    --------------')
    console.log('  Move    | #       Move    | #')
    console.log('----------|---    ----------|---')
    for (let i = 0; i < humanSortedMoves.length; i += 1) {
      let humanSpaces = 9 - humanSortedMoves[i].length;
      let computerSpaces = 9 - computerSortedMoves[i].length;
      console.log(` ${humanSortedMoves[i]}${' '.repeat(humanSpaces)}| ${humanMoveHistory[humanSortedMoves[i]]}     ` + 
        ` ${computerSortedMoves[i]}${' '.repeat(computerSpaces)}| ${humanMoveHistory[humanSortedMoves[i]]}`);
      console.log('----------|---    ----------|---')
    };
    console.log('');
  },

  playAgain() {
    return acquireValueAndValidate('playAgain')[0] === 'y';
  },

  playSingleGame() {
    console.clear();
    this.human.choose();
    this.computer.choose();
    this.displayGameWinner();
  },

  playSeries() {
    while (this.scoreboard.slice(0,2).every(number => number < this.maxWins)) {
      console.clear();
      this.human.choose();
      this.computer.choose();
      this.updateScoreCount();
      this.displayGameWinner();
      this.displayScoreBoard();
      _ = acquireValueAndValidate('nextGame');
    }
    this.displaySeriesWinner();
    this.scoreboard = [0,0,0];
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.askForSeriesLength() === '1' ? this.playSingleGame() : this.playSeries();
      this.displayMoveHistory();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
};


RPSGame.play();