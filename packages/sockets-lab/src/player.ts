export interface Player {
  name: string;
  score: number;
}

/// Return whether 'name' is a valid player name.
export function isValidPlayerName( name : string ) : boolean {
    return name.length > 0    
}
