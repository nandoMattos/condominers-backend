import { prisma } from "../config/database";

function findApartamentById(apartamentId: number) {
  return prisma.apartament.findFirst({
    where: {
      id: apartamentId
    }
  });
}

function connectUserToApartament(apartamentId: number, userId: number) {
  return prisma.apartament.update({
    where: {
      id: apartamentId
    },
    data: {
      User: {
        connect: {
          id: userId
        }
      }
    }
  });
}

const apartamentRepository = {
  findApartamentById,
  connectUserToApartament
};

export default apartamentRepository;
