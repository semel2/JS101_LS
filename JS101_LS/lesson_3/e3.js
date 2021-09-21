// Q1. Write three different ways to remove all of the elements from the following array:

let numbers = [1, 2, 3, 4];

numbers.length = 0;
numbers.splice(0,4);
while (numbers.length) {numbers.pop()}
numbers = [];

// Q2. What will the following code output?

console.log([1, 2, 3] + [4, 5]);
// [1,2,3,4,5] ?
// nope, it was 1,2,34,5. turns the arrays into strings.

// Q3. What will the following code output?

let str1 = "hello there";
let str2 = str1;
str2 = "goodbye!";
console.log(str1);

// this will output 'hello there' because variable assignment is pass-by-value-esque
// this was right!

// Q4. What will the following code output?

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

// it will log the original array because arr2 was created using slice
// wrong, slice ends up copying the pointers to the objects within the array. the objects are not actually in the array, the pointers are
// slice does shallow copies, not deep copies

// Q5. The following function unnecessarily uses two return statements to return boolean values. Can you rewrite this function so it only has one return statement and does not explicitly use either true or false?

function isColorValid (color) {
  return (color === "blue" || color === "green") 
}
//or
function isColorValid (color) {
  return (["blue", "green"].includes(color))
}
//or 
let isColorValid = color => ["blue", "green".includes(color)]