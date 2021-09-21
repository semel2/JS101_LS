function repeatedSubstringPattern(string) {
  let maxSubstringLength = Math.floor(string.length);
  for (let i = 1; i < maxSubstringLength; i += 1) {
    if (string.length % i === 0) {
      let repeatString = string.slice(0, i);
      if (repeatString.repeat(string.length/i) === string) return true;
    }
  }
  return false;
}

console.log(repeatedSubstringPattern('aaaa'));
console.log(repeatedSubstringPattern('abab'));
console.log(repeatedSubstringPattern('aba'));
console.log(repeatedSubstringPattern('aabaaba'));
console.log(repeatedSubstringPattern('abaababaab'))
console.log(repeatedSubstringPattern('abcabcabcabc'));