// uppercase check

function isUppercase (string) {
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] !== string[i].toUpperCase()) return false;
  }
  return true;
}

// better way

function isUppercase (string) {
  return string === string.toUpperCase();
}

//delete vowels

function removeVowels(array) {
  return array.map(string => string.split('').filter(char => !'aeiou'.includes(char.toLowerCase())).join(''))
}

//lettercase counter

function letterCaseCount(string) {
  returnObject = {lowercase: 0, uppercase: 0, neither: 0};
  string.split('').forEach(character => {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(character)) {
      returnObject.lowercase += 1;
    } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(character)) {
      returnObject.uppercase += 1;
    } else returnObject.neither += 1;
  });
  return returnObject;
}

// capitalize words

function wordCap(string) {
  return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join((' '));
}

// swap case

function swapCase(string) {
  return string.split('').map(letter => {
    if (letter === letter.toLowerCase()) return letter.toUpperCase();
    else return letter.toLowerCase();
  }).join('');
} 

//staggered caps part 1

function staggeredCase(string) {
  return string.split('').map((letter, index) => {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(letter.toLowerCase())) {
      if (index % 2 === 0) return letter.toUpperCase();
      else return letter.toLowerCase();
    }
    return letter;
  }).join('');
}

//staggered caps part 2

function staggeredCase(string) {
  let counter = 0;
  return string.split('').map(letter => {
    if ('abcdefghijklmnopqrstuvwxyz'.includes(letter.toLowerCase())) {
      counter += 1;
      if (counter % 2 === 1) return letter.toUpperCase();
      else return letter.toLowerCase();
    }
    return letter;
  }).join('');
}

//how long are you? (EXTREMELY SUS)

function wordLengths(string) {
  if (string) return string.split(' ').map(word => {
    return `${word} ${word.length}`;
  });
  else return [];
}

//search word (part 1) 

function searchWord(word, text) {
  return text.split(' ').filter(block => block.toLowerCase().includes(word.toLowerCase())).length;
}

//search word (part 2)

function searchWord(word, text) {
  return text.split(' ').map(block => {
    if (block.toLowerCase().includes(word.toLowerCase())) return `**${block.toUpperCase()}**`;
    return block;
  }).join(' ');
}