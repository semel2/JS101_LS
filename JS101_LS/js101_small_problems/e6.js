// // double char (part 1)

// function repeater(string) {
//   return string.split('').map(letter => {
//     return letter.repeat(2);
//   }).join('');
// }

// console.log(repeater('Hello'));        // "HHeelllloo"
// console.log(repeater('Good job!'));    // "GGoooodd  jjoobb!!"
// console.log(repeater(''));             // ""

// // double char (part 2)

// function doubleConsonants(string) {
//   return string.split('').map(letter => {
//     if ('bcdfghjklmnpqrstvwxyz'.includes(letter.toLowerCase())) return letter.repeat(2);
//     else return letter;
//   }).join('')
// }

// console.log(doubleConsonants('String'));          // "SSttrrinngg"
// console.log(doubleConsonants('Hello-World!'));    // "HHellllo-WWorrlldd!"
// console.log(doubleConsonants('July 4th'));        // "JJullyy 4tthh"
// console.log(doubleConsonants(''));                // ""

// Reverse number

// function reverseNumber(number) {
//   return parseInt(String(number).split('').reverse().join('').trimStart());
// }

// console.log(reverseNumber(12345));    // 54321
// console.log(reverseNumber(12213));    // 31221
// console.log(reverseNumber(456));      // 654
// console.log(reverseNumber(12000));    // 21 -- Note that leading zeros in the result get dropped!
// console.log(reverseNumber(1));        // 1

// // get the middle character

// function centerOf(string) {
//   return (string.length/2 % 1 === 0) ? string.slice(string.length/2 - 1, string.length/2 + 1) : string[Math.floor(string.length/2)]
// }

// //or 

// function centerOf(string) {
//   return string.slice(Math.ceil(string.length/2) - 1, Math.floor(string.length/2) + 1)
// }

// //Always return negative

// function negative(number) {
//   return -Math.abs(number);
// }

// //Counting up

// function sequence(number) {
//   return [...Array(number).keys()].map(element => element + 1)
// }

// //Name swapping

// function swapName(name) {
//   return name.split(' ').reverse().join(', ')
// }

// function sequence(count, startingNumber) {
//   return [...Array(count).keys()].map((element, index) => (element + 1) * startingNumber);
// }

// // // reverse it (part 1) 

// function reverseSentence(string) {
//   return string.split(' ').reverse().join(' ')
// }

// //reverse it (part 2)

// function reverseWords(words) {
//   return words.split(' ').map(word => {
//     if (word.length > 4) return word.split('').reverse().join('');
//     else return word;
//   }).join(' ');
// }

// //Reversed arrays

// function reverse(array) {
//   let arrayCopy = array.slice();
//   array.forEach((value, index, self) => self[index] = arrayCopy[array.length - (index + 1)]);
//   return array;
// }

// let list = [1, 2, 3, 4];
// let result = reverse(list);
// console.log(result); // logs [4,3,2,1]
// console.log(list === result); // logs true

// let list1 = ["a", "b", "c", "d", "e"];
// let result1 = reverse(list1);
// console.log(result1); // logs  ["e", "d", "c", "b", "a"]
// console.log(list1 === result1); // logs true

// let list2 = ["abc"];
// let result2 = reverse(list2);
// console.log(result2); // logs  ["abc"]
// console.log(list2 === result2); // logs true

// let list3 = [];
// let result3 = reverse(list3);
// console.log(result3); // logs []
// console.log(list3 === result3); // logs true

// Matching parentheses

function isBalanced(string) {
  let counter = 0;
  return string.split('').reduce((accum, element) => {
    if (element === ')') {
      counter += 1; 
      return ((accum === 0) ? Infinity : accum - 1);
    }
    else if (element === '(') return accum + 1;
    else return accum;
  }, 0) === 0;
}

debugger;
console.log(isBalanced("What (is) this?") === true);
console.log(isBalanced("What is) this?") === false);
console.log(isBalanced("What (is this?") === false);
console.log(isBalanced("((What) (is this))?") === true);
console.log(isBalanced("((What)) (is this))?") === false);
console.log(isBalanced("Hey!") === true);
console.log(isBalanced(")Hey!(") === false);
console.log(isBalanced("What ((is))) up(") === false);