import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "../errors/unauthorized-error";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user-repository";
import { forbiddenError } from "../errors/forbidden-error";
import { handleApplicationErrors } from "../helpers/error-handling";
import apartamentService from "../services/apartament-service";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(" ")[1];
  if (!token) return generateUnauthorizedResponse(res);

  const { userId, ownerToken } = jwt.verify(
    token,
    process.env.JWT_SECRET
  ) as JWTPAyload;

  req.userId = userId;
  if (ownerToken) req.ownerToken = ownerToken;

  return next();
}

export async function authenticateAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const givenToken = req.ownerToken;
  const userId = req.userId;

  if (!givenToken) return generateForbiddenResponse(res);

  const { OwnerToken } = await userRepository.getOnwerTokenByUserId(userId);

  if (givenToken !== OwnerToken.token) {
    return generateForbiddenResponse(res);
  }

  return next();
}

export async function getApartaments(req: AuthenticatedRequest, res: Response) {
  try {
    const apartaments = await apartamentService.findAll();
    res.status(httpStatus.OK).send(apartaments);
  } catch (err) {
    handleApplicationErrors(err, req, res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

function generateForbiddenResponse(res: Response) {
  res.status(httpStatus.FORBIDDEN).send(forbiddenError());
}

export type AuthenticatedRequest = Request & JWTPAyload;

type JWTPAyload = {
  userId: number;
  ownerToken?: string;
};
