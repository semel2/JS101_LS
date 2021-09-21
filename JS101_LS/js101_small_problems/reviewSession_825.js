let words = [["hunter", "spear"], ["gatherer", "sack"]];

function pluralize(array) {
    return array.map(words => {
        words[0] += "s";
        words[1] += "s";
        return words;
    });
}

console.log(pluralize(words));
console.log(words);

// If it says "what does this log and why?", answer what it logs and then
// start explaining.

// When you're talking about an object/array getting initialized,
// make sure you mention it's initialized with the reference to the object/array

// Explain what is happening here

const greeting = "Hello!";
function change(greeting) {
    greeting = "Hi!";
    return greeting;
}

console.log(change());
console.log(greeting);

// The big ones: scope, variable shadowing, pass by reference/pass by value
// Don't bother writing out the variable values, just keep it high-level