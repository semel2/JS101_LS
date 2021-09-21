// let ladder = ''

// ['head', 'heal', 'teal', 'tell', 'tall', 'tail'].forEach(word => {
//   if (ladder !== '') {
//     ladder += '-'
//   }

//   ladder += word
// })

// console.log(ladder)  // expect: head-heal-teal-tell-tall-tail

//reserved keywords

//it doesn't work because .forEach always returns undefined. change it to this:

// const RESERVED_KEYWORDS = ['break', 'case', 'catch', 'class', 'const', 'continue',
//   'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally',
//   'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface',
//   'let', 'new', 'package', 'private', 'protected', 'public', 'return', 'static',
//   'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
//   'with', 'yield'
// ];

// function isReserved(name) {
//   return RESERVED_KEYWORDS.includes(name);
// }

// console.log(isReserved('monkey')); // false
// console.log(isReserved('patch'));  // false
// console.log(isReserved('switch')); // should be: true

//random recipe generator


// Picks n random elements from an array,
// and returns a new array with those elements.
function random(array, n) {
  if (n === undefined) {
    n = 1;
  }

  let elements = array.slice();
  let randomElements = [];

  while (n > 0 && elements.length > 0) {
    let randomIndex = Math.floor(Math.random() * elements.length);
    let randomElement = elements[randomIndex];

    randomElements.push(randomElement);
    elements.splice(randomIndex, 1);
    n--;
  }

  return randomElements;
}

// Ingredients

let ingredients = ['rice', 'green bell pepper', 'mushrooms', 'carrot', 'kebab',
  'spinach', 'soy bean sprouts', 'mashed potatoes', 'corn', 'cucumber', 'peas'];

let spices = ['peri peri', 'cinnamon', 'nutmeg', 'cardamom', 'ground ginger',
  'poppy seed', 'cumin'];

let extras = ['peanuts', 'sesame seeds', 'egg', 'wasabi', 'soy sauce'];

// Name

let adjective  = ['Delicious', 'Hot', 'Exotic', 'Creative', 'Festive', 'Dark'];
let firstNoun  = ['Power', 'After Work', 'Holiday', 'Disco', 'Late Night'];
let secondNoun = ['Mix', 'Delight', 'Bowl', 'Chunk', 'Surprise', 'Bliss'];

// Generate!

let dishName = random(adjective) + random(firstNoun) + random(secondNoun);
let dish = random(ingredients, 3) + random(spices, 2) + random(extras, 1);

debugger;

console.log('How about: ' + dishName.join(' '));
console.log('You need: ' + dish.join(', '));

for (let i = 0; i < 10; i += 1) {
  if (i === 5) continue;
  else console.log(i);
}

'is2 th1s a3 t4st'.split(' ').sort((a, b) => {
  
})



function formatDuration (seconds) {
  if (seconds === 0) return now;
  let times = [0,0,0,0,0];
  let divisions = [3153600, 86400, 3600, 60, 1]
  let strings = ['year', 'day', 'hour', 'minute', 'second'];
  times.forEach((time, index, self) => {
    if (Math.floor(seconds/divisions[index]) > 0) {
      self[index] = Math.floor(seconds/divisions[index]);
      seconds -= self[index] * divisions[index];
    };
  });
  let numStrings = times.filter(value => value).length;
  let returnString = '';
  let conjunctions = ['', 'and', ', ']
  times.forEach((time, index, self) => {
    if (time !== 0) {
      returnString += `${time} ${strings[index] + ((time  > 1) ? 's' : '')}${conjunctions[Math.sign(numStrings - 2) + 1]}`
    }
  })
}
