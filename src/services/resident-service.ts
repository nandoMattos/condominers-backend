import { notFoundError } from "../errors/not-found-error";
import userRepository from "../repositories/user-repository";

async function getResidentInfo(userId: number) {
  const resident = await userRepository.findResidentById(userId);
  if (!resident) throw notFoundError();
  return resident;
}

async function getAllResidents() {
  return await userRepository.findAllResidents();
}

const residentService = {
  getResidentInfo,
  getAllResidents
};

export default residentService;
