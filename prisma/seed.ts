import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();
prisma.$connect();

async function main() {
  const password = "123456";
  const hashPassword = bcrypt.hashSync(password, 10);

  // creating am OWNER User (requires a PocessorToken)
  await prisma.user.create({
    data: {
      name: faker.name.fullName(),
      email: "owner@owner.com",
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

main()
  .then(() => console.log("Owner user created successfully"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect);
