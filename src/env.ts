import dotenv from "dotenv";

dotenv.config();

export const environment: { PORT: number } = {
  PORT: Number(process.env.PORT || "3000"),
}
