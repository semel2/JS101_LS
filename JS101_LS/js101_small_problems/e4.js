// // How old is Teddy?

// let age = Math.floor(20 + Math.random()*100 + Math.random());
// console.log(`Teddy is ${age} years old!`)

// Searching 101

// const readline = require('readline-sync');

// function searching() {
//   let numberArray = [];
//   let suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th'];
//   let verdict = '';
//   for (let i = 1; i <= 6; i += 1) {
//     console.log(`Enter the ${i}${suffixes[i - 1]} number: `);
//     let response = readline.prompt();
//     numberArray.push(parseInt(response));
//   }
//   if (numberArray.slice(0, 5).includes(numberArray[5])) verdict = 'appears';
//   else verdict = 'does not appear'
//   console.log(`The number ${numberArray[5]} ${verdict} in ${numberArray.slice(0,5).join()}`);
// }

// searching();

// // palindromic strings (part 1)

// function isPalindrome(string) {
//   let reversedString = string.split('').reverse().join('');
//   return (reversedString === string) ? true : false;
// }

// console.log(isPalindrome('madam'))
// console.log(isPalindrome('Madam'))
// console.log(isPalindrome("madam i'm adam"))
// console.log(isPalindrome('356653'))

// //palindromic strings (part 2) 

// function isRealPalindrome(string) {
//   let validCharacters = '1234567890abcdefghijklmnopqrstuvwxyz'
//   let cleanedString = string.toLowerCase().split('').filter(char => validCharacters.includes(char)).join('');
//   return isPalindrome(cleanedString);
// }


// console.log(isRealPalindrome('madam'));               // true
// console.log(isRealPalindrome('Madam'));               // true (case does not matter)
// console.log(isRealPalindrome("Madam, I'm Adam"));     // true (only alphanumerics matter)
// console.log(isRealPalindrome('356653'));              // true
// console.log(isRealPalindrome('356a653'));             // true
// console.log(isRealPalindrome('123ab321'));            // false 

// //palindromic numbers

// function isPalindromicNumber(number) {
//   return String(number) === String(number).split('').reverse().join('');
// }

// console.log(isPalindromicNumber(34543));        // true
// console.log(isPalindromicNumber(123210));       // false
// console.log(isPalindromicNumber(22));           // true
// console.log(isPalindromicNumber(5));            // true

// //running totals

// function runningTotal(array) {
//   let returnArray = [];
//   array.reduce((accum, element) => {
//     returnArray.push(accum + element);
//     return accum + element;
//   }, 0);
//   return returnArray;
// }

// console.log(runningTotal([2, 5, 13]));             // [2, 7, 20]
// console.log(runningTotal([14, 11, 7, 15, 20]));    // [14, 25, 32, 47, 67]
// console.log(runningTotal([3]));                    // [3]
// console.log(runningTotal([]));                     // []

// //letter counter (part 1)

// function wordSizes(string) {
//   let wordSizeObject = {};
//   string.split(' ').filter(word => word.trim()).forEach(word => {
//     if (wordSizeObject[word.length] === undefined) {
//       wordSizeObject[word.length] = 1;
//     } else wordSizeObject[word.length] += 1;
//   });
//   return wordSizeObject;
// }

// console.log(wordSizes('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
// console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 1, "7": 2 }
// console.log(wordSizes("What's up doc?"));                              // { "2": 1, "4": 1, "6": 1 }
// console.log(wordSizes(''));                    

// //letter counter (part 2) 

// function wordSizes(string) {
//   let wordSizeObject = {};
//   string.split(' ').filter(word => word.trim()).forEach(word => {
//     word = word.split('').filter(letter => 'abcdefghijklmnopqrstuvwxyz'.includes(letter.toLowerCase())).join('');
//     if (wordSizeObject[word.length] === undefined) {
//       wordSizeObject[word.length] = 1;
//     } else wordSizeObject[word.length] += 1;
//   });
//   return wordSizeObject;
// }

// console.log(wordSizes('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
// console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 1, "7": 2 }
// console.log(wordSizes("What's up doc?"));                              // { "2": 1, "3": 1, "6": 1 }
// console.log(wordSizes(''));       

//letter swap

function swap(string) {
  return string.split(' ').map(word => {
    word = word.split('')
    let firstLetter = word[0];
    word[0] = word[word.length - 1];
    word[word.length - 1] = firstLetter;
    return word.join('');
  }).join(' ');
}

console.log(swap('Oh what a wonderful day it is'));  // "hO thaw a londerfuw yad ti si"
console.log(swap('Abcde'));                          // "ebcdA"
console.log(swap('a'));                              // "a"
