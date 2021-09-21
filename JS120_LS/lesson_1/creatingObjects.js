// let raceCar = {
//   make: 'BMW',
//   fuelLevel: 0.5,
//   engineOn: false,

//   startEngine() {
//     this.engineOn = true;
//   },

//   drive() {
//     this.fuelLevel -= 0.1;
//   },

//   stopEngine() {
//     this.engineOn = false;
//   },

//   refuel(percent) {
//     if ((this.fuelLevel) + (percent / 100) <= 1) {
//       this.fuelLevel += (percent / 100);
//     } else this.fuelLevel = 1;
//   }
// }

//Functions as object factories

function createCar(make, fuelLevel, engineOn) {
  let car = {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    startEngine() {
      this.engineOn = true;
    },
  
    drive() {
      this.fuelLevel -= 0.1;
    },
  
    stopEngine() {
      this.engineOn = false;
    },
  
    refuel(percent) {
      if ((this.fuelLevel) + (percent / 100) <= 1) {
        this.fuelLevel += (percent / 100);
      } else this.fuelLevel = 1;
    }
  };
  return car;
}

let raceCar = createCar('Jaguar', 0.4, false);
console.log(raceCar);