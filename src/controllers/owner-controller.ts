import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { handleApplicationErrors } from "../helpers/error-handling";
import httpStatus from "http-status";
import ownerService from "../services/owner-service";

export async function getOwnerInfo(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.params.id);

  if (isNaN(userId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ownerInfo = await ownerService.findOwnerById(userId);
    res.status(httpStatus.OK).send(ownerInfo);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
