// // Welcome Stranger

// function greetings(array, object) {
//   return 'Hello, ' + array.join(' ') + '! Nice to have a ' + 
//   object.title + ' ' + object.occupation + ' around.'
// }

// console.log(
//   greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
// );

// // Greeting a user

// const readline = require("readline-sync");

// function greeting() {
//   let name = readline.question('What is your name? ');
//   if (name.includes('!')) {
//     console.log(`HELLO ${name.toUpperCase().replace('!', '')}. WHY ARE WE SCREAMING?`)
//   } else console.log(`Hello ${name}.`)
// }

// greeting()

// // Mulitplying Two Numbers 

// function multiply (number1, number2) {
//   return number1*number2;
// }

// console.log(multiply(5,3) === 15);

// //Squaring an argument

// function multiply (number1, number2) {
//   return number1*number2;
// }

// function square(number) {
//   return multiply(number, number);
// }

// console.log(square(5) === 25); // logs true
// console.log(square(-8) === 64); // logs true

// // Arithmetic Integer

// const readline = require('readline-sync');

// function integerOperations() {
//   let number1 = readline.question('Enter the first number: ')
//   let number2 = readline.question('Enter the second number: ')
//   number1 = parseInt(number1)
//   number2 = parseInt(number2)
//   let operations = ['+', '-', '*', '/', '%', '**'];
//   for (let i = 0; i < operations.length; i += 1){
//     let newString = `${number1} ${operations[i]} ${number2}`
//     console.log(`${newString} = ${Math.floor(eval(newString))}`)
//   }
// }

// integerOperations();

// // The End Is Near But Not Here

// function penultimate (string) {
//   return string.split(' ')[string.split(' ').length-2]
// }

// console.log(penultimate("last word") === "last"); // logs true
// console.log(penultimate("Launch School is great!") === "is"); // logs true

// // Exclusive or

// function xor(input1, input2) {
//   return ((input1 || input2) && !(input1 && input2));
// }


// console.log(xor(5, 0) === true);
// console.log(xor(false, true) === true);
// console.log(xor(1, 1) === false);
// console.log(xor(true, true) === false);

// // Odd lists

// function oddities (list) {
//   return list.filter((value, index) => index % 2 === 0);
// }

// console.log(oddities([2, 3, 4, 5, 6])); // logs [2, 4, 6]
// console.log(oddities([1, 2, 3, 4, 5, 6])); // logs [1, 3, 5]
// console.log(oddities(["abc", "def"])); // logs ['abc']
// console.log(oddities([123])); // logs [123]
// console.log(oddities([])); // logs []

// //Convert a string to a number!

// function stringToInteger(string) {
//   let numbers = [0,1,2,3,4,5,6,7,8,9]
//   let arrayOfNumbers = string.split('').map(character => numbers[character]);
//   let sum = 0;
//   arrayOfNumbers.map((number, index) => sum = sum + number * 10 ** (arrayOfNumbers.length - 1 - index));
//   return sum;
// }

// console.log(stringToInteger('12345'));
// console.log(stringToInteger('1234567'));

// // Convert a string to a signed number! 

// function stringToSignedInteger(string) {
//   let sign = '+';
//   if (['+', '-'].includes(string[0])) {
//     sign = string[0];
//     string = string.slice(1);
//   }
//   let number = stringToInteger(string);
//   return (sign === '+') ? number : number * -1;
// }

// console.log(stringToSignedInteger("4321") === 4321); // logs true
// console.log(stringToSignedInteger("-570") === -570); // logs true
// console.log(stringToSignedInteger("+100") === 100); // logs true

// // Convert a number to a String!

// function integerToString(integer) {
//   if (integer === 0) return '0';
//   let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
//   let numberStringArray = [];
//   while (integer > 0) {
//     digitCounter = 0;
//     while (integer % 10 !== 0) {
//       integer -= 1;
//       digitCounter += 1;
//     }
//     numberStringArray.push(numbers[digitCounter]);
//     integer = integer / 10;
//   }
//   return numberStringArray.reverse().join('');
// }


// console.log(integerToString(4321));        // "4321"
// console.log(integerToString(0));           // "0"
// console.log(integerToString(5000));        // "5000"
// console.log(integerToString(1234567890));  // "1234567890"

// an implementation that isn't quite so stupid

function integerToString(integer) {
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let stringArray = [];
  do {
    let digit = integer % 10;
    stringArray.push(numbers[digit]);
    integer = Math.floor(integer/10);
  } while (integer > 0);
  return stringArray.reverse().join('');
}

console.log(integerToString(4321));        // "4321"
console.log(integerToString(0));           // "0"
console.log(integerToString(5000));        // "5000"
console.log(integerToString(1234567890));  // "1234567890"

// Convert a signed number to a string!

function signedIntegerToString(number) {
  switch (Math.sign(number)) {
    case 1:
      return "+".concat(integerToString(number));
    case -1:
      return "-".concat(integerToString(-number));
    default: 
      return '0';
  }
}

debugger;
console.log(signedIntegerToString(4321) === "+4321");
console.log(signedIntegerToString(-123) === "-123");
console.log(signedIntegerToString(0) === "0");

console.log(signedIntegerToString(4321));