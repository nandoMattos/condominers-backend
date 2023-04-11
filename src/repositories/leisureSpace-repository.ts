import { prisma } from "../config/database";

function findAll(){
  return prisma.leisureSpace.findMany({});
}

function findById(spaceId: number){
  return prisma.leisureSpace.findFirst({
    where: {
      id: spaceId
    }
  });
}

function findAllRentsBySpaceId(spaceId: number) {
  return prisma.rentSpace.findMany({
    where: {
      LeisureSpace:{
        id: spaceId
      },
    }
  });
}

function insertRentSpace(userId:number, spaceId: number, day_rent: Date) {
  return prisma.rentSpace.create({
    data: {
      day_rent,
      leisureSpaceId: spaceId,
      userId
    }
  });
}

const leisureSpaceRepository = {
  findAll,
  findById,
  findAllRentsBySpaceId,
  insertRentSpace
}; 

export default leisureSpaceRepository;