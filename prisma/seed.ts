import { createAddress } from "../tests/factories/address-factory";
import { createUserOwner } from "../tests/factories/user-factory";
import { createBuilding } from "../tests/factories/building-factory";
import { createApartament } from "../tests/factories/apartament-factory";
import { createParkingLot } from "../tests/factories/create-parking-lot";
import { connectDB, disconnectDB } from "../src/config/database";
import { createLeisureSpace } from "../tests/factories/leisure-space";

connectDB();

async function main() {
  const address = await createAddress();

  const ownerUser = await createUserOwner({
    email: "owner@owner.com",
    password: "123456"
  });

  const building = await createBuilding({
    userId: ownerUser.id,
    addressId: address.id
  });

  const APTARTAMENTS_AMOUNT = 10;
  for (let i = 0; i < APTARTAMENTS_AMOUNT; i++) {
    await createApartament({ buildingId: building.id, name: `10${i}` });
  }

  const PARKING_LOTS_AMOUNT = 10;
  for (let i = 0; i < PARKING_LOTS_AMOUNT; i++) {
    await createParkingLot({ name: `1${i}`, buildingId: building.id });
  }

  await createLeisureSpace({
    name: "Área de lazer: Churrasqueira + Piscina",
    daily_rent: 10000,
    buildingId: building.id
  });
}
main()
  //eslint-disable-next-line
  .then(() => console.log("Owner user created successfully"))
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err);
    process.exit(1);
  })
  .finally(async () => await disconnectDB());
