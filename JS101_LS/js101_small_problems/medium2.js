// //letter percentage ratio

// function letterPercentages(string) {
//   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//   let returnObject = {lowerCase: 0, upperCase: 0, neither: 0};

//   string.split('').forEach(char => {
//     if (alphabet.includes(char)) returnObject.lowerCase += 1;
//     else if (alphabet.toUpperCase().includes(char)) returnObject.upperCase += 1;
//     else returnObject.neither += 1;
//   });

//   for (let key in returnObject) {
//     returnObject[key] = ((returnObject[key] / string.length) * 100).toFixed(2).toString();
//   };

//   return returnObject;
// }

// // triangle sides

// function triangle(side1, side2, side3) {
//   let sortedSides = [side1, side2, side3].sort((a,b) => a - b);
//   if (sortedSides[0] + sortedSides[1] <= sortedSides[2]) return 'invalid';
//   if (sortedSides.some(side => side < 0)) return 'invalid';

//   let sideObject = {};

//   sortedSides.forEach(side => {
//     if (!sideObject[side]) sideObject[side] = 1;
//     else sideObject[side] += 1;
//   });

//   switch(Math.max(...Object.values(sideObject))) {
//     case 1: 
//       return 'scalene';
//     case 2: 
//       return 'isosceles';
//     case 3:
//       return 'equilateral';
//   };
// };

// console.log(triangle(3,3,1.5))

// //triangle angles

// function triangle(angle1, angle2, angle3) {
//   let angles = [...arguments].sort((a,b) => a - b);
//   if (angles[0] <= 0 || angles.reduce((accum, element) => accum + element, 0) !== 180) return 'invalid';
//   switch (Math.sign(angles[2] - 90)) {
//     case 1: 
//       return 'obtuse';
//     case 0: 
//       return 'right';
//     case -1:
//       return 'acute';
//   };
// };

// //unlucky days

// function fridayThe13ths(year) {
//   const MS_PER_DAY = 86400000;
//   let timeCounter = Date.UTC(year);
//   let dayDate = new Date(timeCounter);
//   let f13Counter = 0;
//   while (dayDate.getUTCFullYear() === year) {
//     if (dayDate.getUTCDay() === 5 && dayDate.getUTCDate() === 13) {
//       f13Counter += 1;
//     };
//     timeCounter += MS_PER_DAY;
//     dayDate = new Date(timeCounter);
//   };
//   return f13Counter;
// };

// // way easier method

// function fridayThe13ths(year) {
//   let f13Counter = 0;
//   const FRIDAY = 5;

//   for (let month = 0; month < 12; month += 1) {
//     if (new Date(year, month, 13).getDay() === FRIDAY) {
//       f13Counter += 1;
//     };
//   };
//   return f13Counter;
// }

// //next featured number higher than a given value

// function featured(number) {
//   const LARGEST_FEATURED_NUMBER = 9876543201;
//   for (let i = number; i < LARGEST_FEATURED_NUMBER; i += 1) {
//     if ((i % 7 === 0) && (i % 2 === 1) && (new Set(i.toString()).size === i.toString().length)) {
//       return i;
//     };
//   };
//   return 'There is no possible number that fulfills those requirements.'
// };

// //sum square- square sum

// function sumSquareDifference(number) {
//   let numberArray = [...Array(number).keys()].map(value => value + 1);
//   let squareSum = numberArray.slice().reduce((accum, element) => accum + element, 0)**2;
//   let sumSquares = numberArray.slice().reduce((accum, element) => accum + element**2, 0);
//   return squareSum - sumSquares;
// }

// //bubble sort

// function bubbleSort(array) {
//   let sortCounter = 0;
//   do {
//     sortCounter = 0;
//     for (let i = 0; i < array.length - 1; i += 1) {
//       if (array[i] > array [i+1]) {
//         [array[i], array[i + 1]] = [array[i+1], array[i]]
//         sortCounter += 1;
//       };
//     };
//   } while (sortCounter > 0);
// }

//longest sentence

function longestSentence(text) {
  let sentences = [];
  let endingIdx = 0;
  for (let idx = 0; idx < text.length; idx += 1) {
    if ('.?!'.includes(text[idx])) {
      sentences.push(text.slice(endingIdx, idx + 1));
      endingIdx = idx;
    };
  };
  sentences.forEach((sentence, index, self) => {
    if ('.?!'.includes(sentence[0])) {
      sentence = sentence.slice(1); 
      sentence = sentence.trimStart();
    };
    self[index] = sentence;
  })
  sentences.sort((a,b) => a.split(' ').length - b.split(' ').length);
  console.log(sentences[sentences.length - 1]);
  console.log(`The longest sentence has ${sentences[sentences.length - 1].split(' ').length} words.`)
}

let longText =
  'Four score and seven years ago our fathers brought forth on this ' +
  'continent a new nation, conceived in liberty, and dedicated to the ' +
  'proposition that all men are created equal. Now we are engaged in a ' +
  'great civil war, testing whether that nation, or any nation so ' +
  'conceived and so dedicated, can long endure. We are met on a great ' +
  'battlefield of that war. We have come to dedicate a portion of that ' +
  'field, as a final resting place for those who here gave their lives ' +
  'that that nation might live. It is altogether fitting and proper that ' +
  'we should do this.';

let longerText = longText +
  'But, in a larger sense, we can not dedicate, we can not consecrate, ' +
  'we can not hallow this ground. The brave men, living and dead, who ' +
  'struggled here, have consecrated it, far above our poor power to add ' +
  'or detract. The world will little note, nor long remember what we say ' +
  'here but it can never forget what they did here. It is for us the ' +
  'living, rather, to be dedicated here to the unfinished work which ' +
  'they who fought here have thus far so nobly advanced. It is rather ' +
  'for us to be here dedicated to the great task remaining before us -- ' +
  'that from these honored dead we take increased devotion to that ' +
  'cause for which they gave the last full measure of devotion -- that ' +
  'we here highly resolve that these dead shall not have died in vain ' +
  '-- that this nation, under God, shall have a new birth of freedom -- ' +
  'and that government of the people, by the people, for the people, ' +
  'shall not perish from the earth.';

longestSentence(longText);
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
//
// The longest sentence has 30 words.
debugger;
longestSentence(longerText);
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.
//
// The longest sentence has 86 words.

longestSentence("Where do you think you're going? What's up, Doc?");
// Where do you think you're going?
//
// The longest sentence has 6 words.

longestSentence("To be or not to be! Is that the question?");
// To be or not to be!
//
// The longest sentence has 6 words.