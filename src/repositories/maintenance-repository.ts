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

const maintenanceRepository = {
  insertMaintenance
};

export default maintenanceRepository;
