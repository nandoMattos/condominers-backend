import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { getUserReports, postReport } from "../controllers/report-controller";
import { bodyValidation } from "../middlewares/validation-middleware";
import reportSchema from "../models/report-schema";

const reportRouter = Router();

reportRouter
  .use("/*", authenticateToken)
  .post("/", bodyValidation(reportSchema), postReport)
  .get("/user/:userId", getUserReports);

export default reportRouter;