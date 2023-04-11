import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { handleApplicationErrors } from "../helpers/error-handling";
import httpStatus from "http-status";
import leisureSpaceService from "../services/leisureSpace-service";
import { RentSpaceParams } from "../models/rent-space";

export async function getLeisureSpaces(req: AuthenticatedRequest, res: Response){
  try{
    const leisureSpaces = await leisureSpaceService.getAllSpaces();
    res.status(httpStatus.OK).send(leisureSpaces);
  }catch(err) {
    handleApplicationErrors(err, req, res);
  }
} 

export async function getSpaceSchedule(req: AuthenticatedRequest, res: Response) {
  const spaceId = Number(req.params.id);
  if(isNaN(spaceId)){
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }  

  try{
    const spaceSchedule = await leisureSpaceService.getScheduleById(spaceId);
    res.status(httpStatus.OK).send(spaceSchedule);
  }catch(err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function postRent(req: AuthenticatedRequest, res: Response) {
  const {day_rent} = req.body as RentSpaceParams;
  const userId = req.userId;

  const spaceId = Number(req.params.id);
  if(isNaN(spaceId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try{
    const rent = await leisureSpaceService.postRentSpace(userId, spaceId, day_rent);
    res.status(httpStatus.CREATED).send(rent);
  }catch(err ){
    handleApplicationErrors(err, req, res);
  }
}