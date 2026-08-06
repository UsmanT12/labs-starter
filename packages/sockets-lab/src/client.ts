import { Socket } from "net";
import { Player } from "./player.ts"
import { MessageBuffer } from "./messageBuffer.ts";
import { sendTelnetMsgToSocket } from "./telnetUtility.ts";

/// A Telnet client talking to our server.
export class Client {
  socket: Socket;
  buffer : MessageBuffer
  player : Player

  /// Send 'msg' to the client via Telnet. ('msg' should 
  /// not include Telnet ending characters, i.e., CRLF).
  sendMsg( msg : string ) {    
    sendTelnetMsgToSocket( this.socket, msg );
  }

  constructor( sock : Socket, playerName : string ) {
    this.socket = sock;
    this.buffer = new MessageBuffer();
    this.player = {
      name : playerName,
      score : 0
    }
  }
}
