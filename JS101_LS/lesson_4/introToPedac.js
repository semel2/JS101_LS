// PROBLEM:

// Given a string, write a function `palindromeSubstrings` which returns
// all the substrings from a given string which are palindromes. Consider
// palindrome words case sensitive.

/* input: string
output: array of strings (if no strings exist, empty array)
rules: 

  Explicit requirements: 
  - palindromes need to be the same case
  
  Implicit requirements: 
  - Empty string or string without any palindromes should return empty array
  - palindromes are 2 letters or longer
// Algorithm:
//  - declare a result variable and initialize it to an empty array
//  - create an array named substrArray that contains all of the
//    substrings of the input string that are at least 2 characters long.
/*for this part:
  - for loop from 0 to length of word - 1 
  - nested for loop from outer loop counter to length of word (start looping at outer loop counter + 1) (maybe make this a do/while loop?)
  - push word.slice to substring array for all substrings from outer loop counter to outer loop counter + 1   

//  - loop through the words in the substrArray array.
//  - if the word is a palindrome, append it to the result
//    array
//  - return the result array