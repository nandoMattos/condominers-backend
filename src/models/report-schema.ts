import { Report } from "@prisma/client";
import Joi from "joi";

const reportSchema = Joi.object({
  description: Joi.string().required()
});

export default reportSchema;

export type ReportParams = Pick<Report, "description">