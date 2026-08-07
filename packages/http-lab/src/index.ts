import express, { Express } from "express";

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

The syntax 
    a = b || c 
is an example of logical OR in JavaScript. Counterintuitively, the
result of such an expression is _not_ necessarily boolean; rather,
an expression "b || c || d || e..." will evaluate to either
    (1) the first non-"falsy" value found moving from left to right, or
    (2) the "falsy" value at the right end.
"Falsy" values include 0, "", null, undefined, NaN, and of course 'false' itself.

So basically, if 'process.env.STATIC' is defined, 'staticDir' will be bound 
to that; otherwise 'staticDir' will be bound to the string value 'public'.

How would 'process.env.STATIC' be defined? It could be set in the terminal
environment before running "npm run start". (You won't actually need
to define process.env.STATIC for this lab.)
*/
const staticDir : string = process.env.STATIC || "public";

/*
Tell our `app` that if it receives a request X which we have
not specifically told it how to handle (via defining
"routes"; see below), then 'app' should look inside of
the folder 'staticDir' for the file whose name matches request X
and that matching file should be returned to the client.
*/
app.use(express.static(staticDir));

/*
Just like our tic-tac-toe server, this server
needs to listen for connections. Express servers typically
use port 3000, but we may want to change that, so again,
make it possible for us to specify a different port using
an environment variable 'process.env.PORT'.
*/
const port : number = Number( process.env.PORT || 3000 );
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
