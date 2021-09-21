//problem
// Examples
// "bella", "label", and "roller" should return ["e", "l", "l"]
// Data structure
// Input: array of lowercase strings
// Output: array of lowercase letters 

// Algorithm
/*
sort the input array of strings by string length
set returnArray = [];
for each letter within the shortest string
  set numberOfWordsWithCharacter = 1;
  for each other word within the array
    if word does not contain letter, break
    numberOfWordsWithCharacter += 1;
  if numberOfWordsWithCharacter = inputarray.length
    push letter to returnArray;

return returnArray */

function commonChars(stringArray){
  let returnArray = [];
  stringArray.sort((a,b) => a.length - b.length);
  let smallestWord = stringArray[0];
  for (let letter = 0; letter < smallestWord.length; letter += 1) {
    let numberOfWordsWithLetter = 1;
    for (let i = 1; i < stringArray.length; i += 1) {
      if (!stringArray[i].includes(smallestWord[letter])) break;
      numberOfWordsWithLetter += 1;
    }
    if (numberOfWordsWithLetter === stringArray.length) {
      returnArray.push(smallestWord[letter]);
    }
  }
  return returnArray;
}

console.log(commonChars(['ab', 'bc']))
debugger;
console.log(commonChars(['bella', 'label', 'roller']))
console.log(commonChars(['cool', 'look', 'cook']))