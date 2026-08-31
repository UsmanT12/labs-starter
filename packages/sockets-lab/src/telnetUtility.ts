import { Socket } from "net";

export const TELNET_MSG_END : string = '\r\n' // CRLF

/// Attach Telnet ending characters to 'msg' and send the 
/// resulting message to the client connected to via 'socket'.
export function sendTelnetMsgToSocket( socket : Socket, msg : string ) {
    socket.write(`${msg}${TELNET_MSG_END}`); // Telnet messages should end with CLRF
}
