// Ask the user for the first number
// Ask the user for the second number
// Ask the user for an operation to perform
// Perform the operation on the two numbers
// Print the result to the terminal

const readline = require("readline-sync");
const messages = require('./calculator_messages.json');
let calculate = '1';


while (calculate === '1') {
  prompt(messages.greeting);
  prompt(messages.firstNumber);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages.invalidNumber);
    number1 = readline.question();
  }

  prompt(messages.secondNumber);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages.invalidNumber);
    number2 = readline.question();
  }

  prompt(messages.askForOperation);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages.wrongOperation);
    operation = readline.question();
  }

  number1 = Number(number1);
  number2 = Number(number2);

  let output;
  switch (operation) {
    case '1':
      output = number1 + number2;
      break;
    case '2':
      output = number1 - number2;
      break;
    case '3':
      output = number1 * number2;
      break;
    case '4':
      output = number1 / number2;
      break;
  }

  prompt(`The result is: ${output}`);
  prompt(messages.askForAnother)
  calculate = readline.question();
  while (!['1', '2'].includes(calculate)) {
    prompt(messages.incorrectAnother)
    calculate = readline.question();
  }
}

prompt('Goodbye!')

function invalidNumber (number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function prompt (message) {
  console.log(`=> ${message}`);
}