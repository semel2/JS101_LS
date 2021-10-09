const readline = require('readline-sync');

const gameflow = {

  getQuery(valueType, context) {
    switch(valueType) {
      case 'playAgain':
        return "Would you like to play again? (y/n)";
      case 'playerMakesMove': 
        return `Choose a square (${this.joinOr(context.board.unusedSquares())}): `
    }
  },

  getValidChoices(valueType, context) {
    switch(valueType) {
      case 'playAgain':
        return ['yes', 'no', 'y', 'n'];
      case 'playerMakesMove':
        return context.board.unusedSquares();
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
    while(true) {
      console.log(this.getQuery(valueType, context));
      choice = readline.question().trim().toLowerCase();

      if (this.getValidChoices(valueType, context).includes(choice)) break;
      console.log("Sorry, that's not a valid choice.")
    }
    return choice;
  }
}

class Square {
  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let idx = 1; idx <= 9; idx += 1) {
      this.squares[idx] = new Square();
    }
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  |  ${this.squares[3]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  |  ${this.squares[6]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  |  ${this.squares[9]}`);
    console.log("     |     |");
    console.log("");
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }

  reset() {
    for (let idx = 1; idx <= 9; idx += 1) {
      this.squares[idx].setMarker(Square.UNUSED_SQUARE);
    }
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }

  move(context) {
    let choice = gameflow.acquireValueAndValidate('playerMakesMove', context);
    context.board.markSquareAt(choice, this.getMarker());
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }

  getCrucialMove(moveType, currentRow, context) {
    let markerType = (moveType === 'offense') ? Square.COMPUTER_MARKER : Square.HUMAN_MARKER;
    let currentRowMarkers = currentRow.map(squareIndex => context.board.squares[squareIndex].getMarker());
    if (currentRowMarkers.indexOf(Square.UNUSED_SQUARE) !== -1) {
      if (currentRowMarkers.filter(marker => marker === markerType).length === 2) {
        return true;
      }
    }
    return false; 
  }

  move(context) {
    let validChoices = context.board.unusedSquares();
    let choice;

    for (let idx = 0; idx < TTTGame.POSSIBLE_WINNING_ROWS.length; idx += 1) {
      debugger;
      let currentRow = TTTGame.POSSIBLE_WINNING_ROWS[idx];
      if (this.getCrucialMove('offense', currentRow, context) === true) {
        choice = currentRow.map(squareIndex => context.board.squares[squareIndex].getMarker() === Square.UNUSED_SQUARE)[0];
        break;
      }
      else if (this.getCrucialMove('defense', currentRow, context) === true) {
        choice = currentRow.map(squareIndex => context.board.squares[squareIndex].getMarker() === Square.UNUSED_SQUARE)[0];
      }
    };

    if (choice === undefined) {
      if (validChoices.includes('5')) {
        choice = '5'; 
      } else {
      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
      }
    }
    debugger;
    context.board.markSquareAt(choice, this.getMarker());
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }


  static POSSIBLE_WINNING_ROWS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  play() {
    console.clear();
    this.displayWelcomeMessage();
    do {
      this.playSingleGame();
    } while (gameflow.acquireValueAndValidate('playAgain')[0] === 'y');

    this.displayGoodbyeMessage();
  }

  playSingleGame() {
    this.board.reset();
    let currentPlayer = 'human';
    while(true) {
      this.board.display();
      this.playerMakesMove(currentPlayer);
      if (this.gameOver()) break;
      currentPlayer = this.switchPlayer(currentPlayer);
      console.clear();
    }

    this.displayResults();
  }

  displayWelcomeMessage() {
    console.log('Welcome to tic-tac-toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing tic-tac-toe! Goodbye!');
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("Player wins!");
    } else if (this.isWinner(this.computer)) {
      console.log("Computer wins.");
    } else console.log("Tie game.");
  }

  playerMakesMove(player) {
    this[player].move(this);
  }

  switchPlayer(player) {
    return (player === 'human') ? 'computer' : 'human';
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();

game.board.markSquareAt(1, Square.HUMAN_MARKER);
game.board.markSquareAt(2, Square.COMPUTER_MARKER);
game.board.markSquareAt(3, Square.HUMAN_MARKER);
game.board.markSquareAt(5, Square.COMPUTER_MARKER);
game.board.markSquareAt(7, Square.COMPUTER_MARKER);
game.board.markSquareAt(8, Square.HUMAN_MARKER);
game.board.markSquareAt(9, Square.HUMAN_MARKER);

game.board.display();

game.computer.move(game)