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
    },
    orderBy:{
      createdAt:"desc"
    }
  });
}

function findAll() {
  return prisma.report.findMany({
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

const reportRepository = {
  insertReport,
  findAllByUserId,
  findAll
};

export default reportRepository;