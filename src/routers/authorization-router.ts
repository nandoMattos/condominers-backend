import { Router } from "express";
import { signInAsOwner } from "../controllers/auth-controller";
import { bodyValidation } from "../middlewares/validation-middleware";
import { signInOnwerSchema } from "../models/authentication-schema";

const authRouter = Router();

authRouter.post(
  "/sign-in/owner",
  bodyValidation(signInOnwerSchema),
  signInAsOwner
);

export default authRouter;
