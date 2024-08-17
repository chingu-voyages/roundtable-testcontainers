import dotenv from "dotenv";

dotenv.config();

export const environment: {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
} = {
  PORT: Number(process.env.PORT || "3000"),

  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: Number(process.env.DB_PORT || ""),
  DB_USER: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "",
};
