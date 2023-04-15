import { prisma } from "../config/database";

function insertMaintenance(
  userId: number,
  apartamentId: number,
  description: string
) {
  return prisma.maintenanceRequest.create({
    data: {
      description,
      apartamentId,
      userId
    }
  });
}

function findAllByUserId(userId:number) {
  return prisma.maintenanceRequest.findMany({
    where: {
      userId
    },
    orderBy:{
      createdAt:"desc"
    }
  });
}

function findAll() {
  return prisma.maintenanceRequest.findMany({
    include: {
      Apartament: true
    },
    orderBy: [
      {
        solved: "asc"
      },
      {
        updatedAt:"desc"
      }
    ]
  });
}

const maintenanceRepository = {
  insertMaintenance,
  findAllByUserId,
  findAll
};

export default maintenanceRepository;
