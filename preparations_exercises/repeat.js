function repeat (number, string) {
  let temp = '';
  for (let i = 0; i < number; i+=1) {
    temp +=  string;
  }
  return temp;
}

console.log(repeat(3, 'ha'))

let string = "A pirate I was meant to be! \n Trim the sails and roam the sea!"

console.log(string);