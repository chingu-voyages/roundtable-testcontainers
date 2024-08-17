import { Client, QueryResult } from "pg";
import { Cat } from "./types/cat";

export let client: Client | undefined;

export function createClient(
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
) {
  console.log("createClient", host, port, user, password, database);
  client = new Client({
    host,
    port,
    user,
    password,
    database,
  });

  client.connect();
}

export async function getCats() {
  if (!client) {
    throw new Error("Client not created");
  }

  let cats: Cat[] = [];
  try {
    const sql = "select id, name, breed, age from cat";

    const result: QueryResult<Cat> = await client.query(sql);
    cats = result.rows;
  } catch (e) {
    console.error(e);
  }

  return cats;
}

export async function newCat(cat: Cat): Promise<Cat | undefined> {
  if (!client) {
    throw new Error("Client not created");
  }

  try {
    const sql =
      "insert into cat (name, breed, age) values ($1, $2, $3) returning id";
    const id = await client.query(sql, [
      cat.name,
      cat.breed,
      cat.age,
    ]).then(r => r.rows[0].id);
    console.dir(id);
    cat.id = id;

    return cat;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
