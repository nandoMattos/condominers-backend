import { Router } from "express";
import {
  authenticateAdmin,
  authenticateToken
} from "../middlewares/authentication-middleware";
import { getOwnerInfo } from "../controllers/owner-controller";

const ownerRouter = Router();

ownerRouter
  .use("/*", authenticateToken, authenticateAdmin)
  .get("/:id", getOwnerInfo);

export default ownerRouter;
