import { notFoundError } from "../errors/not-found-error";
import apartamentRepository from "../repositories/apartament-repository";
import maintenanceRepository from "../repositories/maintenance-repository";

async function postMaintenance(
  userId: number,
  apartamentId: number,
  description: string
) {
  await getApartamentOrFail(apartamentId);

  return await maintenanceRepository.insertMaintenance(
    userId,
    apartamentId,
    description
  );
}

async function getApartamentOrFail(apartamentId: number) {
  const apartament = await apartamentRepository.findApartamentByIdWithUsers(
    apartamentId
  );

  if (!apartament) throw notFoundError();
}

const maintenanceService = {
  postMaintenance
};

export default maintenanceService;
