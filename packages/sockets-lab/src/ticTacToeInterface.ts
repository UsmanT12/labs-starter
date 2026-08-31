export type Mark = "X" | "O"
export type OptionalMark = Mark | null;
export type Row = [OptionalMark, OptionalMark, OptionalMark];
export type Board = [Row, Row, Row];

export interface ITicTacToe {
    board: Board;
    nextToPlay: Mark;

    /// Return a Telnet message displaying the board, e.g.
    /// "BOARD X - - 
    ///        - X O
    ///        O - -"    
    getBoardMsg : () => string;

    /// Return whether integer 'row' and 'column' identify a legal
    /// position on the board which is not already marked.
    isLegalMove: ( row : number, column : number ) => boolean;

    /// Mark the board at the indicated 'row' in [0,2] and
    /// 'col' in [0,2] with the current mark; then alternate
    /// the current mark. Return true unless the space was already
    /// occupied, in which case return false.
    makeMove : ( row : number, col : number ) => boolean;

    /// Return whether all spaces have been marked.
    isFull : () => boolean;

    /// Return the 'Mark' of the winner, or null of there is no winner.
    checkForWinner: () => OptionalMark;
}
