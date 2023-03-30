import { Response } from "express";
import httpStatus from "http-status";
import { handleApplicationErrors } from "../helpers/error-handling";
import { AuethenticatedRequest } from "../middlewares/authentication-middleware";
import residentService from "../services/resident-service";

export async function getResident(req: AuethenticatedRequest, res: Response) {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(httpStatus.BAD_REQUEST).send("Id must be a number");
    }

    const residentInfo = await residentService.getResidentInfo(userId);

    res.status(httpStatus.OK).send(residentInfo);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function getAllResidents(
  req: AuethenticatedRequest,
  res: Response
) {
  try {
    const residents = await residentService.getAllResidents();
    res.status(httpStatus.OK).send(residents);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
