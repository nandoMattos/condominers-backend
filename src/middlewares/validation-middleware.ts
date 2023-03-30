import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";
import { invalidDataError } from "../errors/invalid-data-errors";

export function bodyValidation(schema: ObjectSchema): ValidationMiddleware {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(invalidDataError(error.details.map((d) => d.message)));
    }
    next();
  };
}

type ValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
