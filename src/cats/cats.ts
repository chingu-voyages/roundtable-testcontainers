import { Request, Response } from "express";
import { Cat } from "../types/cat";
import { getCats, newCat } from "../db/database";

export async function getAllCats(_req: Request, res: Response) {
  const allCats: Cat[] = await getCats();

  res.status(200).json(allCats);
}

export async function insertCat(req: Request, res: Response) {
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

  const c: Cat = {
    name,
    breed,
    age: parseInt(age, 10),
  };

  const createdCat = await newCat(c);
  if (!createdCat) {
    return res.status(500).json({ error: "Failed to create cat" });
  }
  res.status(201).json(createdCat);
}
