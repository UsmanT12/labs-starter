import net, { Socket } from "net";

console.log( "Hello world")

/*
const SERVER_IP = process.env.SERVER_IP || "127.0.0.1";
const SERVER_PORT = 3456;

const server = net.createServer( handleNewConnection );
let numClientsSeen : number = 0

server.on("listening", () => {
  console.log("Server listening on ", server.address());
});

server.listen(SERVER_PORT, SERVER_IP);

// Respond to 'socket' connecting to the server.
function handleNewConnection( socket : Socket ) {
  const idOfThisClient : number = numClientsSeen;
  console.log( `New client connected: ${idOfThisClient}` )
  numClientsSeen += 1;

  socket.on("data", (data: string | Buffer) => {
    const chunk : string = data.toString();
    console.log( `Received chunk from client ${idOfThisClient}: "${chunk}"` )
  });

  socket.on("close", ( hadError : boolean ) => {
    console.log( `Goodbye to client ${idOfThisClient}` )
  });
}*/

