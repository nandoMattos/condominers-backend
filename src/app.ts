import express, { Express } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database";
import authRouter from "./routers/auth-router";
import residentRouter from "./routers/resident-router";
import apartamentRouter from "./routers/apartament-router";
import ownerRouter from "./routers/owner-router";
import maintenanceRouter from "./routers/maintenante-router";
import leisureSpaceRouter from "./routers/leisureSpace-router";
import reportRouter from "./routers/report-router";
import requestsRouter from "./routers/requests-router";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("ok!"))
  .use("/auth", authRouter)
  .use("/residents", residentRouter)
  .use("/owners", ownerRouter)
  .use("/apartaments", apartamentRouter)
  .use("/maintenance", maintenanceRouter)
  .use("/leisure-spaces", leisureSpaceRouter)
  .use("/reports", reportRouter)
  .use("/requests", requestsRouter);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
