import express, { Request, Response } from "express";
import path from "node:path";
import fs from "node:fs/promises";

const staticDir = process.env.STATIC || "public";

const app = express();

app.use(express.static(staticDir));

app.get("/numbered/:file", (req: Request, res: Response) => {
  const { file } = req.params;

  const filename = path.resolve(staticDir, typeof file === "string" ? file : file[0]);
  fs.readFile(filename)
    .then((data) => {
      const rows = data.toString().split("\n")
        .map((s, i) => `${i}, ${s}`);
      res.send(rows.join("\n"));
    })
    .catch((err: Error) => res.status(500).send(err.message))
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
