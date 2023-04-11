import { notFoundError } from "../errors/not-found-error";
import leisureSpaceRepository from "../repositories/leisureSpace-repository";

async function getAllSpaces() {
  return await leisureSpaceRepository.findAll();
}

async function getScheduleById(spaceId: number){
  const space = await leisureSpaceRepository.findById(spaceId);
  if(!space) {
    throw notFoundError();
  };

  return await leisureSpaceRepository.findAllRentsBySpaceId(space.id);
}

async function postRentSpace(userId: number,spaceId:number, day_rent: Date) {
  const space = await leisureSpaceRepository.findById(spaceId);
  if(!space) {
    throw notFoundError();
  };

  return await leisureSpaceRepository.insertRentSpace(userId, spaceId, day_rent);
}

const leisureSpaceService = {
  getAllSpaces,
  getScheduleById,
  postRentSpace
};

export default leisureSpaceService;