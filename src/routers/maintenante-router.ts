import { Router } from "express";
import {
  authenticateAdmin,
  authenticateToken
} from "../middlewares/authentication-middleware";
import { bodyValidation } from "../middlewares/validation-middleware";
import { maintenanceSchema } from "../models/maintenance-schema";
import { postMaintenance } from "../controllers/maintenance-router";

const maintenanceRouter = Router();

maintenanceRouter
  .use("/*", authenticateToken)
  .post("/", bodyValidation(maintenanceSchema), postMaintenance)
  .use("/*", authenticateAdmin)
  .get("/");

export default maintenanceRouter;
