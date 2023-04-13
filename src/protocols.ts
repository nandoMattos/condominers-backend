import { MaintenanceRequest, RentSpace, Report } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};



export type UserRequests = {
  MaintenanceRequests:MaintenanceRequest[],
  Reports: Report[],
  RentSpaces: RentSpace[]
}