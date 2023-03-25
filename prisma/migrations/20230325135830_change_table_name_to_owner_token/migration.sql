/*
  Warnings:

  - You are about to drop the `PossesorToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PossesorToken" DROP CONSTRAINT "PossesorToken_userId_fkey";

-- DropTable
DROP TABLE "PossesorToken";

-- CreateTable
CREATE TABLE "OwnerToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OwnerToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnerToken_userId_key" ON "OwnerToken"("userId");

-- AddForeignKey
ALTER TABLE "OwnerToken" ADD CONSTRAINT "OwnerToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
