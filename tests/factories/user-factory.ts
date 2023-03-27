import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { prisma } from "../../src/config/database";

export function createUserOwner(params: Partial<User> = {}) {
  const hashPassword = bcrypt.hashSync(params.password, 10);

  return prisma.user.create({
    data: {
      name: params.name || faker.name.fullName(),
      email: params.email,
      password: hashPassword,
      role: "OWNER",
      OwnerToken: {
        create: {
          token: uuid()
        }
      }
    }
  });
}
