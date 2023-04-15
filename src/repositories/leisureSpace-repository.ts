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
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.toDateString();

  return prisma.rentSpace.findMany({
    where: {
      AND:{
        LeisureSpace:{
          id: spaceId
        },
        day_rent: {
          gte: yesterday
        }
      }
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

function findAllRentsByUserId(userId:number) {
  return prisma.rentSpace.findMany({
    where: {
      userId
    },
    include:{
      LeisureSpace: true
    },
    orderBy:{
      day_rent:"desc"
    }
  });
}

const leisureSpaceRepository = {
  findAll,
  findById,
  findAllRentsBySpaceId,
  insertRentSpace,
  findAllRentsByUserId
}; 

export default leisureSpaceRepository;