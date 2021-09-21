// function lightsOn(switchesCount) {
//   let switches = [...Array(switchesCount)].fill(0);
//   for (let outerIdx = 1; outerIdx <= switchesCount; outerIdx += 1) {
//     for (let innerIdx = outerIdx; innerIdx <= switchesCount; innerIdx += outerIdx) {
//       switches[innerIdx - 1] = (switches[innerIdx - 1] + 1) % 2;
//     };
//   };
//   return switches.map((value, index) => (value === 1) ? index + 1 : 0).filter(value => value);
// };

// lightsOn(5);

// //diamonds

// function diamond(number, hollow = false) {
//   for (let i = 1; i <= number; i += 1) {
//     let stars = ' '.repeat(number - Math.abs(Math.ceil(number/2 - i)) * 2).split('');
//     let spaces = ' '.repeat(Math.abs(Math.ceil(number/2 - i)));
//     if (hollow) [stars[0], stars[stars.length - 1]] = ['*', '*'];
//     else stars.fill('*');
//     console.log(`${spaces}${stars.join('')}`);
//   };
// }

// diamond(5, true);

// //now I know my ABCs

// function isBlockWord(word) {
//   let blocks = [['B', 'O'], ['X', 'K'], ['D', 'Q'], ['C', 'P'], ['N', 'A'], ['G', 'T'],
//     ['R', 'E'], ['F', 'S'], ['J', 'W'], ['H', 'U'], ['V', 'I'], ['L', 'Y'], ['Z', 'M']
//   ]
//   return word.split('').every(letter => {
//     let letterIndex = blocks.slice().flat().indexOf(letter.toUpperCase());
//     if (letterIndex !== -1) {
//       blocks.splice(Math.floor(letterIndex / 2), 1); 
//       return true;
//     } else return false; 
//   });
// };

// //seeing stars

// /* number of top rows before middle row of stars is math.floor(integer/2)
// number of spaces between stars before middle row is math.floor(integer/2) - row#
// number of leading spaces is row# - 1
// */

function star(number) {
  for (let rowNum = 1; rowNum <= number; rowNum += 1) {
    let magicNumber = Math.ceil(number/2)
    if (rowNum === magicNumber) console.log('*'.repeat(number));
    else {
      leadingSpaces = ' '.repeat(magicNumber - Math.abs(magicNumber - rowNum) - 1);
      spacesBetween = ' '.repeat(Math.abs(magicNumber - rowNum) - 1);
      console.log(`${leadingSpaces}${('*'+spacesBetween).repeat(3)}`);
    };
  };
};

star(7)