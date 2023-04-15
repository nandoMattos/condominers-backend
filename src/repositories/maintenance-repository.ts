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

function findById(id:number) {
  return prisma.maintenanceRequest.findUnique({
    where: {
      id
    }
  });
}

function updateToSolved(id:number) {
  return prisma.maintenanceRequest.update({
    data:{
      solved: true
    },
    where: {
      id
    }
  });
}

const maintenanceRepository = {
  insertMaintenance,
  findAllByUserId,
  findAll,
  findById,
  updateToSolved
};

export default maintenanceRepository;
