import { MaintenanceRequest } from "@prisma/client";
import Joi from "joi";

export const maintenanceSchema = Joi.object({
  apartamentId: Joi.number().required(),
  description: Joi.string().required()
});

export type MaintenanceParams = Pick<
  MaintenanceRequest,
  "apartamentId" | "description"
>;
