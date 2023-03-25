import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

export function connectDB(): void {
  prisma = new PrismaClient();
  prisma.$connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
