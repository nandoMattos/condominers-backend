import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import httpStatus from "http-status";
import apartamentService from "../services/apartament-service";
import { handleApplicationErrors } from "../helpers/error-handling";

export async function joinApartament(req: AuthenticatedRequest, res: Response) {
  const jwToken = req.params.jwt;
  const userId = req.userId;

  try {
    await apartamentService.joinApartament(jwToken, userId);
    res.sendStatus(httpStatus.OK);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function createInvitationLink(
  req: AuthenticatedRequest,
  res: Response
) {
  const apartamentId = Number(req.params.id);

  if (isNaN(apartamentId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const apartamentLink = await apartamentService.createLink(apartamentId);
    res.status(httpStatus.CREATED).send(apartamentLink);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

export async function getApartaments(req: AuthenticatedRequest, res: Response) {
  try {
    const apartaments = await apartamentService.findAll();
    res.status(httpStatus.OK).send(apartaments);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}
