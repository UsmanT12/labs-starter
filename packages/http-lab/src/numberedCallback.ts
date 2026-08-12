import { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { staticDir } from "./index.ts";
import { escape } from "html-escaper";

export function numberedCallback( req : Request, res : Response ) : void
{
  // We are inside the callback function that will be called
  // whenever a GET request of the form "http://LOCATION-OF-SERVER/numbered/:file"
  // comes to the server.
  //
  // We have 'req' and 'res' that we can use to handle the GET request.
  //    -Use res.send( txt ) to send a 200 (OK) HTTP response containing 'txt' as its body.
  //    -Use res.status(404).send( txt ) to send a 404 HTTP response containing 'txt'.
  // In both these cases, 'txt' could be valid HTML but does not have to be 
  // in 'numberedCallback'.
  
  // 'fileUrlPart' comes from _object destructuring_.
  // The 'file' property in req.params could have
  // a type of either 'string' OR 'string[]'. 
  const { file : fileUrlPart } = req.params as { file : string | string[] }
  const filePath : string = ( typeof fileUrlPart === "string" ) ? fileUrlPart : fileUrlPart[ 0 ]

  // We needed to import 'staticDir' from 'index.ts' to be 
  // able to come up with a usable filepath from 'file'.
  const usableFilePath : string = path.resolve( staticDir, filePath );

  // TODO:
  //
  // -Asynchronously load the file at 'usableFilePath' using 'fs.readFile'.
  //
  // -Once the file's contents are loaded, compose a response string of the format:
  //      "1  First line of file\n"
  //      "2  Second line of file\n"
  //      "3  Third line of file\n..."
  //  You will find the 'split' and 'join' methods of 'string' helpful. You might
  //  also benefit from 'Array''s 'map' method. Once you have the above message
  //  defined as a string, send that message as the body of a 202 HTTP response using
  //  'res.send( msg )'.
  //
  //  If there is an issue with loading the file (think about 'catch') then 
  //  use 'res.status( 404 ).send( msg)' to send a helpful error message back to the cliednt.

  fs.readFile( usableFilePath )
    .then( ( fileContents : Buffer ) => {
        const fileString : string = fileContents.toString()
        const lines : string[] = fileString.split( '\n' );
        const newLines : string[] = lines.map( 
          ( line, idx ) => `${idx + 1 }\t${line}` );
        //const msg : string = newLines.join( '\n' );

        const msg : string = "First line\nSecond line\nThird line\nHello."
        res.send( msg );
      } )
    .catch( ( error : Error ) => {
        const msg : string = `Failed to load the file ${usableFilePath} for reason: ${error.message}`
        res.status( 404 ).send( msg )
      } );
}

// Return HTML representing the contents of some file--'linesOfFile' with
// explicit line numbering.
function numberedHTML( linesOfFile : string[] )
{

}