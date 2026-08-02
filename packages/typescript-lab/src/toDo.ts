/*
Types Exercises
*/

// TODO: Use 'type' to define a datatype named 'Mark' that
// is allowed to be either the string "X" oer the string "O".

// TODO: Define a datatype named 'OptionalMark' that is 
// allowed to be either a 'Mark' or null.

// TODO: Define a datatype named 'Row' that is an array
// containing exactly three 'OptionalMark's.

// TODO: Define a datatype named 'Board' that is an
// array containing exactly three 'Row's.



/*
Functions Exercises
*/

// TODO: Test this function (put your tests in
//       tests/toDo.tests.ts) and then write its
//       body here. The header and purpose
//       statement are given to you below.
/*
// Return whether 'board' does not contain a 'null'.
export function boardFull( board : Board ): boolean
{    
}
*/


// TODO: Test and write this function.
/*
// Return whether integer 'row' and 'column' identify a legal
// position on the board which is not already marked.
export function boardLegalMove( board: Board, row : number, column : number ): boolean
{    
}
*/

// TODO: Test and write this function.
/*
// Return the 'Mark' of the winner, or null of there is no winner.
export function winner( board : Board ): OptionalMark
{
}
*/


// TODO: test and write this function.
/*
// Return a three-line string representing the state of 'board'. For example:
// "BOARD X - - 
//        - X O
//        O - -"    
//  Each of the three lines should end with two whitespace characters '\r' and '\n'.
//  Make sure that the rows show up aligned with each other (you're setting up
//  something that will be useful in the next lab).
export function boardAsStr( board : Board ): string
{    
}
*/



/*
Interfaces and Classes Exercises
*/

// TODO: Complete this class. Most of its
// methods will be very easy; you'll just call
// the functions you already defined above.
/*
export class TicTacToe {
    board: Board;
    // This keeps track of whose turn it is: 'X' or 'O'.
    nextToPlay: Mark;

    // Return a message displaying the board.
    msgShowingBoard(): string
    {
    }

    // Return whether integer 'row' and 'column' identify
    // a valid next move.
    legalMove( row : number, column : number ): boolean
    {
    }

    // If 'row' in [0,2] and 'col' in [0,2] represent a valid next move, then 
    //    (1) mark the board with 'nextToPlay' at the indicated position,
    //    (2) switch 'nextToPlay' to the other 'Mark', and
    //    (3) return 'true'
    // Otherwise, just return 'false'.
    makeMove( row : number, col : number ) : boolean
    {
    }

    // Return whether all spaces have been marked.
    full() : boolean
    {
    }

    // Return the 'Mark' of the winner, or null of there is no winner.
    checkForWinner() : OptionalMark
    {
    }
}
*/







