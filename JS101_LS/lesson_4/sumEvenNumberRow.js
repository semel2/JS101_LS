function sumEvenNumberRow(rowNumber) {
  let sum = 0;
  for (let i = 1; i <= rowNumber; i += 1) {
    sum = sum + i;
  }
  let masterSequence = [...Array(sum).keys()].map(x => (x + 1) * 2 )
  let masterArray = [];
  for (let rowLength = 1; rowLength <= rowNumber; rowLength += 1) {
    let newRow = [];
    for (let number = 0; number < rowLength; number += 1) {
      newRow[number] = masterSequence.shift();
    }
    masterArray.push(newRow)
  }
  return masterArray[rowNumber - 1].reduce((accumulator, number) => accumulator + number, 0)
}

console.log(sumEvenNumberRow(1)) // 2
console.log(sumEvenNumberRow(2)) // 10
console.log(sumEvenNumberRow(4)) // 68
console.log(sumEvenNumberRow(5)) // 130


// get row number from input
// create array of numbers from 1 to row numbers, incrementing by 1
// sum all numbers; create a new array with length of this sum starting at 2 and incrementing by 2
// from 1 to row number, pull numbers from big sequence into rows, then once row length is correct append them to big array
// once final array is complete, sum the row that was entered
/* 

2
4 6
8 10 12
14 16 18 20
22 24 26 28 30
*/
