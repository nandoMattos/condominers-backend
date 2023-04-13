import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { getUserRequests } from "../controllers/requests-controller";

const requestsRouter = Router();

requestsRouter
  .use("/*", authenticateToken)
  .get("/user/:userId", getUserRequests);

export default requestsRouter;
