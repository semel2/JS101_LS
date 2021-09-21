
function objectHasProperty(object, property) {
  return object[property] ? 1 : 2;
}

let obj = {
  something: 3,
  enabled: false,
  result: undefined,
};

objectHasProperty(obj, 'something'); // returns 1
objectHasProperty(obj, 'active');    // returns 2
console.log(objectHasProperty(obj, 'result'));