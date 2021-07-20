const readline = require('readline-sync');
const VALID_COMPUTER_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
let play = 'y';

const MASTER_KEY = {
  seriesLength: {query: 'Would you like to play one game or a best of 5 series? Type 1 for one game or 5 for best of 5.',
    choices: ['1', '5']},
  userChoice: {query: `Choose r/rock, p/paper, sc/scissors, l/lizard, or sp/spock.`,
    choices: ['rock', 'paper', 'scissors', 'lizard', 'spock', 'r', 'p', 'sc', 'l', 'sp']},
  playAgain: {query: 'Do you want to play again? (y/n)',
    choices: ['yes', 'no', 'y', 'n']}
};

const WINNING_COMBOS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['rock', 'scissors']
};

prompt('Welcome to rock, paper, scissors, lizard, spock!')

while (play === 'y') {

  let seriesLength = acquireValueAndValidate('seriesLength');
  let scoreCounter = [0,0];

  while (scoreCounter.every(number => number < 3)) {

    playGame(scoreCounter);
    if (seriesLength === '1') break;

    prompt(`The series score is now: \nYou: ${scoreCounter[0]}\nComputer: ${scoreCounter[1]}\n`);

    if (scoreCounter[0] === 3) {
      prompt('You win the series!');
    } else if (scoreCounter[1] === 3) {
      prompt ('The computer wins the series!');
    }
  }

  play = acquireValueAndValidate('playAgain')[0];
}

prompt('Goodbye!')

function playGame(scoreCounter) {
  let choice = acquireValueAndValidate('userChoice');

  let randomIndex = Math.floor(Math.random() * VALID_COMPUTER_CHOICES.length);
  let computerChoice = VALID_COMPUTER_CHOICES[randomIndex];

  displayWinner(choice, computerChoice, scoreCounter);
}

function displayWinner (choice, computerChoice, scoreCounter) {
  prompt(`You chose ${choice} and the computer chose ${computerChoice}.`);
  if (WINNING_COMBOS[choice].includes(computerChoice)) {
    prompt('You win!\n');
    scoreCounter[0] += 1;
  } else if (choice === computerChoice) {
    prompt("It's a tie.\n");
  } else {
    prompt("Computer wins!\n");
    scoreCounter[1] += 1;
  }
}

function prompt (message) {
  console.log(`=> ${message}`);
}

function acquireValueAndValidate (inputType) {
  prompt(MASTER_KEY[inputType].query);
  let choice = readline.question();

  while (!MASTER_KEY[inputType].choices.includes(choice)) {
    prompt ("Invalid choice entered- please choose again.");
    choice = readline.question();
  }

  if (inputType === 'userChoice' && choice.length <= 2) {
    choice = MASTER_KEY[inputType].
      choices[(MASTER_KEY[inputType].choices.indexOf(choice) - 5)];
  }
  return choice;
}