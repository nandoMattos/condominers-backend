import { Router } from "express";
import {
  authenticateAdmin,
  authenticateToken
} from "../middlewares/authentication-middleware";
import {
  createInvitationLink,
  getApartaments,
  joinApartament
} from "../controllers/apartament-controller";

const apartamentRouter = Router();

apartamentRouter
  .use("/*", authenticateToken)
  .post("/invitation/:jwt", joinApartament)
  .use("/*", authenticateAdmin)
  .get("/", getApartaments)
  .get("/:id/generate-invite", createInvitationLink);

export default apartamentRouter;
