import { Request, Response } from "express";
import httpStatus from "http-status";
import { handleApplicationErrors } from "../helpers/error-handling";
import {
  SignInOwnerPamars,
  SignInParams,
  SignUpParams
} from "../models/authentication-schema";
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

export async function signUpAsRedident(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as SignUpParams;

    const result = await authService.signUpResident(name, email, password);

    return res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function signInAsResident(req: Request, res: Response) {
  try {
    const { email, password } = req.body as SignInParams;

    const result = await authService.signInResident(email, password);
    return res.status(httpStatus.OK).send(result);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
