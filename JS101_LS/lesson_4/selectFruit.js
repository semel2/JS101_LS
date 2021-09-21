let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

function selectFruit(inputObject) {
  let outputObject = {};
  for (let i = 0; i < Object.keys(inputObject).length; i += 1) {
    if (Object.values(inputObject)[i] === 'Fruit') {
      outputObject[Object.keys(inputObject)[i]] = Object.values(inputObject)[i];
    }
  }
  return outputObject;
}

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }

function doubleNumbers(numbers) {
  for (let i = 0; i < numbers.length; i += 1) {
    numbers[i] = numbers[i] * 2;
  }
  return numbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doubleNumbers(myNumbers)); // => [2, 8, 6, 14, 4, 12]
console.log(myNumbers);

function doubleOddIndexNumbers(numbers) {
  returnArray = [];
  for (let i = 0; i < numbers.length; i += 1) {
    if (i%2 === 1) returnArray.push(numbers[i]*2);
    else returnArray.push(numbers[i]); 
  }
  return returnArray;
}

let indexNumbers = [0,1,2,3,4,5,6]
console.log(doubleOddIndexNumbers(indexNumbers));

function multiplyArrayItems(array, multiplier) {
  return array.map(number => number * multiplier);
}

console.log(multiplyArrayItems(indexNumbers, 3))