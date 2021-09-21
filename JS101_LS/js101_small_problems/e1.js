// // Isn't it odd?

// function isOdd(integer) {
//   return Math.abs(integer % 2) === 1;
// }

// console.log(isOdd(2)); // => false
// console.log(isOdd(5)); // => true
// console.log(isOdd(-17)); // => true
// console.log(isOdd(-8)); // => false
// console.log(isOdd(0)); // => false
// console.log(isOdd(7)); // => true

// // Odd numbers

// for (let i = 1; i < 100; i += 2) {
//   console.log(i);
// }

// // Even numbers

// for (let i = 2; i < 100; i += 2) {
//   console.log(i);
// }

// // How big is the room?

// const readline = require("readline-sync");


// function getRoomArea () {
//   console.log('Enter the length of the room in meters:')
//   let length = readline.question();
//   length = parseInt(length, 10)
//   console.log('Enter the width of the room in meters:')
//   let width = readline.question();
//   width = parseInt(width, 10)
//   let area = (length * width).toFixed(2);
//   console.log(`The area of the room is ${area} square meters (${(area*10.7639).toFixed(2)} square feet).`)
// }

// getRoomArea()

// // readline.question() returns a string answer which needs to be parsed for a number


// // Tip calculator

// const readline = require("readline-sync");

// function tipCalculator () {
//   console.log('What is the bill?')
//   let bill = readline.question();
//   bill = parseInt(bill);
//   console.log('What is the tip percentage?')
//   let tipPercentage = readline.question();
//   tipPercentage = parseInt(tipPercentage)*.01;

//   let tip = tipPercentage * bill;

//   console.log(`The tip is $${tip.toFixed(2)}`)
//   console.log(`The total is $${(tip+bill).toFixed(2)}`)
// }

// tipCalculator();

// sum or product of consecutive integers

// const readline = require("readline-sync");

// function sumOrProduct() {
//   let integer = readline.question('Please enter an integer greater than 0: ')
//   integer = parseInt(integer);

//   let operation = readline.question('Enter "s" to compute the sum, or "p" to compute the product.')
//   let returnNumber = 1;
//   if (operation === 's') {
//     for (let i = 2; i <= integer; i+= 1) {
//       returnNumber = returnNumber + i; 
//     }
//     console.log(`The sum of the integers between 1 and ${integer} is ${returnNumber}.`)
//   } else if (operation === 'p') {
//     for (let i = 2; i <= integer; i += 1) {
//       returnNumber = returnNumber * i;
//     }
//     console.log(`The product of the integers between 1 and ${integer} is ${returnNumber}.`)
//   }
// }

// sumOrProduct();

// // Short Long Short

// function shortLongShort(string1, string2) {
//   longString = (string1.length - string2.length > 0) ? string1 : string2;
//   shortString = (longString === string1) ? string2 : string1;
//   return shortString + longString + shortString;
// }

// console.log(shortLongShort('abc', 'defgh'))
// console.log(shortLongShort('abcde', 'fgh'))
// console.log(shortLongShort('', 'xyz'))

// // Leap Years (Part 1)

// function isLeapYear(year) {
//   return (year % 4 === 0) & ((year % 100 !== 0) || (year % 400 === 0))
// }

// // Leap Years (Part 2)

// function isLeapYear(year) {
//   if (year <= 1752) return (year % 4 === 0);
//   else return (year % 4 === 0) & ((year % 100 !== 0) || (year % 400 === 0))
// }

// // Multiples of 3 and 5

// function multisum(integer) {
//   let returnSum = 0;
//   for (let i = 3; i <= integer; i += 1) {
//     if ((i % 3 === 0) || (i % 5 === 0)) {
//       returnSum += i;
//     }
//   }
//   return returnSum;
// } 

// console.log(multisum(3))
// console.log(multisum(5))
// console.log(multisum(10))
// console.log(multisum(1000))

// UTF-16 String Value

function utf16Value(string) {
  numbers = string.split('').map(letter => letter.charCodeAt())
  return numbers.reduce((accumulator, element) => accumulator + element, 0)
}

console.log(utf16Value('Four score'));         // 984
console.log(utf16Value('Launch School'));      // 1251
console.log(utf16Value('a'));                  // 97
console.log(utf16Value(''));                   // 0

// The next three lines demonstrate that the code
// works with non-ASCII characters from the UTF-16
// character set.
const OMEGA = "\u03A9";             // UTF-16 character 'Ω' (omega)
console.log(utf16Value(OMEGA));                  // 937
console.log(utf16Value(OMEGA + OMEGA + OMEGA));  // 2811