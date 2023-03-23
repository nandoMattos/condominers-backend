-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "apartamentId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartament" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "bedrooms_amount" INTEGER NOT NULL,
    "bathrooms_amount" INTEGER NOT NULL,
    "suits_amount" INTEGER NOT NULL,

    CONSTRAINT "Apartament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PossesorToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PossesorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "solved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeisureSpace" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "daily_rent" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "LeisureSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceRent" (
    "id" SERIAL NOT NULL,
    "day_rent" TIMESTAMP NOT NULL,
    "userId" INTEGER NOT NULL,
    "leisureSpaceId" INTEGER NOT NULL,

    CONSTRAINT "SpaceRent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaintenaceRequest" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "solved" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "apartamentId" INTEGER NOT NULL,

    CONSTRAINT "MaintenaceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PositionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingLot_userId_key" ON "ParkingLot"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PossesorToken_userId_key" ON "PossesorToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PositionToUser_AB_unique" ON "_PositionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PositionToUser_B_index" ON "_PositionToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_apartamentId_fkey" FOREIGN KEY ("apartamentId") REFERENCES "Apartament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkingLot" ADD CONSTRAINT "ParkingLot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PossesorToken" ADD CONSTRAINT "PossesorToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRent" ADD CONSTRAINT "SpaceRent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceRent" ADD CONSTRAINT "SpaceRent_leisureSpaceId_fkey" FOREIGN KEY ("leisureSpaceId") REFERENCES "LeisureSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenaceRequest" ADD CONSTRAINT "MaintenaceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenaceRequest" ADD CONSTRAINT "MaintenaceRequest_apartamentId_fkey" FOREIGN KEY ("apartamentId") REFERENCES "Apartament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionToUser" ADD CONSTRAINT "_PositionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionToUser" ADD CONSTRAINT "_PositionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
