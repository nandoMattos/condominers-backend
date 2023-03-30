import { Router } from "express";
import {
  getAllResidents,
  getResident
} from "../controllers/resident-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";

const residentRouter = Router();

residentRouter.get("/", authenticateToken, getAllResidents);
residentRouter.get("/:id", authenticateToken, getResident);

export default residentRouter;
