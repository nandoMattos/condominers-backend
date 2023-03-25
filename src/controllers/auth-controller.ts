import { Request, Response } from "express";
import httpStatus from "http-status";
import { handleApplicationErrors } from "../helpers/error-handling";
import { SignInOwnerPamars } from "../models/authentication-schema";
import authService from "../services/auth-service";

export async function signInAsOwner(req: Request, res: Response) {
  try {
    const { email, password, token } = req.body as SignInOwnerPamars;

    const result = await authService.signInOwner(email, password, token);

    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
