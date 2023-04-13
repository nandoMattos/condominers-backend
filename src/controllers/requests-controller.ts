import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";
import { handleApplicationErrors } from "../helpers/error-handling";
import requestService from "../services/request-service";

export async function getUserRequests(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const paramUserId = Number(req.params.userId);
  if(isNaN(paramUserId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  const adminToken = req.ownerToken;

  try{
    const userRequests = await requestService.getUserRequests(userId, paramUserId, adminToken);
    res.status(httpStatus.OK).send(userRequests);
  }catch(err) {
    handleApplicationErrors(err, req ,res);
  }

}
