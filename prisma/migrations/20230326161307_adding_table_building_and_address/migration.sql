/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buildingId` to the `Apartament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingId` to the `LeisureSpace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingId` to the `ParkingLot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartament" ADD COLUMN     "buildingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LeisureSpace" ADD COLUMN     "buildingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ParkingLot" ADD COLUMN     "buildingId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "addressId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "complement" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Building_addressId_key" ON "Building"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Building_userId_key" ON "Building"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartament" ADD CONSTRAINT "Apartament_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeisureSpace" ADD CONSTRAINT "LeisureSpace_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
