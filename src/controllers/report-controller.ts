import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { ReportParams } from "../models/report-schema";
import { handleApplicationErrors } from "../helpers/error-handling";
import httpStatus from "http-status";
import reportService from "../services/report-service";

export async function postReport(req: AuthenticatedRequest, res: Response){
  const userId = req.userId;
  const {description} = req.body as ReportParams;

  try{
    const report = await reportService.postReport(userId, description);
    res.status(httpStatus.CREATED).send(report);
  }catch(err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function getUserReports(req:AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const adminToken = req.ownerToken;
  const paramUserId = Number(req.params.userId);
  if (isNaN(paramUserId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  
  try{
    const userReports = await reportService.getUserReports(userId, paramUserId, adminToken);
    res.status(httpStatus.OK).send(userReports);
  }catch(err){
    handleApplicationErrors(err, req, res);
  }
}