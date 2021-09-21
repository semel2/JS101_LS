// //combining arrays
// function union(array1, array2) {
//   return array1.concat(array2).filter((value, index, array) => array.indexOf(value) === index)
// }

// console.log(union([1, 3, 5], [3, 6, 9]))

// //Halvsies

// function halvsies(array) {
//   let midpoint = Math.ceil(array.length/2)
//   return [array.slice(0, midpoint), array.slice(midpoint, array.length)]
// }

// console.log(halvsies([1, 2, 3, 4]));       // [[1, 2], [3, 4]]
// console.log(halvsies([1, 5, 2, 4, 3]));    // [[1, 5, 2], [4, 3]]
// console.log(halvsies([5]));                // [[5], []]
// console.log(halvsies([]));                 // [[], []]

// // Find the duplicate

// function findDup(array) {
//   return array.filter((number, index, array) => array.indexOf(number) !== index)[0];
// }

// console.log(findDup([1, 5, 3, 1]));                                // 1
// console.log(findDup([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
//          38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
//          14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
//          78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
//          89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
//          41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
//          55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
//          85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
//          40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
//           7, 34, 57, 74, 45, 11, 88, 67,  5, 58])
// );    // 73


// // Combine two lists

// function interleave (array1, array2) {
//   let returnArray = [];
//   array1.forEach((element, index) => {
//     returnArray.push(array1[index]);
//     returnArray.push(array2[index]);
//   });
//   return returnArray;
// }

// console.log(interleave([1, 2, 3], ['a', 'b', 'c']));    // [1, "a", 2, "b", 3, "c"]

// // Multiplicative average

// function multiplicativeAverage(array) {
//   let returnValue = 1;
//   array.forEach(number => returnValue *= number);
//   return String((returnValue/array.length).toFixed(3));
// }

// console.log(multiplicativeAverage([3, 5]));                   // "7.500"
// console.log(multiplicativeAverage([2, 5, 7, 11, 13, 17]));    // "28361.667"

// // Multiply lists

// function multiplyLists(array1, array2) {
//   return array1.map((number, index) => number * array2[index]);
// }

// console.log(multiplyLists([3, 5, 7], [9, 10, 11]));    // [27, 50, 77]

// // List of digits

// function digitList(number) {
//   return String(number).split('').map((element, index, array) => array[index] = parseInt(element));
// }


// console.log(digitList(12345));       // [1, 2, 3, 4, 5]
// console.log(digitList(7));           // [7]
// console.log(digitList(375290));      // [3, 7, 5, 2, 9, 0]
// console.log(digitList(444));         // [4, 4, 4]

// //how many?

// function countOccurrences (array) {
//   let iterationObject = {};
//   array.forEach(vehicle => {
//     if (iterationObject[vehicle] === undefined) {
//       iterationObject[vehicle] = 1;
//     } else iterationObject[vehicle] += 1;
//   });
//   Object.keys(iterationObject).forEach(key => {
//     console.log(`${key} => ${iterationObject[key]}`)
//   })
// }

// let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
//                 'motorcycle', 'motorcycle', 'car', 'truck'];

// countOccurrences(vehicles);

// // array average

// function average(array) {
//   return Math.floor(array.reduce((accum, element) => accum + element)/array.length);
// }

// console.log(average([1, 5, 87, 45, 8, 8]));       // 25
// console.log(average([9, 47, 23, 95, 16, 52]));    // 40

// // after midnight (part 1)

// function timeOfDay(minutes) {
//   let actualMinutes = ((minutes%1440) + 1440) % 1440;
//   let hours = Math.floor(actualMinutes/60);
//   let returnMinutes = actualMinutes % 60;
  
//   return String(hours).padStart(2, '0') + ':' + String(returnMinutes).padStart(2, '0');
// }

// console.log(timeOfDay(0) === "00:00");
// console.log(timeOfDay(-3) === "23:57");
// console.log(timeOfDay(35) === "00:35");
// console.log(timeOfDay(-1437) === "00:03");
// console.log(timeOfDay(3000) === "02:00");
// console.log(timeOfDay(800) === "13:20");
// console.log(timeOfDay(-4231) === "01:29");

function afterMidnight(timeString){
  let hours = parseInt(timeString.split(':')[0]);
  let minutes = parseInt(timeString.split(':')[1]);
  return (hours*60 + minutes) % 1440;
} 

function beforeMidnight(timeString) {
  let hours = parseInt(timeString.split(':')[0]);
  let minutes = parseInt(timeString.split(':')[1]);
  return (1440 - (hours*60 + minutes)) % 1440;
}

console.log(afterMidnight("00:00") === 0);
console.log(beforeMidnight("00:00") === 0);
console.log(afterMidnight("12:34") === 754);
console.log(beforeMidnight("12:34") === 686);
console.log(afterMidnight("24:00") === 0);
console.log(beforeMidnight("24:00") === 0);
