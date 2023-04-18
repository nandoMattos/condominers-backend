import { prisma } from "../src/config/database";

export async function cleanDb(){
  await prisma.leisureSpace.deleteMany({});
  await prisma.parkingLot.deleteMany({});
  await prisma.apartament.deleteMany({});
  await prisma.building.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.maintenanceRequest.deleteMany({});
  await prisma.ownerToken.deleteMany({});
  await prisma.rentSpace.deleteMany({});
  await prisma.report.deleteMany({});
  await prisma.user.deleteMany({});
} 