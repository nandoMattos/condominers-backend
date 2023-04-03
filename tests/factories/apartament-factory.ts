import { faker } from "@faker-js/faker";
import { Apartament } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createApartament(params: Partial<Apartament> = {}) {
  return prisma.apartament.create({
    data: {
      name: params.name || faker.random.numeric(),
      bathrooms_amount:
        params.bathrooms_amount || faker.datatype.number({ min: 1, max: 3 }),
      bedrooms_amount:
        params.bedrooms_amount || faker.datatype.number({ min: 1, max: 3 }),
      suits_amount:
        params.suits_amount || faker.datatype.number({ min: 1, max: 2 }),
      Building: {
        connect: {
          id: params.buildingId
        }
      }
    }
  });
}
