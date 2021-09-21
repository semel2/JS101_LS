// // ddaaiillyy ddoouubbllee

// /* Problem: take a string and return a new string that contains
// the value of the original string with all consecutive 
// duplicate characters collapsed into a single character.

// Examples: 

// crunch('ddaaiillyy ddoouubbllee');    // "daily double"
// crunch('4444abcabccba');              // "4abcabcba"
// crunch('ggggggggggggggg');            // "g"
// crunch('a');                          // "a"
// crunch('');                           // ""

// Input: string
// Output: string

// Algorithm:

// declare and initialize returnString to ''
// for each letter in string:
//   check if letter is duplicate of previous letter in returnString
//     if it isn't, add it
//   go to next letter
// return returnString */

// function crunch(string) {
//   let returnString = '';
//   for (let letter = 0; letter < string.length; letter += 1) {
//     if (string[letter] !== returnString[returnString.length - 1]) {
//       returnString = returnString + string[letter];
//     }
//   }
//   return returnString;
// }


// console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
// console.log(crunch('4444abcabccba'));              // "4abcabcba"
// console.log(crunch('ggggggggggggggg'));            // "g"
// console.log(crunch('a'));                          // "a"
// console.log(crunch(''));                           // ""

// // Bannerizer

// function logInBox (string){
//   console.log(`+-${'-'.repeat(string.length)}-+`)
//   console.log(`| ${' '.repeat(string.length)} |`)
//   console.log(`| ${string} |`)
//   console.log(`| ${' '.repeat(string.length)} |`)
//   console.log(`+-${'-'.repeat(string.length)}-+`)
// }

// logInBox('To boldly go where no one has gone before.');
// logInBox('');

// // stringy strings

// function stringy(number) {
//   let returnString = '';
//   for (let i = 0; i < number; i += 1) {
//     returnString = returnString + ((i % 2 === 0) ? '1' : '0');
//   }
//   return returnString;
// } 

// console.log(stringy(6));    // "101010"
// console.log(stringy(9));    // "101010101"
// console.log(stringy(4));    // "1010"
// console.log(stringy(7));    // "1010101"

// //Fibonacci Number Location By Length

// /*Problem: given a number of digits, find the index of the first number in the fibonacci sequence
// that has that number of digits. 

// Examples: 
// findFibonacciIndexByLength(2n) === 7n;    // 1 1 2 3 5 8 13
// findFibonacciIndexByLength(3n) === 12n;   // 1 1 2 3 5 8 13 21 34 55 89 144
// findFibonacciIndexByLength(10n) === 45n;
// findFibonacciIndexByLength(16n) === 74n;
// findFibonacciIndexByLength(100n) === 476n;
// findFibonacciIndexByLength(1000n) === 4782n;
// findFibonacciIndexByLength(10000n) === 47847n;

// Input: bigInt
// output: bigInt

// Algorithm: 
// first, create a fibonacci number calculator (maybe steal the one from the prep course?) but do it with bigInts
// set fibonacciIndex = 0
// while (fibonacci(fibonacciIndex)/(10**(numberOfDigits-1)) < 1)  
//   fibonacciIndex += 1n

// return fibonacciIndex */

// function fibonacci(index) {
//   if (index < 2n) return index;
//   return fibonacci(index - 1n) + fibonacci(index - 2n);
// }

// function findFibonacciIndexByLength(digits) {
//   let fibonacciIndex = 0n;
//   while (fibonacci(fibonacciIndex)/(10n ** (digits - 1n)) < 1n) {
//     fibonacciIndex += 1n;
//   }
//   return fibonacciIndex;
// }

// console.log(findFibonacciIndexByLength(2n));
// console.log(findFibonacciIndexByLength(3n));
// console.log(findFibonacciIndexByLength(10n)) === 45n;
// console.log(findFibonacciIndexByLength(16n)) === 74n;
// console.log(findFibonacciIndexByLength(100n)) === 476n;
// console.log(findFibonacciIndexByLength(1000n)) === 4782n;
// console.log(findFibonacciIndexByLength(10000n)) === 47847n;

// //the above probably works but it's really inefficient and takes a really long time to run since you're running another fibonacci every time you increment

// function findFibonacciIndexByLength(digits) {
//   let first = 1n;
//   let second = 1n;
//   let count = 2n;
//   let fibonacci;

//   do {
//     count += 1n;
//     fibonacci = first + second;
//     first = second;
//     second = fibonacci;
//   } while (String(fibonacci).length < digits);

//   return count;
// }

// console.log(findFibonacciIndexByLength(2n));
// console.log(findFibonacciIndexByLength(3n));
// console.log(findFibonacciIndexByLength(10n)) === 45n;
// console.log(findFibonacciIndexByLength(16n)) === 74n;
// console.log(findFibonacciIndexByLength(100n)) === 476n;
// console.log(findFibonacciIndexByLength(1000n)) === 4782n;
// console.log(findFibonacciIndexByLength(10000n)) === 47847n

// // Right Triangles

// function triangle(number) {
//   for (let i = 0; i <= number; i += 1) {
//     console.log(' '.repeat(number - i) + '*'.repeat(i))
//   }
// }

// triangle(5);
// triangle(10);

//Madlibs

// //Double doubles

// function twice(number) {
//   if (Math.floor(Math.log10(number)) % 2 === 0) {
//     return number * 2;
//   } else {
//     numberString = String(number);
//     let numberStringLength = numberString.length;
//     if (numberString.slice(0, numberStringLength/2) === numberString.slice(numberStringLength/2)) {
//       return number;
//     } else return number * 2;
//   }
// }  

// console.log(twice(37));          // 74
// console.log(twice(44));          // 44
// console.log(twice(334433));      // 668866
// console.log(twice(444));         // 888
// console.log(twice(107));         // 214
// console.log(twice(103103));      // 103103
// console.log(twice(3333));        // 3333
// console.log(twice(7676));        // 7676

// // Grade book

// function getGrade(number1, number2, number3) {
//   let average = (number1 + number2 + number3) / 3;
//   let roundedDownAverage = Math.floor(average/10) * 10;
//   switch (roundedDownAverage) {
//     case 90:
//       return 'A';
//     case 80:
//       return 'B';
//     case 70:
//       return 'C';
//     case 60:
//       return 'D';
//     case 50:
//     case 40:
//     case 30:
//     case 20:
//     case 10: 
//     case 0:
//       return 'F';
//   }
// }

// console.log(getGrade(95, 90, 93));    // "A"
// console.log(getGrade(50, 50, 95));    // "D"
// console.log(getGrade(50, 50, 50))

// // Clean up the words

// function cleanUp(string) {
//   let letters = 'abcdefghijklmnopqrstuvwxyz'
//   stringArray = string.split('')
//   newString = stringArray.map((letter, index, array) => {
//     if (letters.includes(letter)) return letter;
//     else return ' ';
//   }).join('');
//   while (newString.indexOf('  ') !== -1) {
//     newString = newString.replace('  ', ' ')
//   }
//   return newString;
// }

// console.log(cleanUp("---what's my +*& line?"));

// // a way to do it that isn't stupid

// function cleanUp(string) {
//   let letters = 'abcdefghijklmnopqrstuvwxyz';
//   let returnString = '';
//   string.split('').forEach((letter, index) => {
//     if (letters.includes(letter.toLowerCase())) {
//       returnString += letter;
//     } else if (returnString[returnString.length - 1] !== ' ') {
//       returnString += ' ';
//     }
//   })
//   return returnString;
// }

// console.log(cleanUp("---what's my +*& line?"));

// // What century is that? 

// /* this is some really annoying shit. 

// st: 1st, 21st
// th: 4th, 5th, 6th, 7th, 8th, 9th, 10th, 11th, 12th, 13th, 14th, 15th, 16th, 17th, 18th, 19th, 20th, 30th, 40th, 50th, 60th, 70th, 80th, 90th, 100th
// nd: 2nd, 22nd, 32nd, ...
// rd: 3rd, 23rd, 33rd, ...

// */

// function century(year) {
//   let postfix = '';
//   let centuryNumber = Math.floor((year - 1)/100) + 1;
//   let centuryString = String(centuryNumber);
//   let currentTenCenturies = parseInt(((centuryString[centuryString.length - 2] !== undefined) ? centuryString[centuryString.length - 2] : 0) + centuryString[centuryString.length - 1]) 
//   if (centuryString[centuryString.length - 1] === '1') postfix = 'st';
//   if (centuryString[centuryString.length - 1] === '2') postfix = 'nd';
//   if (centuryString[centuryString.length - 1] === '3') postfix = 'rd';
//   if ((currentTenCenturies % 10 === 0) || ((4 <= currentTenCenturies) && (currentTenCenturies <= 20))) postfix = 'th';

  

//   return (String(centuryNumber) + postfix); 

// }


// console.log(century(2000));        // "20th"
// debugger;
// console.log(century(2001));        // "21st"
// console.log(century(1965));        // "20th"
// console.log(century(256));         // "3rd"
// console.log(century(5));           // "1st"
// console.log(century(10103));       // "102nd"
// console.log(century(1052));        // "11th"
// console.log(century(1127));        // "12th"
// console.log(century(11201));       // "113th"