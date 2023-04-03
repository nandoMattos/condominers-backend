import { Apartament } from "@prisma/client";
import { prisma } from "../config/database";

function findApartamentByIdWithUsers(
  apartamentId: number
): Promise<ApartamentWihUsers> {
  return prisma.apartament.findUnique({
    where: {
      id: apartamentId
    },
    include: {
      _count: {
        select: {
          User: true
        }
      }
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

function findAllWithUsersAndRequests(): Promise<ApartamentsInfo[]> {
  return prisma.apartament.findMany({
    include: {
      _count: {
        select: {
          User: true,
          MaintenaceRequest: true
        }
      }
    },

    orderBy: {
      name: "asc"
    }
  });
}

export type ApartamentWihUsers = Apartament & {
  _count: {
    User: number;
  };
};

export type ApartamentsInfo = Apartament & {
  _count: {
    User: number;
    MaintenaceRequest: number;
  };
};

const apartamentRepository = {
  findApartamentByIdWithUsers,
  connectUserToApartament,
  findAllWithUsersAndRequests
};

export default apartamentRepository;
