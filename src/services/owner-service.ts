import { notFoundError } from "../errors/not-found-error";
import userRepository from "../repositories/user-repository";

async function findOwnerById(userId: number) {
  const owner = await userRepository.findOwnerById(userId);
  if (!owner) throw notFoundError();

  return owner;
}

const ownerService = {
  findOwnerById
};

export default ownerService;
