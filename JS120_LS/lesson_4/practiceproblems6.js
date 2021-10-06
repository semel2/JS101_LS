//2. 

class Greeting {
  constructor() {}

  greet(string) {
    console.log(string);
  }
}

class Hello extends Greeting {
  constructor() {
    super();
  }

  hi() {this.greet('Hello')};
}

class Goodbye extends Greeting {
  constructor() {
    super();
  }

  bye() {this.greet('Goodbye')};
}

let hello = new Hello;
let goodbye = new Goodbye;

hello.hi();
goodbye.bye();