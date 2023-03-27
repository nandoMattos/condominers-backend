import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { unauthorizedError } from "../errors/unauthorized-error";
import jwt from "jsonwebtoken";

export async function authenticateToken(
  req: AuethenticatedRequest,
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

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuethenticatedRequest = Request & JWTPAyload;

type JWTPAyload = {
  userId: number;
  ownerToken?: string;
};
