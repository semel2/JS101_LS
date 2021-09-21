// //rotation (part 1)

// function rotateArray(input) {
//   if (Array.isArray(input)) {
//     if (input.length > 0) {
//       return input.slice(1).concat(input[0])
//     } else return [];
//   } else return undefined;
// }

// console.log(rotateArray([7, 3, 5, 2, 9, 1]));       // [3, 5, 2, 9, 1, 7]
// console.log(rotateArray(['a', 'b', 'c']));          // ["b", "c", "a"]
// console.log(rotateArray(['a']));                    // ["a"]
// console.log(rotateArray([1, 'a', 3, 'c']));         // ["a", 3, "c", 1]
// console.log(rotateArray([{ a: 2 }, [1, 2], 3]));    // [[1, 2], 3, { a: 2 }]
// console.log(rotateArray([]));                       // []

// // return `undefined` if the argument is not an array
// console.log(rotateArray());                         // undefined
// console.log(rotateArray(1));                        // undefined


// // the input array is not mutated
// let array = [1, 2, 3, 4];
// console.log(rotateArray(array));                    // [2, 3, 4, 1]
// console.log(array);                                 // [1, 2, 3, 4]

// // rotation (part 2) 

// function rotateRightmostDigits(number, count) {
//   let tempArray = number.toString().split('');
//   let tempNumber = tempArray.splice(tempArray.length - count, 1);
//   return parseInt(tempArray.concat(tempNumber).join(''));
// }

// // rotation (part 3)

// function maxRotation(number) {
//   let tempArray = number.toString().split('');
//   for (let i = 0; i < tempArray.length - 1; i += 1) {
//     tempArray.push(tempArray.splice(i, 1));
//   }
//   return parseInt(tempArray.join(''));
// }

// //stack machine interpretation

// function minilang(program) {
//   let register = 0;
//   let stack = [];
//   program.split(' ').forEach(command => {
//     if (!Number.isNaN(parseInt(command))) register = parseInt(command);
//     else switch (command) {
//       case 'PUSH': 
//         stack.push(register); break;
//       case 'ADD': 
//         register += stack.pop(); break;
//       case 'SUB': 
//         register -= stack.pop(); break;
//       case 'MULT':
//         register *= stack.pop(); break;
//       case 'DIV': 
//         register = Math.floor(register / stack.pop()); break;
//       case 'REMAINDER':
//         register = Math.floor(register % stack.pop()); break;
//       case 'POP':
//         register = stack.pop(); break;
//       case 'PRINT':
//         console.log(register);
//     }
//   })
// }

// //word to digit

// function wordToDigit(sentence) {
//   const numbers = {zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', 
//     six: '6', seven: '7', eight: '8', nine: '9', ten: '10'
//   };
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz'
//   return sentence.split(' ').map(word => {
//     let cleanedWord = word.split('').filter(letter => alphabet.includes(letter.toLowerCase())).join('').toLowerCase();
//     if (numbers[cleanedWord] !== undefined) return numbers[cleanedWord] + word.slice(cleanedWord.length);
//     else return word;
//   }).join(' ');
// }

// //fibonacci numbers (recursion)

// function fibonacci(number) {
//   if (number === 1 || number === 2) return 1;
//   else return fibonacci(number - 1) + fibonacci(number - 2);
// }

// //fibonacci numbers (procedural)

// function fibonacci(number) {
//   let fibArray = [1, 1];
//   for (let i = 3; i <= number; i += 1) {
//     fibArray.push(fibArray[i - 2] + fibArray[i - 3])
//   };
//   return fibArray[number - 1];
// }

// console.log(fibonacci(20));
// console.log(fibonacci(50));
// console.log(fibonacci(75));

// //another way without building a big array

// function fibonacci(number) {
//   let fibArray = [1,1];
//   for (let i = 3; i <= number; i += 1) {
//     fibArray = [fibArray[1], fibArray[0] + fibArray[1]];
//   };
//   return fibArray[1];
// }

// console.log(fibonacci(20));
// console.log(fibonacci(50));
// console.log(fibonacci(75));

// //fibonacci numbers (memoization)

function fibonacci(nth) {
  let numbers = {1: 1, 2: 1};
  function innerFibonacci(nth) {
    if (numbers[nth]) return numbers[nth];
    else numbers[nth] = innerFibonacci(nth - 1) + innerFibonacci(nth - 2);
    return numbers[nth];
  }
  return innerFibonacci(nth);
}

console.log(fibonacci(20))
console.log(fibonacci(50))
console.log(fibonacci(75))