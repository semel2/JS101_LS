// Q1. 

for (let i = 0; i < 10; i += 1) {
  console.log("The Flintstones Rock!".padStart("The Flintstones Rock!".length + i));
}
//or
for (let padding = 1; padding <= 10; padding += 1) {
  console.log(" ".repeat(padding) + "The Flintstones Rock!")
}

/* Q2. Starting with the string:

let munstersDescription = "The Munsters are creepy and spooky.";

Return a new string that swaps the case of all of the letters:

`tHE mUNSTERS ARE CREEPY AND SPOOKY.` */

let munstersDescription = "The munsters are creepy and spooky.";
let newMunstersDescription = [];
[...munstersDescription].map(letter => {
  if (letter.toLowerCase() === letter) {
    newMunstersDescription.push(letter.toUpperCase());
  } else newMunstersDescription.push(letter.toLowerCase());
})
newMunstersDescription.join('')
//or
[...munstersDescription].map(letter => {
  if (letter.toLowerCase() === letter) {
    return letter.toUpperCase();;
  } else return letter.toLowerCase();
}).join("")

//Q3. Alan wrote the following function, which was intended to return all of the factors of number:


function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}

/* Q3. Alyssa noticed that this code would fail when the input is 0 or a negative number, 
and asked Alan to change the loop. How can he make this work without using a do/while loop? 
Note that we're not looking to find the factors for 0 or negative numbers, 
but we want to handle it gracefully instead of raising an exception or going into an infinite loop.

Bonus: What is the purpose of number % divisor === 0 in that code?*/

function factors(number) {
  if (number <= 0  || number % 1 !== 0) {
    console.log("Whoops- please enter an integer greater than 0.")
  } else {
    return [...Array(number+1).keys()].slice(1).filter(divisor => number % divisor === 0);}
}

/* Q4. Alyssa was asked to write an implementation of a rolling buffer. 
You can add and remove elements from a rolling buffer. However, once the buffer becomes full, 
any new elements will displace the oldest elements in the buffer.

She wrote two implementations of the code for adding elements to the buffer. 
In presenting the code to her team leader, she said 
"Take your pick. Do you prefer push() or concat() for modifying the buffer?".

Is there a difference between these implementations, 
other than the method she used to add an element to the buffer?*/

function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

// yes. If the element is an array, concat will add on each element one at a time, so the added length
// will be the length of the array; if push is used, the entire array will be added as one element,
// so the added length will only be one. 

// other (correct) reason: addToRollingBuffer1 mutates the caller, and addToRollingBuffer2 doesn't 

// Q5. What will the following two lines of code output?

console.log(0.3 + 0.6);
console.log(0.3 + 0.6 === 0.9);

// 0.8999999999... and false. Because of the way the computer handles floating-point numbers, it saves 0.3 and 0.6 as inexact values.

// Q6. What do you think the following code will output?

let nanArray = [NaN];

console.log(nanArray[0] === NaN);

// it will output False because NaN is the only value that isn't equal to itself. You can test if a value is NaN using the Number.isNaN test.

// Q7. What is the output of the following code?

let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);

// the output of this code will be 34 because primitive values are immutable and cannot be reassigned within this function.

// Q8. One day, Spot was playing with the Munster family's home computer, and he wrote a small program to mess with their demographic data:


let munsters = {
  Herman: { age: 32, gender: "male" },
  Lily: { age: 30, gender: "female" },
  Grandpa: { age: 402, gender: "male" },
  Eddie: { age: 10, gender: "male" },
  Marilyn: { age: 23, gender: "female" }
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach(familyMember => {
    familyMember["age"] += 42;
    familyMember["gender"] = "other";
  });
}

//After writing this function, he typed the following code:

messWithDemographics(munsters);

// Before Grandpa could stop him, Spot hit the Enter key with his tail. Did the family's data get ransacked? Why or why not?

// No; because the function runs Object.values(demoObject), it will merely perform the operations on a copy of the data, not the original data itself; therefore, it will not mutate the data. 

// damn, this was wrong^^ it does mess up the data. Object.values does reference a pointer to the object, not a copy of the values.

/* Q9. Function and method calls can take expressions as arguments. 
Suppose we define a function named rps as follows, which follows the classic rules of the rock-paper-scissors game, 
but with a slight twist: in the event of a tie, it just returns the choice made by both players. */

function rps(fist1, fist2) {
  if (fist1 === "rock") {
    return fist2 === "paper" ? "paper" : "rock";
  } else if (fist1 === "paper") {
    return fist2 === "scissors" ? "scissors" : "paper";
  } else {
    return fist2 === "rock" ? "rock" : "scissors";
  }
}

// What does the following code output?

console.log(rps(rps(rps("rock", "paper"), rps("rock", "scissors")), "rock"));
console.log(rps(rps('paper', 'rock'), 'rock'))
console.log(rps('paper', 'rock'))
console.log('paper')

// Q10. Consider these two simple functions:

function foo(param = "no") {
  return "yes";
}

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

// What will the following function invocation return?

bar(foo());

// it will return "no"