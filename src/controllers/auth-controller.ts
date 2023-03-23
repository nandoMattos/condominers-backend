import { Request, Response } from "express";
import { handleApplicationErrors } from "../helpers/error-handling";
import authService from "../services/auth-service";

export function signInOwner(req: Request, res: Response) {
  try {
    const a = authService.login();
    res.status(200).send(a);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
