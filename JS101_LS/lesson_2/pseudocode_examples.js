/*
A function that returns the sum of two numbers

START

GET number1 and number2
PRINT number1 + number2

END
*/

/* 
A function that takes an array of strings, and returns a string that is all those strings concatenated together

START

#Given an array of strings called stringArray

SET returnString = ''

FOR each element in stringArray:
  READ stringArray element value onto end of returnString

PRINT returnString

END
*/

/* 
A function that takes an array of integers, and returns a new array with every other element

START

#Given an array of integers called intArray

SET returnArray = []

SET iterator = 1

WHILE iterator <= length of intArray
  IF iterator%2 = 0
    READ intArray value at iterator onto end of returnArray 
  ELSE
    skip to the next iteration
  
    iterator = iterator + 1

PRINT returnArray

END

*/