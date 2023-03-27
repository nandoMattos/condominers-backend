import { faker } from "@faker-js/faker";
import { LeisureSpace } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createLeisureSpace(params: Partial<LeisureSpace> = {}) {
  return prisma.leisureSpace.create({
    data: {
      name: params.name,
      capacity: faker.datatype.number({ min: 20, max: 100 }),
      daily_rent: faker.datatype.number({ min: 3000, max: 100000 }),
      Building: {
        connect: {
          id: params.buildingId
        }
      }
    }
  });
}
