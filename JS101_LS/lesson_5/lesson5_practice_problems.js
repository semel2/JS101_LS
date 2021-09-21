/// Practice problems for lesson 5

//1. 
arr.sort((a,b) => Number(b) - Number(a))

//2.
books.sort((a,b) => Number(a.published) - Number(b.published))

//3. 
arr1[2][1][3]
arr2[1].third[0]
arr3[2].third[0][0]
obj1.b[1]
Object.keys(obj2.third)[0]

//4.
arr1[1][1] = 4
arr2[2] = 4
obj1.first[2][0] = 4
obj2.a.a[2] = 4

//5. 
Object.values(munsters).map(object => {Object.values(object)}).
filter(subArray => subArray[1] === 'male').
map(subArray => subArray[0]).
reduce((accumulator, element)=> accumulator+element)

//6. 
Object.keys(munsters).forEach(key => {
  console.log(`${key} is a ${munsters[key].age}-year-old ${munsters[key].gender}.`)
})

//7. 

// a will still be 2 and b will be [3,8]

//8. 


let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(array => {
  array.forEach(word => {
    word.split('').forEach(letter => {
      if ('aeiouAEIOU'.includes(letter)) {
        console.log(letter);
      }
    })
  })
  }
)

//9. 

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

arr.forEach(subArray => {
  if (typeof(subArray[0]) === 'string') {
    subArray.slice().sort()
  } else subArray.slice().sort((a,b) => a - b)
}
)

arr.map(subArray => {
  if (typeof(subArray[0] === 'string')) {
    return subArray.slice().sort();
  } else return subArray.slice().sort((a,b) => a-b);
  }
)

//10. 

arr.map(subArray => {
  if (typeof(subArray[0] === 'string')) {
    return subArray.slice().sort((a,b) => {
      if (a > b) return -1;
      else if (b > a) return 1;
      else return 0;
    })
  }
  else return subArray.slice().sort((a,b) => b - a);
})

//11. 
let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

arr.map(subObject => {
  let returnSubObject = {};
  for (let key in subObject) {
    returnSubObject[key] = subObject[key] + 1;
  }
  return returnSubObject;
})

//12. 
let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

arr.map(subArr => subArr.filter(number => number % 3 === 0))

//13. 
let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
arr.sort((a,b) => {
  return a.reduce((accumulator, element) => {
    if (element % 2 === 1) return accumulator + element;
    else return accumulator;
  }, 0) - b.reduce((accumulator, element) => {
    if (element % 2 === 1) return accumulator + element;
    else return accumulator;
  })
})

// or 

arr.sort((a, b) => {
  return a.filter(number => number % 2 === 1)
          .reduce((accumulator, element) => accumulator + element, 0)
        -b.filter(number => number % 2 === 1)
          .reduce((accumulator, element) => accumulator + element)          
})

//14. 
let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

Object.values(obj).map(subObject => {
  if (subObject.type === 'fruit') {
    return subObject.colors.map(word => {
      return word[0].toUpperCase() + word.slice(1)
    });
  } else if (subObject.type === 'vegetable') {
    return subObject.size.toUpperCase();
  }
})

//15. 

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

arr.filter(subObject => {
  let returnValue = 1;
  Object.values(subObject).forEach(subArray => {
    subArray.forEach(number => {
      if (number % 2 !== 0) returnValue = 0;
    })
  })
  return returnValue;
})

// or

arr.filter(subObject => {
  return Object.values(subObject).every(subArray => {
    return subArray.every(number => number % 2 === 0)
  })
})

//16. 

let newObj = {};
let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
arr.forEach(subArr => {
  newObj[subArr[0]] = subArr[1];
})

//17. 

function uuidGenerator () {
  let returnString = '';
  let possible = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    if ([8, 13, 18, 23].includes(i)) {
      returnString = returnString + '-';
    } else {
      returnString = returnString + possible.charAt(Math.floor(Math.random() * possible.length))
    }
  }
  return returnString;
}