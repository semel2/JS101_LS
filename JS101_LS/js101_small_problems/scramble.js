function scramble(string1, string2) {
  let stringArray1 = string1.split('');
  let stringArray2 = string2.split('');

  for (let i = 0; i < stringArray2.length; i += 1) {
    let currentLetter = stringArray2[i];
    if (stringArray1.indexOf(currentLetter) === -1) return false;
    stringArray1.splice(stringArray1.indexOf(currentLetter), 1);
  }
  return true;
}

console.log(scramble('javaass', 'jjss') === false)
console.log(scramble('rkqodlw', 'world') === true);
console.log(scramble('cedewaraaossoqqyt', 'codewars') === true);
console.log(scramble('katas', 'steak') === false);