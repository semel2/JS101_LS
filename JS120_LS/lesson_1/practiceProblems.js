// let book1 = {
//   Title: 'Mythos',
//   Author: 'Stephen Fry',

//   getDescription() {
//     console.log(`${this.Title} was written by ${this.Author}.`)
//   }
// };

// let book2 = {
//   Title: 'Me Talk Pretty One Day',
//   Author: 'David Sedaris',

//   getDescription() {
//     console.log(`${this.Title} was written by ${this.Author}.`)
//   }
// };

// let book3 = {
//   Title: "Aunts aren't Gentlemen",
//   Author: 'PG Wodehouse',

//   getDescription() {
//     console.log(`${this.Title} was written by ${this.Author}.`)
//   }
// }

// console.log(book1.getDescription());
// console.log(book2.getDescription());
// console.log(book3.getDescription());

//3,4,5,6,7.

function createBook(title, author, read = false) {
  let book = {    
    Title: title,
    Author: author,
    read: read,

    getDescription() {
      console.log(`${this.Title} was written by ${this.Author}. I ${this.read ? 'have' : "haven't"} read it.`)
    },
    
    readBook() {
      this.read = true;
    }
  };

  return book;
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"

book1.readBook();
console.log(book1.getDescription());