import express from "express";
import type { Request, Response } from "express";

function startServer() {
  console.log("Starting server...");
  try {
    const app = express();

    app.get("/", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Hello World! from Typescript" });
    });

    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    });
  } catch (e) {
    console.error("Error starting server");
    console.error(e);
  }
}

console.info("calling startServer");
startServer();
