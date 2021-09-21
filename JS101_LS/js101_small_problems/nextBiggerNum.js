function nextBiggerNum(number) {
  let largestPossibleNumber = parseInt(String(number).split('').sort().reverse().join(''));
  let iteratorNumber = number + 1;
  while (iteratorNumber <= largestPossibleNumber) {
    if (compareDigits(iteratorNumber, number)) {
      return iteratorNumber;
    }
    iteratorNumber += 1;
  }
  return -1;
}

function compareDigits(number1, number2) {
  numberArray1 = String(number1).split('').sort()
  numberArray2 = String(number2).split('').sort();

  if (numberArray1.length !== numberArray2.length) return false;

  for (let i = 0; i < numberArray1.length; i += 1) {
    if (numberArray1[i] !== numberArray2[i]) return false;
  }
  return true;
}



console.log(nextBiggerNum(9));
console.log(nextBiggerNum(12));
console.log(nextBiggerNum(513));
console.log(nextBiggerNum(2017));
console.log(nextBiggerNum(111));
console.log(nextBiggerNum(111) === -1);
console.log(nextBiggerNum(531) === -1);
console.log(nextBiggerNum(12345678) === 123456798);