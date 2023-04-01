import { Router } from "express";
import {
  signInAsOwner,
  signInAsResident,
  signUpAsRedident
} from "../controllers/auth-controller";
import { bodyValidation } from "../middlewares/validation-middleware";
import {
  signInOnwerSchema,
  signInSchema,
  signUpSchema
} from "../models/authentication-schema";

const authRouter = Router();

authRouter
  .post("/sign-in/owner", bodyValidation(signInOnwerSchema), signInAsOwner)
  .post("/sign-up", bodyValidation(signUpSchema), signUpAsRedident)
  .post("/sign-in", bodyValidation(signInSchema), signInAsResident);

export default authRouter;
