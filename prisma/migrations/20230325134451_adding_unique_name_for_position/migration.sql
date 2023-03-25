/*
  Warnings:

  - You are about to drop the `SpaceRent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "SpaceRent" DROP CONSTRAINT "SpaceRent_leisureSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "SpaceRent" DROP CONSTRAINT "SpaceRent_userId_fkey";

-- DropTable
DROP TABLE "SpaceRent";

-- CreateTable
CREATE TABLE "RentSpace" (
    "id" SERIAL NOT NULL,
    "day_rent" TIMESTAMP NOT NULL,
    "userId" INTEGER NOT NULL,
    "leisureSpaceId" INTEGER NOT NULL,

    CONSTRAINT "RentSpace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");

-- AddForeignKey
ALTER TABLE "RentSpace" ADD CONSTRAINT "RentSpace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentSpace" ADD CONSTRAINT "RentSpace_leisureSpaceId_fkey" FOREIGN KEY ("leisureSpaceId") REFERENCES "LeisureSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
