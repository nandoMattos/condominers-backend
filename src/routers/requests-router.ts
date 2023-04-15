import { Router } from "express";
import { authenticateAdmin, authenticateToken } from "../middlewares/authentication-middleware";
import { getAllRequests, getUserRequests } from "../controllers/requests-controller";

const requestsRouter = Router();

requestsRouter
  .use("/*", authenticateToken)
  .get("/user/:userId", getUserRequests)
  .use("/*", authenticateAdmin)
  .get("/", getAllRequests);

export default requestsRouter;
