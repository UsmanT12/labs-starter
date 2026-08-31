import { TELNET_MSG_END } from "./telnetUtility.ts"

// Stores characters sent along the Telnet connection for a particular client.
export class MessageBuffer {
  // Message-in-progress being received from a client.
  buffer : string = ""

  /// Add 'chunk' to the buffer and return any full Telnet messages
  /// received so far (removing them from the buffer when found).
  receiveFromClient( chunk : string ) : string[] {
    this.buffer += chunk
    const delimiter : string = TELNET_MSG_END
    let full_messages : string[] = []

    /// TODO:
    /// (1) Use 'string.split' to create an array of strings 'messages' from 'this.buffer' 
    ///     based on splitting 'this.buffer' wherever it contains 'delimiter'.
    ///     If 'this.buffer' ends with 'delimiter', then 'messages'
    ///     will have an empty string at the back. If 'this.buffer' contains no instance of 'delimiter',
    ///     then 'messages' will contain one string identical with 'this.buffer'.  
    /// (2) Let 'this.buffer' now become the _last_ string (possibly an empty string) in 'messages',
    ///     and let 'full_messages' contain all the strings except the last one in 'messages'.
    ///     (Consider 'Array.slice').
    /// (3) Return the strings of 'full_messages' with 'handleBackspaces' applied (consider 'Array.map').

    return full_messages
  }

  /// Return a version of 'txt' where all contained backspaces
  /// are treated as delete-previous-character actions, e.g.,
  /// 'ca\bt' turns into 'ct' and 'abc\b\b\b\b\b' turns into ''.
  private handleBackspaces( txt : string ) : string {
    const charStack : string[] = [];
    for( const c of txt ) {
      if( c == '\b' ) {
        if( charStack.length ) {
          charStack.pop();
        }
      } else {
        charStack.push( c );
      }
    }
    return charStack.join( '' );
  }
}