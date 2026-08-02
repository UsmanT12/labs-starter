import { TELNET_MSG_END } from "./telnetUtility.js"

// Stores characters sent along the Telnet connection for a particular client.
export class MessageBuffer {
  // Message-in-progress being received from a client.
  buffer : string = ""

  /// Add 'chunk' to the buffer and return any full Telnet messages
  /// received so far (removing them from the buffer when found).
  receiveFromClient( chunk : string ) : string[] {
    this.buffer += chunk
    const delimiter : string = TELNET_MSG_END
    const full_messages : string[] = []

    /// TODO:
    /// If the buffer now contains
    /// one or more Telnet messages (substrings ending with TELNET_MSG_END)
    /// then remove these messages from the buffer and return the 
    /// delimiter-trimmed messages. For instance, if the buffer contains
    /// "message 1\r\nmessage 2\r\nmessa" then the return value should be
    /// ["message 1","message 2"] and the buffer should be left with "messa".
    /// Filter out any backspace characters from generated messsages using
    /// handleBackspaces.
    while ( true ) {
        const idx_of_delimiter : number = this.buffer.indexOf( delimiter )
        if (idx_of_delimiter !== -1) {
            const msg_text : string = this.buffer.substring( 0, idx_of_delimiter )
            this.buffer = this.buffer.substring( idx_of_delimiter + delimiter.length )
            const no_backspaces : string = this.handleBackspaces( msg_text );
            full_messages.push( no_backspaces );
        } else {
            break
        }
    }

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