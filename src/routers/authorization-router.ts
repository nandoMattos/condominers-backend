import { Router } from "express";
import { signInOwner } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.get("/sign-in-owner", signInOwner);

export default authRouter;
