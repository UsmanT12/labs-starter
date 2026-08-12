import express, { Express } from "express";
import { numberedCallback } from "./numberedCallback.ts";

/*
Express gives us a default export (the "express" in "import express")
which is a function. Calling this function creates a new server application (of 'Express' type).
*/
const app : Express = express();

/*
Now we have an 'app', but it doesn't know how to respond to anything.
Let's start by telling it where our static files are located.
That's our `public` directory, but we may want to change it, so
let's use an environment variable--process.env.STATIC. If that
environment variable is not there, the name 'staticDir' will be
bound to "public" instead.

Normally, 'process.env.STATIC' will be 'undefined'; thus (via JS's logical OR rules),
the name 'staticDir' will end up bound to the string value 'public'.

How would 'process.env.STATIC' be defined? It could be set in the terminal
environment before running "npm run start". (You won't actually need
to define process.env.STATIC for this lab.)
*/
export const staticDir : string = process.env.STATIC || "public";

/*
Tell our `app` that if it receives a request X which we have
not specifically told it how to handle (via defining
"routes"; see below), then 'app' should look inside of
the folder 'staticDir' for the file whose name matches request X
and that matching file should be returned to the client.
*/
app.use(express.static(staticDir));

/*
Here we specify a _custom route_. 
Specifically, we are creating the ability for our server to handle GET requests
(notice we're calling the 'get' method) of the form "http://SERVER-LOCATION/numbered/:file",
were the ":file" part just represents some file path, e.g., "test.csv".
If such a GET request is received, by this server, said request will be handled using 
the callback function 'numberedContentsCallback', which you will end up completing in
'numberedCallback.ts'.

IMPORTANT: Whatever 'numberedCallback' does, it needs to be _fast_; otherwise
the server will be locked up handling this GET request and might not be 
responsive to GET requests coming from other clients. The trick is to
use _asynchronous code_ inside of 'numberedCallback'.
*/
app.get("/numbered/:file", numberedCallback );

/*
Here's where the server actually starts listening for 
incoming connections.

Express servers typically use port 3000, but we may want the capacity to change that, 
so again, make it possible for us to specify a different port using
an environment variable 'process.env.PORT'.
*/
const port : number = Number( process.env.PORT || 3000 );
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
