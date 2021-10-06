// //1. 

// function createPet(animal, name) {
//   return {
//     animal,
//     name,
//     sleep() {console.log('I am sleeping')},
//     wake() {console.log('I am awake')}
//   };
// }

// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

//2.

let PetPrototype = {
  sleep() {console.log('I am sleeping')},
  wake() {console.log('I am awake')},
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


//4- Subtyping with constructors and prototypes

/*

1. This code will log Hello!
2. This code will not work; it will throw an error because the prototype chain does not contain the function bye().
3. This code will log an empty message. => it logs undefined, not an empty message
4. This code will log Goodbye.
5. This code will throw an error, since it is called on the constructor and not on a Hello object.
*/

