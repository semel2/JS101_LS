//Enter APR in whole numbers, i.e. 5%
//Enter loan duration in years

const readline = require("readline-sync");
const messages = require("./mortgageCalculatorMessages.json");
let calculate = "y";

prompt(messages.greeting);

while (calculate === "y") {

  let loanAmount = acquireValueAndValidate(
    messages.loanAmountQuery, messages.loanDurationErrorMessage);
  let apr = acquireValueAndValidate(
    messages.aprQuery, messages.aprErrorMessage);
  let loanDurationInYears = acquireValueAndValidate(
    messages.loanDurationQuery, messages.loanDurationErrorMessage, 'loanDuration');

  let monthlyPayment =
  monthlyPaymentCalculator(loanAmount, apr, loanDurationInYears);
  prompt(`Your monthly payment is $${monthlyPayment}.\n`);

  prompt(messages.anotherCalculationQuery);
  calculate = readline.question().trim()[0].toLowerCase();
  while (!['y', 'n'].includes(calculate)) {
    prompt(messages.anotherCalculationErrorMessage);
  }
}

prompt("Goodbye!");


function monthlyPaymentCalculator (loanAmount, apr, loanDurationInYears) {
  let monthlyInterestRate = apr / 12;
  let loanDurationInMonths = loanDurationInYears * 12;
  let monthlyPayment;

  if (monthlyInterestRate === 0) {
    monthlyPayment = loanAmount / loanDurationInMonths;
  } else {
    monthlyPayment = loanAmount *
      ((monthlyInterestRate / 100) /
        (1 - Math.pow((1 + (monthlyInterestRate / 100)),
          (-loanDurationInMonths))));
  }
  return monthlyPayment.toFixed(2);
}

function invalidNumber(number, validationType = 'loanAmountOrAPR') {
  return number.trim === '' || Number.isNaN(Number(number)) ||
    Number(number) < 0 || (number % 1 !== 0 && validationType === 'loanDuration');
}

function prompt (message) {
  console.log(`=> ${message}`);
}

function acquireValueAndValidate(query, errorMessage, validationType) {
  prompt(query);
  let outputValue = readline.question();

  while (invalidNumber(outputValue, validationType)) {
    prompt(errorMessage);
    outputValue = readline.question();
  }
  return Number(outputValue);
}