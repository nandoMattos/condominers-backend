import { Router } from "express";
import {
  authenticateAdmin,
  authenticateToken
} from "../middlewares/authentication-middleware";
import {
  createInvitationLink,
  joinApartament
} from "../controllers/apartament-controller";

const apartamentRouter = Router();

apartamentRouter
  .use("/*", authenticateToken)
  .get("/invitation/:jwt", joinApartament)
  .use("/*", authenticateAdmin)
  .get("/:id/generate-invite", createInvitationLink);

export default apartamentRouter;
