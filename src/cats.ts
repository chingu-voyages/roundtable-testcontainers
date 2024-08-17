import { Request, Response } from "express";
import { Cat } from "./types/cat";

export function getAllCats(req: Request, res: Response) {
  const allCats: Cat[] = [];

  res.status(200).json(allCats);
}

export function insertCat(req: Request, res: Response) {
  const { name, breed, age } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing name" });
  }
  if (!breed) {
    return res.status(400).json({ error: "Missing breed" });
  }
  if (!age) {
    return res.status(400).json({ error: "Missing age" });
  }

  if (isNaN(age)) {
    return res.status(400).json({ error: "Age must be a number" });
  }

  res.status(201).json({
    id: 1,
    name,
    breed,
    age: parseInt(age, 10),
  });
}
