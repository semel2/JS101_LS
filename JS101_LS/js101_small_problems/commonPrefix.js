/*

input: array of strings
output: string

algorithm:

sort the array of strings by shortest to longest
shift off the first string into a new variable\
initialize variable returnString = ''
for each letter index within the shortest word:
  if every word starts with the segment within the shortest word at the current letter index (array.every(word) => word.startsWith(shortestWord.slice(0, i)))
    returnString = shortestWord.slice(0, i+1)
  else break
return returnString
*/

function commonPrefix(stringArray) {
  stringArray.sort((a, b) => a.length - b.length);
  let returnString = '';
  shortestWord = stringArray.shift()
  for (let letterIndex = 1; letterIndex <= shortestWord.length; letterIndex += 1) {
    let currentString = shortestWord.slice(0, letterIndex);
    if (stringArray.every(word => word.startsWith(currentString))) {
      returnString = shortestWord.slice(0, letterIndex);
    } else break;
  }
  return returnString;
}

console.log(commonPrefix(['flower', 'flow', 'flight']) === 'fl')
console.log(commonPrefix(['dog', 'racecar', 'car']) === '')
console.log(commonPrefix(['throne', 'throne']) === 'throne')
console.log(commonPrefix(['interspecies', 'interstellar', 'interstate']))