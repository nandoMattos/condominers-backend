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
    include: {
      User:{
        select:{
          name:true
        }
      }
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

function findById(id:number){
  return prisma.report.findUnique({
    where: {
      id
    }
  });
}

function updateToSolved(id: number) {
  return prisma.report.update({
    where: {
      id
    },
    data: {
      solved: true
    }
  });
}

const reportRepository = {
  insertReport,
  findAllByUserId,
  findAll,
  findById,
  updateToSolved
};

export default reportRepository;