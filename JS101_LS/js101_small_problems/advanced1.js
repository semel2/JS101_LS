function isAValidMessage(message){
  let wordArray = [];
  for (let idx = 0; idx < message.length; idx += 1) {
    if ('123456790'.includes(message[idx])) {
      if ('1234567890'.includes(wordArray[wordArray.length - 1])){
        wordArray[wordArray.length - 1] += message[idx];
      } else wordArray.push(message[idx]);   
    } else if ('1234567890'.includes(wordArray[wordArray.length - 1])) {
      wordArray.push(message[idx]);
    } else wordArray[wordArray.length - 1] += message[idx];
  };
  debugger;
  for (let idx = 0; idx < wordArray.length; idx += 2) {
    if (wordArray[idx + 1] === undefined) return false;
    if (wordArray[idx + 1].length !== parseInt(wordArray[idx])) return false;
  };
  return true;
}

console.log(isAValidMessage("4code13hellocodewars"))