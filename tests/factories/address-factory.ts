import { faker } from "@faker-js/faker";
import { Address } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createAddress(params: Partial<Address> = {}) {
  return prisma.address.create({
    data: {
      city: params.city || faker.address.cityName(),
      complement: params.complement || "Apartament",
      district: params.district || faker.address.country(),
      number: params.number || faker.random.numeric(),
      street: params.street || faker.address.street()
    }
  });
}
