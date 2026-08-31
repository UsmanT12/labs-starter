import fs from "node:fs/promises"; // used for loading files _asynchronously_.

/*
Array's 'map' method
*/

const myNumbers : number[] = [ 10, 11, 12 ];

// When you call the 'map' method on an array, you pass in a mapping
// function as an argument. The result is a new array whose contents
// come from calling the mapping function on each of the original 
// array's elements.

const timesTwo : number[] = myNumbers.map( ( num : number ) : number => num * 2 );
const asStrings : string[] = myNumbers.map( (num : number) : string => `${num}` )
const arrOfArrays : number[][] = myNumbers.map( (num : number ) : number[] => [ num ] );

// Optionally, the mapping function you pass to 'map' can have TWO parameters:
// (1) an element from the original array (same as before), and
// (2) the index of said element within the original array.

const asStrings2 : string[] = myNumbers.map( 
    ( num : number, idx : number ) : string => `At index ${idx} is value ${num}.` )
// Contents will be 
//  "At index 0 is value 10."
//  "At index 1 is value 11."
//  "At index 2 is value 12."



/*
Splitting and joining strings.
*/

const fruitsText : string = "apple banana grapefruit"

// contents will be [ "apple", "banana", "grapefruit" ].
// Note that 'split' is a method of 'string'.
const fruitsSplit : string[] = fruitsText.split( " " ); 

// contents will be same as 'fruitsText'. Note that 'join'
// is a method of 'Array'.
const fruitsTextRecombined = fruitsSplit.join( " " );

// The lines of a text file are delineated using newline (\n)
// characters.
const typicalFileContents : string = "First line\nSecond line\nThird line."
const fileLines : string[] = typicalFileContents.split( "\n" );
const recombined : string = fileLines.join( "\n" );

// Potential confusion:
// You might remember that 'string' is a _primitive_ in JavaScript, and
// not an object. How can a primitive type have _methods_ like 'split'
// and 'join'? Remember that the primitive-vs-object-vs-class taxonomy
// in JavaScript is a little more complicated than we're used to. For now,
// suffice it to say that yes, 'string' is a primitive type and also
// 'string' has methods.



/*
Logical OR in JavaScript
    This works a little differently from what you might expect.
*/

const a : boolean = true
const b : boolean = false

// You should already be able to predict what these expressions
// evaluate to:
//
false || false                  // evals to 'false'
false || true                   // evals to 'true'
true || true                    // evals to 'true'
false || false || true || false // evals to 'false'
a || b                          // evals to 'true'
b || a                          // evals to 'true'

// But look at these:
false || 15 || 0                // evals to '15'
false || undefined || 0 || null // evals to 'null'

// Turns out that logical OR expressions in JavaScript do _not_
// always evaluate to a boolean. An expression "a || b || c || d || e..." will evaluate to either
//    (1) the first non-"falsy" value found moving from left to right, or
//    (2) the "falsy" value at the right end (if all values are falsy).
// "Falsy" values include 0, "", null, undefined, NaN, and of course 'false' itself.
// A "truthy" value is a non-"falsy" one.



/*
Object Destructuring
    We need to revisit _objects_ in JS. We're talking about "vanilla" JS
    objects here; that is, classes are not involved. (Remember that JS had
    objects well before classes were addede to the language.)
*/

// Let's say we have an object with two fields, like so:

interface Student
{
    firstName : string,
    identifier : number
}

// Should all be familiar so far: we are creating 
// a JS object whose fields' names/types match the 'interface' type above.
const student : Student = { firstName : "Iamesu", identifier : 123444 }

// This is "object destructuring", which can also be thought of as "object unpacking".
// We are introducing a new name 'firstName' which is bound to whatever the property 'firstName'
// is bound to within 'student'.
const { firstName } = student
console.log( `${firstName}`) // outputs 'Iamesu'

// The new name we create does not have to match the property name; use the colon
// to achieve this.
//
// This creates a new name 'fName' bound to whatever 'firstName' is bound to in 'student'.
const { firstName : fName } = student
console.log( `${fName}`) // outputs 'Iamesu'

// We can "unpack" multiple properties at a time
const { firstName : fn, identifier : id } = student
console.log( `fn=${fn} and id=${id}`) // Outputs "fn=Iamesu and id=123444"

// There's something missing: _type annotations_.
// Whenever we introduce new names, they should come with type annotations.
// But how do we do that for 'fn', 'id', etc.?

// We can't do this:
//     const { firstName : string } = student
// Because the colon already has a different purpose in the context 
// of object destructuring.

// Instead, we need to do this
const { firstName : fn2 } = student as { firstName : string }
const { identifier : id2 } = student as { identifier : number }

// The above may seem unnecessary, given that 'student' itself
// is an instance of a type defined by our own 'Student' type.
// But it's good to use this kind of type annotation when 
// unpacking properties from an object whose type isn't defined
// in your own code--you'll see this soon in `index.ts`.



/*
Asynchronous programming with "promises".
    Asynchronous programming is one of the more difficult programming
    concepts in this course. Let's explore it in the context of file loading. 
    We'll use 'fs'--the exports defined in the module "node:fs/promises"
    (see top of this file). This module is design to let us load 
    files _asynchronously_.
*/

// Imagine that this is the path to a very large file, one so large 
// that simply loading it into RAM would take five seconds.
const pathToHugeFile : string = "nonexistent/nonexistent/hugeFile.txt"

// Question: How long do you think it will take this 'readFile'
// call to end? Five second, right? No: the call will return
// more or less instantly. Thus, JS will immediately move to
// the 1+2+3 _while the huge file is in the process of being loaded_.
// So when you call 'readFile', you don't block JavaScript until
// the file is fully loaded; rather, you are starting an
// asynchronous operation that runs in the background; meanwhile
// the main JavaScript code-processor continues on to 'whatever'.
fs.readFile( pathToHugeFile )
const whatever : number = 1 + 2 + 3

// This is what actually gets returned by 'readFile'. It is 
// literally the promise of some future 'Buffer'object, which
// will become available once the huge file has finished loading.
const promiseForData : Promise<Buffer> = fs.readFile( pathToHugeFile )

// When you're working with an asynchronous process, you need to say
// in advance what should be done once that process completes.
// A Promise object has a 'then' method that does just that.
// 
// 'then' takes as its argument a _callback_ function. The callback
// takes as its argument the data produced by the process--a 'Buffer',
// in the case of a Promise<Buffer>.
promiseForData.then( ( buffer : Buffer ) => 
{
    console.log( "Finished loading the whole file." );
} );

// What if something goes wrong and the Promise has to abort?
// You are allowed to specify what should be done in that situation
// by passing a different callback to the Promise method 'catch'.
promiseForData.catch( ( reasonForFailure : Error ) =>
{
    console.log( `Something went wrong: ${reasonForFailure.message}` );
} );

// It's typical to do all the preceding in a single chained statement:
fs.readFile( pathToHugeFile )
    .then((data : Buffer) => {
        console.log( "Successfully loaded the file." );        
    })
    .catch((err: Error) => 
    {
        console.log( `Something went wrong: ${err.message}`);
    });

// But how is that legal? Aren't we calling Promise's 'catch' method on the return
// value of Promise's 'then' method? Yes, we are--this is what promise chaining looks
// like. Technically, 'then' returns _another_ Promise object, and it's that other
// promise object that we're calling 'catch' on.
//
// This kind of chaining is very useful and lets us arrange for long sequences of 
// asynchronous jobs to be handled one after the other, each operating on the 
// data produced by the previous one. 


// Before we conclude, consider this example, which
// has a major error in it (along with some clues that
// will be useful for the TODO in 'index.ts'):

const wordToFind : string = 'spinach'
let indexOfLineWhereWordFirstAppears = -1

fs.readFile( pathToHugeFile )
    .then( ( data : Buffer ) => {
      const fileAsLongString : string = data.toString();
      const linesOfFile : string[] = fileAsLongString.split("\n");
      for( let lineIdx  = 0; lineIdx < linesOfFile.length; lineIdx++ ) {
        const line : string = linesOfFile[ lineIdx ];
        if( line.indexOf( wordToFind ) !== -1 ) {
            indexOfLineWhereWordFirstAppears = lineIdx;
            break;
        }
      }
    } )
    .catch( ( err : Error ) =>
    {
        console.log( `Something went wrong: ${err}.`)
    } );

console.log( `The word first occurs at line ${indexOfLineWhereWordFirstAppears} of the file.`)

// Do you see the issue?
// The console.log() call will print "-1" as the index where the sought-after word first 
// occurs, instead of the actual line number. That's because the 'log' call above will 
// run _immediately_. To fix the code above, you'd need to change it so that the 
// 'log' call doesn't happen until the file has actually been loaded and the word's
// first location has actually been determined.
