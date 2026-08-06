import { Client } from "./client.ts"
import { Matchup } from "./matchup.ts"

/// Manages the player waiting to get into a game
/// as well as multiple currently running games.
export class Lobby {
    // If non-null, this is the one client who isn't matched with anyone
    private unmatchedClient : Client | null = null;
    // A mapping from a 'Client' to the matchup that client is currently in.
    private clientToMatchup : Map<Client,Matchup> = new Map<Client,Matchup>();
    private totalClientsEverSeen : number = 0

    /// Return a reasonable default name to assign to a new client.
    getNameForNewClient() : string {
        // inelegant but will suffice for this lab.
        return `Player ${ this.totalClientsEverSeen + 1 }`;
    }

    /// Return the 'Matchup' that 'client' is a part of, or null
    /// if 'client' is not part of one.
    getMatchup( client : Client ) : Matchup | null {
        const foundMatchup : Matchup | undefined = this.clientToMatchup.get( client );
        return foundMatchup ?? null;
    }

    /// Add 'client' to the 'Lobby' ('client' must have never 
    /// been added to this `Lobby` before). Send a greeting message
    /// to `client` and get them matched up, if possible.
    addClient( client : Client ) {
        this.totalClientsEverSeen += 1;
        client.sendMsg( 
            `WELCOME ${client.player.name} (change your name using SETNAME command).` );
        this.tryMatchingClient( client );
    }

    /// Respond to 'client' disconnecting from the server.
    /// If 'client' is in a matchup with some opponent X, then
    /// remove that matchup. If there is already a client
    /// waiting for a matchup, then match them up with X; otherwise
    /// let X become the new client waiting for a matchup.
    removeClient( client : Client ) {
        // TODO
        // Hint: you should be able to use `tryMatchingClient` in here.
        // Hint: If 'client' is currently in a `Matchup`, then you'll need
        //       to make this `Lobby` completely forget about that `Matchup`
        //       by deleting TWO keys from `clientToMatchup`.
    }

    /// If there is already a client waiting for a matchup,
    /// then start one between them and 'client'; otherwise,
    /// have 'client' become the one waiting for a matchup
    /// within this 'Lobby'.
    private tryMatchingClient( client : Client ) {
        if( this.unmatchedClient === null ) {
            this.unmatchedClient = client;            
            client.sendMsg( 'WAITING for another player to connect' )
            console.log( "A player is waiting in the lobby." )            
        } else {
            console.log( "Two clients have matched and are about to start their first game." )  
            
            const xClient : Client = this.unmatchedClient;
            const oClient : Client = client;

            for( const client of [ xClient, oClient ] ) {
                const otherClient = client === xClient ? oClient : xClient;
                client.sendMsg( `MATCH starting between you and ${otherClient.player.name}`)
            }

            const newMatchup : Matchup = new Matchup( xClient, oClient );
            newMatchup.startGame();
            // Note how çlientToMatchup is why 'newMatchup' doesn't
            // go out of existence once this method-call returns; it's
            // also how this 'Lobby' is able to access 'newMatchup'
            // in future method calls.
            this.clientToMatchup.set( xClient, newMatchup );
            this.clientToMatchup.set( oClient, newMatchup );
            this.unmatchedClient = null; // Everyone is in a game now.
        }
    }
}
