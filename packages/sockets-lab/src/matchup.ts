import { Client } from "./client.ts"
import { Mark, ITicTacToe } from "./ticTacToeInterface.ts"

/// Coordinates a series of games between
/// the same two players.
export class Matchup {
    readonly X_PLAYER_IDX : number = 0;
    readonly O_PLAYER_IDX : number = 1;
    readonly marks : [ Mark, Mark ] = [ 'X', 'O' ];
    private clients : [ Client, Client ]
    private ticTacToe : ITicTacToe

    constructor( xClient : Client, oClient : Client ) {
        this.clients = [ xClient, oClient ];
        this.ticTacToe = this.makeFreshBoard();
    }

    /// Return the 'Client' who is playing the indicated
    /// 'mark' within the current game.
    private clientByMark( mark : Mark ) : Client {
        return this.clients[ mark == 'X' ? this.X_PLAYER_IDX : this.O_PLAYER_IDX ];
    }

    /// Return the opponent of 'client', which must be one 
    /// of the two in 'this.clients'.    
    otherClient( client : Client ) : Client {
        if( client === this.clients[ 0 ] ) {
            return this.clients[ 1 ];
        } else if ( client === this.clients[ 1 ] ) {
            return this.clients[ 0 ];
        } else {
            throw new Error( "The given client is not part of this Matchup." )
        }
    }

    /// Start up a game between the two clients, making
    /// sure to send these clients the appropriate Telnet
    /// messages.
    startGame() {
        this.ticTacToe = this.makeFreshBoard();
        // TODO: the rest
    }

    /// Respond to 'client' attempting to make a move, which
    /// may or may not be be legal (it might not be 'client''s
    /// turn, or the specified position might not be valid).
    /// If the move is valid, make it and send appropriate 
    /// messages to the two players (including handling an end-game
    //  situation, if that occurs); otherwise send appropriate
    /// messages to 'client' letting them know their mistake.
    playerAttemptMove( client : Client, row : number, col : number ) {
        if( !this.clients.includes( client ) ) {
            console.log( "ERROR: unrecognized 'client' trying to make a move in match." )
            return;
        }

        // TODO: the rest
    }
        
    /// Send a message to each of the two clients showing 
    /// them the current state of the board.
    private showBoardToBoth() {
        const boardMsg : string = this.ticTacToe.msgShowingBoard();
        for( const client of this.clients ) {
            client.sendMsg( boardMsg );
        }
    }

    private makeFreshBoard() : ITicTacToe {
        // TODO: Return a new instance of your 'TicTacToe' class 
        throw new Error("Not done");
    }
}
