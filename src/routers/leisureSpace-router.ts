import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { getLeisureSpaces, getSpaceHistoric, getSpaceSchedule, postRent } from "../controllers/leisureSpace-controller";
import { bodyValidation } from "../middlewares/validation-middleware";
import { rentSpaceSchema } from "../models/rent-space";

const leisureSpaceRouter = Router();

leisureSpaceRouter
  .use("/*", authenticateToken)
  .get("/", getLeisureSpaces)
  .get("/:id/schedule", getSpaceSchedule)
  .post("/:id/rent", bodyValidation(rentSpaceSchema), postRent)
  .get("/:id/historic", getSpaceHistoric);

export default leisureSpaceRouter;