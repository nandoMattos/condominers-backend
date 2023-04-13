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

const maintenanceRepository = {
  insertMaintenance,
  findAllByUserId
};

export default maintenanceRepository;
