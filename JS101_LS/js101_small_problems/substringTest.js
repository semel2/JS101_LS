function substringTest(string1, string2) {
  string1 = string1.toLowerCase();
  string2 = string2.toLowerCase();
  for (let i = 0; i < string1.length - 2; i += 1) {
    if (string2.includes(string1.slice(i, i+2))) {
      return true;
    }
  }
  return false;
}

console.log(substringTest('Something', 'fun') === false)
console.log(substringTest('something', 'home'))
console.log(substringTest('something', '') === false)
console.log(substringTest('BANANA', 'banana') === true)
console.log(substringTest('1234567', '541265') === true)
console.log(substringTest('supercalifragilisticexpialidocious', 'soundofitisatrociou') === true)