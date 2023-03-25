import { User } from "@prisma/client";
import { prisma } from "../config/database";

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

export type OwnerUser = User & {
  OwnerToken: {
    token: string;
  };
};

const userRepository = {
  findByEmail,
  insertResident
};

export default userRepository;
