const readline = require("readline-sync");
const INIT_VALUE = ' ';
const PLAYER1_CHOICE = 'X';
const COMPUTER_CHOICE = 'O';
const GAME_ONGOING = 0;
const PLAYER1_WIN = 1;
const COMPUTER_WIN = 2;
const DRAW = 3;
const BOARD_LENGTH = 9;
const CRUCIAL_MOVE = 2;
const WINNING_ROW = 3;
const MIDDLE_SQUARE = 4;
const PLAYERS = ["computer", "player1"];
let MASTER_KEY = {
  boardSelection: {query: "Choose a position to mark.",
    choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9']},
  playAgain: {query: "Do you want to play again? (y/n)",
    choices: ['yes', 'no', 'y', 'n']}
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayBoard(board) {
  console.log('');
  console.log(`     |     |`);
  console.log(`  ${board[0]}  |  ${board[1]}  |  ${board[2]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[3]}  |  ${board[4]}  |  ${board[5]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[6]}  |  ${board[7]}  |  ${board[8]}`);
  console.log('     |     |');
  console.log('');
}

function getAllLines() {
  let linePositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return linePositions;
}

function getUserSelectionAndValidate(validationType) {
  prompt(MASTER_KEY[validationType].query);
  let outputValue = readline.question().trim().toLowerCase();

  while (!MASTER_KEY[validationType].choices.includes(outputValue)) {
    prompt("Invalid choice entered- please select again.");
    outputValue = readline.question().trim();
  }
  return outputValue;
}

function makePlayer1Move(board) {
  let tempBoard = board.map((position, index) => {
    if (position === ' ') position = index + 1;
    return position;
  });

  displayBoard(tempBoard);
  let selection = getUserSelectionAndValidate('boardSelection');
  board[Number(selection) - 1] = PLAYER1_CHOICE;
}

function getLineCondition(currentLine, lineCondition, playerChoice) {
  return currentLine.filter(square => {
    return square === playerChoice;
  }).length === lineCondition;
}

function findCrucialComputerMove(board) {
  let computerSelection = (board[MIDDLE_SQUARE] === INIT_VALUE) ? MIDDLE_SQUARE : -1;
  let linePositions = getAllLines();

  for (let line = 0; line < linePositions.length; line += 1) {
    let currentLine = linePositions[line].map(number => board[number]);
    if (currentLine.indexOf(INIT_VALUE) !== -1) {
      if (getLineCondition(currentLine, CRUCIAL_MOVE, PLAYER1_CHOICE)) {
        computerSelection = linePositions[line][currentLine.indexOf(INIT_VALUE)];
      } else if (getLineCondition(currentLine, CRUCIAL_MOVE, COMPUTER_CHOICE)) {
        computerSelection = linePositions[line][currentLine.indexOf(INIT_VALUE)];
        break;
      }
    }
  }

  let crucialMoveFound = (computerSelection === -1) ? 0 : 1;
  return [crucialMoveFound, computerSelection];
}

function makeComputerMove(board) {
  let [crucialMoveFound, computerSelection] = findCrucialComputerMove(board);

  if (crucialMoveFound === 0) {
    let emptyIndexes = board.map((value, index) => {
      return (value === INIT_VALUE) ? index : '';
    }).filter(value => value !== '');
    computerSelection = emptyIndexes[
      Math.floor(Math.random() * emptyIndexes.length)];
  }

  board[computerSelection] = COMPUTER_CHOICE;
  prompt(`The computer placed an O at position ${computerSelection + 1}.`);
}

function playerChoosesSquare(board, player) {
  if (player === 'player1') {
    makePlayer1Move(board);
  } else {
    makeComputerMove(board);
  }
}

function alternatePlayer(player) {
  player = PLAYERS.filter(selection => selection !== player)[0];
  return player;
}

function updateValidUserChoices(board) {
  MASTER_KEY.boardSelection.choices = board.map((value, index) => {
    return (value === ' ') ? String(index + 1) : '';
  }).filter(value => value !== '');
}

function checkForWinOrDraw(board) {
  let gameStatus = GAME_ONGOING;
  let linePositions = getAllLines();

  for (let line = 0; line < linePositions.length; line += 1) {
    let currentLine = linePositions[line].map(number => board[number]);
    if (getLineCondition(currentLine, WINNING_ROW, PLAYER1_CHOICE)) {
      gameStatus = PLAYER1_WIN;
    } else if (getLineCondition(currentLine, WINNING_ROW, COMPUTER_CHOICE)) {
      gameStatus = COMPUTER_WIN;
    }
  }

  if (gameStatus === GAME_ONGOING && board.indexOf(' ') === -1) {
    gameStatus = DRAW;
  }

  return gameStatus;
}

function updateWinCount(gameStatus, winCount) {
  winCount[gameStatus - 1] += 1;
  return winCount;
}

function displayGameStatusAndWinCount(gameStatus, winCount) {
  switch (gameStatus) {
    case PLAYER1_WIN:
      prompt('You win!');
      break;
    case COMPUTER_WIN:
      prompt('Computer wins.');
      break;
    case DRAW:
      prompt("It's a tie.");
      break;
  }
  prompt('Current scoreboard:');
  console.log('                      ');
  console.log('  Player1 | Computer | Draw');
  console.log(' _________|__________|_______');
  console.log(`     ${winCount[0]}    |    ${winCount[1]}     |   ${winCount[2]}`);
}

function initializeGameVariables() {
  let board = Array(BOARD_LENGTH).fill(INIT_VALUE);
  let gameStatus = GAME_ONGOING;
  let player = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
  return [board, gameStatus, player];
}


console.clear();
let winCount = [0,0,0];
prompt("Welcome to tic-tac-toe!");
prompt("Your marker is X and the computer's marker is O.");
do {
  let [board, gameStatus, player] = initializeGameVariables();
  if (winCount.some(Number)) console.clear();
  prompt(`${player} goes first.`);

  while (gameStatus === GAME_ONGOING) {
    updateValidUserChoices(board);
    playerChoosesSquare(board, player);
    gameStatus = checkForWinOrDraw(board);
    if (player === 'player1' && gameStatus === GAME_ONGOING) console.clear();
    player = alternatePlayer(player);
  }

  winCount = updateWinCount(gameStatus, winCount);
  displayGameStatusAndWinCount(gameStatus, winCount);

} while (getUserSelectionAndValidate('playAgain')[0] === 'y');

prompt("Thanks for playing tic-tac-toe. Bye!");