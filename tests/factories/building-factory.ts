import { faker } from "@faker-js/faker";
import { Building } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createBuilding(params: Partial<Building> = {}) {
  return prisma.building.create({
    data: {
      name: params.name || faker.company.name(),
      addressId: params.addressId,
      userId: params.userId
    }
  });
}
