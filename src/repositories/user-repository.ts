import { User } from "@prisma/client";
import { prisma } from "../config/database";

async function insertResident(
  name: string,
  email: string,
  password: string
): Promise<User> {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role: "RESIDENT"
    }
  });
}

function findResidentById(userId: number) {
  return prisma.user.findFirst({
    where: {
      AND: {
        id: userId,
        role: "RESIDENT"
      }
    },
    select: {
      id: true,
      email: true,
      name: true,
      Apartament: {
        select: {
          id: true,
          name: true
        }
      },
      Building: {
        select: {
          id: true,
          name: true
        }
      },
      ParkingLot: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
}

function findByEmail(email: string): Promise<OwnerUser> {
  return prisma.user.findFirst({
    where: {
      email
    },
    include: {
      OwnerToken: {
        select: {
          token: true
        }
      }
    }
  });
}

function findAllResidents() {
  return prisma.user.findMany({
    where: {
      role: "RESIDENT"
    },
    select: {
      id: true,
      email: true,
      name: true,
      Apartament: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
}

export type OwnerUser = User & {
  OwnerToken: {
    token: string;
  };
};

const userRepository = {
  findByEmail,
  insertResident,
  findResidentById,
  findAllResidents
};

export default userRepository;
