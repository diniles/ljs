## Useful methods in Javascript

#### https://f-ganbaru365.medium.com/useful-methods-in-javascript-da08af267c5f

I've been learning JavaScript for almost three months now. I feel like I’ve got the basics down, so I’ve tried to start
Codewars and LeetCode to solve algorithm problems, but I can’t seem to get my hands on anything on my own.
It’s been almost a month since the year 2022 started. In order to make sure that my enthusiasm to solve 100 algorithm
problems this year doesn’t end up as a mere sigh, I’d like to write down some of the useful (or maybe it’s just my
opinion) JavaScript methods I’ve encountered here as a personal reminder.
If you find any flaws or problems, please feel free to comment on them, and I will be happy to hear from you.

So let’s get to it!

### Spread syntax

The spread syntax can be used when all the elements of an object or array need to be put into some kind of list. Pass
all values in an array using the spread syntax and the array or object name.

### Map()

The map() method creates a new array populated with the results of calling a provided function on every element in the
calling array. map() calls the given callback function once for each element in the order of the array and creates a new
array from the result. The callback will be called only for the elements of the array that are assigned values.

#### Exp.01

In this problem, you will create a function that squares each digit of a given number.
It uses spread syntax to copy each element of the argument num to a new array, and converts it to a string using
toString().
Then, with map(), each element of the array is multiplied by the extracted element to express the square.
The new array is then joined with join() to return the result of joining the good elements.

    //quare every digit of a number and concatenate them
    
    //Treat the argument num as a string, and square each of the digits with the map function. After combining all of the arrays, it converts them to integers and returns the result.
    
    function squareDigits(num){
        return parseInt(([...num.toString()].map((n) => n * n)).join(''));
    }
    
    //squareDigit(9119)
    //return 811181

### Slice()

slice() does not modify the original array but returns a shallow copy of the part with the specified start and end
positions as a new array.

### Join()

join() creates and returns a new string that concatenates all elements of the array in order. The default is
comma-separated unless you specify a delimiter.

### Split()

split() splits a string into substrings and returns them in an array. it takes two parameters, both of which are
optional. One of its features is that it does not modify the original string and can only be used for strings.

### Splice()

splice() is used to add and remove elements from an array and returns an array of the removed elements.
To add an element: array.splice (index, number of elements, element)
To remove an element: array.splice (index, number of elements)
One of its features is that it modifies the array itself and can only be used for Arrays.

#### Exp.02

In this problem, we will create a function that returns an inverted string of a given string.
Store the argument str as a new array one character at a time with split(), and reverse() all the elements. It then
joins the good elements of the array with join() and returns the result.

    // Reverse the provided string.
    //You may need to turn the string into an array before you can reverse it.
    // Your result must be a string.
    
    function reverseString(str) {
        return str.split("").reverse().join("");
    }
    reverseString("hello");
    //return "olleh"

### Math.floor()

Math.floor() function returns the largest integer that is less than or equal to a given number. Since floor() is a
static method of the Math object, it cannot be used by itself.

### Math.random()

The Math object’s Math.random() method generates and returns a random number, a floating-point number between 0 and 1.
It is not possible to specify a seed in the random number (like a set value to generate the random number).

#### Exp.03

In this problem, we want to display a random element from a given array.
By using Math.random() to generate random numbers from 0~99 and multiplying by the length of the array, we can generate
random numbers up to the length of the array. By using Math.floor() to truncate the decimal point, we can randomly
retrieve the elements of the array.

    //Write a function that will randomly output the elements of the array ['good morning', 'hello', 'good night']. (This should be based on the assumption that elements will be added to the array.)
    
    const array = ['good morning','hello','good night'];
    const greeting = array[Math.floor(Math.random() * array.length)];
    
    console.log(greeting);
    //'good morning' or 'hello' or 'good night'

### ParseInt()

The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical
numeral systems).

### RegExp

Regular expressions are not methods, but they are used to search the text for patterns. Using this method, you can
easily search for a specified string among a lot of text.

### filter()

filter() is a method to filter the contents of an array by specific conditions.
It is used to determine the individual elements based on the conditions specified in the callback function, and to
extract only the elements that match the conditions.

#### Exp.04

In this problem, you will complete a function that returns the total number of elements of a given “smiley face”.
Example of a valid smiley face::) :D ;-D :~)
Example of an invalid smiley face:;( :> :} :]
In the case of an empty array, 0 will be returned.
Use filter() to create a new array that matches the arrow function, and use length to find the number of matches.

    function countSmileys(arr) {
    //filter()でアロー関数に一致する新たな配列をつくり、その個数をlengthで求める
        return arr.filter(x => /^[;:][-~]?[)D]/.test(x)).length;
    }
