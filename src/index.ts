import express from "express";
import type { Request, Response } from "express";
import { environment } from "./env";
import { getAllCats, insertCat } from "./cats";
import { client, createClient } from "./database";

export const app = express();

function startServer() {
  try {
    createClient(
      environment.DB_HOST,
      environment.DB_PORT,
      environment.DB_USER,
      environment.DB_PASSWORD,
      environment.DB_NAME
    )
    if (!client) {
      throw new Error("Client not created");
    }

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
