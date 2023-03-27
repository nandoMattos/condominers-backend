import { faker } from "@faker-js/faker";
import { ParkingLot } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createParkingLot(params: Partial<ParkingLot> = {}) {
  return prisma.parkingLot.create({
    data: {
      name: params.name || faker.random.numeric(),
      buildingId: params.buildingId
    }
  });
}
