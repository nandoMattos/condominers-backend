import jwt from "jsonwebtoken";
import { notFoundError } from "../errors/not-found-error";
import apartamentRepository, {
  ApartamentWihUsers
} from "../repositories/apartament-repository";
import { conflictError } from "../errors/conflict-error";

type LinkPayload = {
  iat: number;
  apartamentId: number;
};

async function createLink(apartamentId: number) {
  const apartament = await apartamentRepository.findApartamentByIdWithUsers(
    apartamentId
  );

  if (!apartament) throw notFoundError();

  verifyCapacityOrFail(apartament);

  const token = jwt
    .sign({ apartamentId }, process.env.JWT_SECRET)
    .replace(".", "*")
    .replace(".", "*");

  const link = `${process.env.FRONT_URL}/apartaments/invitation/${token}`;
  return link;
}

async function joinApartament(jwToken: string, userId: number) {
  const { apartamentId } = jwt.verify(
    jwToken,
    process.env.JWT_SECRET
  ) as LinkPayload;

  const apartament = await apartamentRepository.findApartamentByIdWithUsers(
    apartamentId
  );
  if (!apartament) throw notFoundError();

  verifyCapacityOrFail(apartament);

  await apartamentRepository.connectUserToApartament(apartamentId, userId);
}

async function findAll() {
  return await apartamentRepository.findAllWithUsersAndRequests();
}

function verifyCapacityOrFail(apartament: ApartamentWihUsers) {
  const availableVacancies =
    apartament.bedrooms_amount + apartament.suits_amount;
  if (availableVacancies <= apartament._count.User) {
    throw conflictError("No vacancies avaliable");
  }
}

const apartamentService = {
  createLink,
  joinApartament,
  findAll
};

export default apartamentService;
