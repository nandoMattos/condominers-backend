import { prisma } from "../config/database";

function insertReport(userId: number, description: string) {
  return prisma.report.create({
    data:{
      description,
      userId
    }
  });
}

function findAllByUserId(userId: number) {
  return prisma.report.findMany({
    where: {
      userId
    }
  });
}

const reportRepository = {
  insertReport,
  findAllByUserId
};

export default reportRepository;