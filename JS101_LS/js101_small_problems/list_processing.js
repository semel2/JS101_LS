//sum of digits

function sum(number) {
  return String(number).split('').reduce((accum, element) => {
    return accum + parseInt(element);
  }, 0)
}

//Alphabetical numbers

function alphabeticNumberSort(array) {
  const words = {0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve',
    13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen'
  };
  return array.map(element => words[element]).sort().map(word => Object.keys(words)[Object.values(words).indexOf(word)])
}

// Multiply all pairs

function multiplyAllPairs(array1, array2) {
  return array1.map(value => {
    return array2.map(number => number * value);
  }).flat().sort((a, b) => a - b);
}

// Leading substrings

function leadingSubstrings(string) {
  return string.split('').map((_, index, self) => {
    self.slice(0, index + 1).join('');
  })
}

// all substrings

function substrings(string) {
  return string.split('').map((_, index) => {
    return leadingSubstrings(string.slice(index, string.length))
  }).flat();
};

// palindromic substrings
function palindromes(string) {
  return substrings(string).filter(word => word.length > 1 && word === word.split('').reverse().join(''))
}

//sumOfSums

function sumOfSums(array) {
  return array.reduce((accumulator, element, index) => {
    return accumulator + (element * (array.length - index))
  }, 0);
};

//grocery list

function buyFruit(array) {
  return array.map(subArray => Array(subArray[1]).fill(subArray[0])).flat();
} 

// inventory item transactions

function transactionsFor(numberID, array) {
  return array.filter(object => object.id === numberID);
}

//inventory item availability

function isItemAvailable(numberID, array) {
  return transactionsFor(numberID, array).reduce((accum, element) => {
    return accum + ((element.movement === 'in') ? element.quantity : -element.quantity);
  }, 0) > 0;
};