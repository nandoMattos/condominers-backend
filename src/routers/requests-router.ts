import { Router } from "express";
import { authenticateAdmin, authenticateToken } from "../middlewares/authentication-middleware";
import { getAllRequests, getUserRequests } from "../controllers/requests-controller";
import { setMaintenanceAsSolved } from "../controllers/maintenance-controller";
import { setReportAsSolved } from "../controllers/report-controller";

const requestsRouter = Router();

requestsRouter
  .use("/*", authenticateToken)
  .get("/user/:userId", getUserRequests)
  .use("/*", authenticateAdmin)
  .get("/", getAllRequests)
  .patch("/maintenance/:maintenanceId/solve", setMaintenanceAsSolved)
  .patch("/report/:reportId/solve", setReportAsSolved);


export default requestsRouter;
