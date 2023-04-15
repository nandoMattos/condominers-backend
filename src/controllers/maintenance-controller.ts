import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { MaintenanceParams } from "../models/maintenance-schema";
import { handleApplicationErrors } from "../helpers/error-handling";
import httpStatus from "http-status";
import maintenanceService from "../services/maintenance-service";

export async function postMaintenance(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.userId;
  const { apartamentId, description } = req.body as MaintenanceParams;

  try {
    const maintenance = await maintenanceService.postMaintenance(
      userId,
      apartamentId,
      description
    );
    res.status(httpStatus.CREATED).send(maintenance);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function setMaintenanceAsSolved(req: AuthenticatedRequest, res: Response){
  const maintenanceId = Number(req.params.maintenanceId);
  if(isNaN(maintenanceId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try{
    const solved = await maintenanceService.markAsSolved(maintenanceId);
    res.status(httpStatus.OK).send(solved);
  }catch(err) {
    handleApplicationErrors(err, req, res);
  }
}
