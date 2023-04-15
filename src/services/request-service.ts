import { forbiddenError } from "../errors/forbidden-error";
import { notFoundError } from "../errors/not-found-error";
import { UserRequests } from "../protocols";
import leisureSpaceRepository from "../repositories/leisureSpace-repository";
import maintenanceRepository from "../repositories/maintenance-repository";
import reportRepository from "../repositories/reportRepository";
import userRepository from "../repositories/user-repository";

async function getUserRequests(userId:number, paramUserId: number, adminToken: string | undefined) {
  // a resident can only get his own requests, but an admin can get from anyone
  if((paramUserId !== userId) && !adminToken) {
    throw forbiddenError();
  }
    
  const user = await userRepository.findById(paramUserId);
  if(!user) {
    throw notFoundError();
  }

  const maintenanceRequests = await maintenanceRepository.findAllByUserId(paramUserId); 
  const reports = await reportRepository.findAllByUserId(paramUserId);
  const rents = await leisureSpaceRepository.findAllRentsByUserId(paramUserId);

  const requests: UserRequests = {
    MaintenanceRequests: maintenanceRequests,
    Reports: reports,
    RentSpaces: rents
  }; 

  return requests;
}

async function getAllRequests() {
  const Maintenances = await maintenanceRepository.findAll();
  const Reports = await reportRepository.findAll();


  return {Maintenances, Reports};
}

const requestService = {
  getUserRequests,
  getAllRequests
};

export default requestService;