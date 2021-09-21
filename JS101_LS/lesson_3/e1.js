/* Q1: will the code below raise an error?

let numbers = [1, 2, 3];
numbers[6] = 5;

A: no

Bonus: 

let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4];  // what will this line return? Undefined

Q2: How can you determine whether a given string ends with an exclamation mark (!)?

str1[str1.length - 1] === '!'
str2[str2.length - 1] === '!'

^^ this works, but the correct answer was str1.endsWith('!')

Q3: Determine whether the following object of people and their age contains an entry for 'Spot':

let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 }; 

No it doesn't

Q4: Using the following string, create a new string that contains all lowercase letters except for the first character, which should be capitalized. (See the example output.)

let munstersDescription = "the Munsters are CREEPY and Spooky.";

munstersDescription[0].toUpperCase().concat(munstersDescription.slice(1).toLowerCase())

Q5: What will the following code output?

console.log(false == '0'); true
console.log(false === '0'); false

Q6: We have most of the Munster family in our ages object:

let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };

Add entries for Marilyn and Spot to the object:

let additionalAges = { Marilyn: 22, Spot: 237 };

Object.assign(ages, additionalAges)

Q7: Determine whether the name Dino appears in the strings below -- check each string separately):

str1.includes('Dino')
str2.includes('Dino')

Q8: How can we add the family pet, "Dino", to the following array?

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];

flintstones[flintstones.length] = 'Dino';
or flintstones.push('Dino');

Q9: In the previous problem, our first answer added 'Dino' to the array like this:

How can we add multiple items to our array? ('Dino' and 'Hoppy')

flintstones.concat(['Dino', 'Hoppy'])
or flintstones.push('dino', 'hoppy')

Q10: Return a new version of this sentence that ends just before the word house. Don't worry about spaces or punctuation: remove everything starting from the beginning of house to the end of the sentence.

let advice = "Few things in life are as important as house training your pet dinosaur.";

advice.slice(0, advice.indexOf('house')) */