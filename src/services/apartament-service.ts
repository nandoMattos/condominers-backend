import jwt from "jsonwebtoken";
import { notFoundError } from "../errors/not-found-error";
import apartamentRepository from "../repositories/apartament-repository";

type LinkPayload = {
  iat: number;
  apartamentId: number;
};

async function createLink(apartamentId: number) {
  const apartament = await apartamentRepository.findApartamentById(
    apartamentId
  );

  if (!apartament) throw notFoundError();

  const token = jwt.sign({ apartamentId }, process.env.JWT_SECRET);
  const link = `${process.env.API_URL}/apartaments/invitation/${token}`;
  return link;
}

async function joinApartament(jwToken: string, userId: number) {
  const { apartamentId } = jwt.verify(
    jwToken,
    process.env.JWT_SECRET
  ) as LinkPayload;

  const apartament = apartamentRepository.findApartamentById(apartamentId);
  if (!apartament) throw notFoundError();

  await apartamentRepository.connectUserToApartament(apartamentId, userId);

  return `${process.env.FRONT_URL}/`;
}

const apartamentService = {
  createLink,
  joinApartament
};

export default apartamentService;
