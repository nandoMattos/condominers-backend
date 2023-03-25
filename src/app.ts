import express, { Express } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database";
import authRouter from "./routers/authorization-router";
import { v4 as uuid } from "uuid";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => {
    res.send("OK!");
    const token = uuid();
    console.log(token);
  })
  .use("/auth", authRouter);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
