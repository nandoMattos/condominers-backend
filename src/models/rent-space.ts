import {  RentSpace } from "@prisma/client";
import Joi from "joi";

export const rentSpaceSchema = Joi.object({
  day_rent: Joi.date().min(new Date().getDate() - 1).required(),
});

export type RentSpaceParams = Pick<
  RentSpace,
  "day_rent"
>;
