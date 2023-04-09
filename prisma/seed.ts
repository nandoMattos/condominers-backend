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
    name: "Churrasqueira + Piscina",
    daily_rent: 10000,
    buildingId: building.id,
    image_url: "https://st3.depositphotos.com/1230300/36748/i/1600/depositphotos_367488642-stock-photo-balcony-terrace-of-a-modern.jpg"
  });

  await createLeisureSpace({
    name: "Sala de jogos",
    daily_rent: 8000,
    buildingId: building.id,
    image_url: "https://www.decorfacil.com/wp-content/uploads/2018/02/20180225sala-de-jogos-28.jpg"
  });
}
main()
  //eslint-disable-next-line
  .then(() => console.log("Successfull seed!"))
  .catch((err) => {
    //eslint-disable-next-line
    console.log(err);
    process.exit(1);
  })
  .finally(async () => await disconnectDB());
