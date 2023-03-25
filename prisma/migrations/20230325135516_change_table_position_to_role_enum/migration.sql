/*
  Warnings:

  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PositionToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'RESIDENT');

-- DropForeignKey
ALTER TABLE "_PositionToUser" DROP CONSTRAINT "_PositionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PositionToUser" DROP CONSTRAINT "_PositionToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "_PositionToUser";
