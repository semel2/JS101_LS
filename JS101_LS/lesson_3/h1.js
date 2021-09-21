// Q1. Will the following functions return the same results?

function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first());
console.log(second());

// no they will not; because the second function has the object literal on the line after return, return will not recognize it. 

// Q2. What does the last line in the following code output?

let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);

// the code will output [1,2] because the pointer was copied, not the value itself. 

// Q3. Given the following similar sets of code, what will each code snippet print?

// A

function messWithVars(one, two, three) {
  one = two;
  two = three;
  three = one;
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

// they'll all print 'two'
// ^that was wrong, it prints one two three because variable reassignment within the function without mutating the array creates a new array and doesn't change the value the original variable is pointing to
// B

function messWithVars(one, two, three) {
  one = ["two"];
  two = ["three"];
  three = ["one"];
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

// one, two, three. Reassigning the variable within the function means the pointer outside of the function stays the same.

// C 

function messWithVars(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

// two, three, one

/* Q4. Ben was tasked to write a simple JavaScript function to determine whether an input string is an IP address 
using 4 dot-separated numbers, e.g., 10.4.5.11. He is not familiar with regular expressions.

Alyssa supplied Ben with a function named isAnIpNumber. 
It determines whether a string is a numeric string between 0 and 255 as required for IP numbers 
and asked Ben to use it. Here's the code that Ben wrote: */

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      break;
    }
  }

  return true;
}

/* Alyssa reviewed Ben's code and said, "It's a good start, but you missed a few things. 
You're not returning a false condition, and you're not handling the case when the input string has 
more or less than 4 components, e.g., 4.5.5 or 1.2.3.4.5: both those values should be invalid."*/

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  if (dotSeparatedWords.length === 4) {
    if (dotSeparatedWords.filter(word => isAnIpNumber(word)).length === 4) {
      return true;
    }
  }
  return false;
}