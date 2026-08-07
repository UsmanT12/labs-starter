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
null || false || ""             // evals to ""
15 || false || "" || 20         // evals to '15'
11 || 12 || 13                  // evals to '11'

// Turns out that logical OR expressions in JavaScript do _not_
// always evaluate to a boolean. An expression "b || c || d || e..." will evaluate to either
//    (1) the first non-"falsy" value found moving from left to right, or
//    (2) the "falsy" value at the right end.
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





