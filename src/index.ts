import express from "express";
import type { Request, Response } from "express";
import { environment } from "./env";
import { getAllCats, insertCat } from "./cats";

export const app = express();

function startServer() {
  console.log("Starting server...");
  try {
    app.use(express.json());

    app.get("/", (_req: Request, res: Response) => {
      res.status(200).json({ message: "Hello World! from Typescript" });
    });

    app.get("/cats", getAllCats);
    app.post("/cats", insertCat);

    app.listen(environment.PORT, () => {
      console.log(`Server started on port ${environment.PORT}`);
    });
  } catch (e) {
    console.error("Error starting server");
    console.error(e);
  }
}

console.info("calling startServer");
startServer();
