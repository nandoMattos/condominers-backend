-- DropForeignKey
ALTER TABLE "ParkingLot" DROP CONSTRAINT "ParkingLot_userId_fkey";

-- AlterTable
ALTER TABLE "ParkingLot" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
