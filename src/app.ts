import express, { Express } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database";
import authRouter from "./routers/auth-router";
import residentRouter from "./routers/resident-router";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/residents", residentRouter);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
