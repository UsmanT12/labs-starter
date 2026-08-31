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
  // In both these cases, 'txt' should be HTML-formatted, though most clients will know
  // how to display non-HTML text responses too.
  
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
  // -Once the file's contents are loaded, use the 'string.split' method
  //  to produce an array of strings, each string representing one line of 
  //  the file (you'll need to split on the newline character). Take that
  //  array of strings and generate an HTML string response from them using 
  //  the incomplete function 'makeNumberedHTMLBody'. Send the HTML-formatted string
  //  to the client as the body of a status-200 (OK) HTTP response using 
  //  'res.send( msg )'.
  //
  //  -If there is an issue with loading the file (think about 'catch') then 
  //  use 'res.status( 404 ).send( msg)' to send a helpful error message back to the client.
  //  In this case, 'msg' doesn't have to be HTML-formatted; a simple error message 
  //  will be enough.
}

// Return HTML representing the contents of some file--'linesOfFile' with
// explicit line numbering.
function makeNumberedHTMLBody( linesOfFile : string[] )
{
  // TODO:
  // Make sure 'linesOfFile' contains no HTML code. Do this
  // by applying 'escape' to each line in 'linesOfFile'. Store
  // the result in 'htmlEscapedLines'. ('Array.map' could help.)
  const htmlEscapedLines : string[] = [];

  // TODO:
  // Make 'pTags' be an array of strings, each string containing
  // the HTML code for a specific <p> tag for one of the lines in 
  // 'htmlEscapedLines'. Each <p> tag should contain a line number
  // (use 1-based line numbering in output).
  // 
  // Example: if 'htmlEscapedLines' is [ 'first line', 'second line' ]
  // then 'pTags' should be
  //    [  '<p>1 first line</p>',
  //       '<p>2 second line</p>' ]
  const pTags : string[] = [];

  // TODO:
  // Use 'string.join' to combine 'pTags' into a single string
  const pTagsCombined : string = "";
  
  return `
    <html lang="en">
    <body>
      ${pTagsCombined}
    </body>
    </html>
  `;
}