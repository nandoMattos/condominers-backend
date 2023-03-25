import { prisma } from "../config/database";

async function findOwner(email: string, token: string) {
  return prisma.user.findFirst({
    where: {
      AND: {
        email,
        PossesorToken: {
          token
        }
      }
    }
  });
}

const userRepository = {
  findOwner
};

export default userRepository;
