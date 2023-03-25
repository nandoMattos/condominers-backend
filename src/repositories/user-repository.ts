import { User } from "@prisma/client";
import { prisma } from "../config/database";

async function findByEmail(email: string): Promise<OwnerUser> {
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

export type OwnerUser = User & {
  OwnerToken: {
    token: string;
  };
};

const userRepository = {
  findByEmail
};

export default userRepository;
