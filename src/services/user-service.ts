import { forbiddenError } from "../errors/forbidden-error";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";
import userRepository, { OwnerUser } from "../repositories/user-repository";

async function findOnwerUserOrFail(email: string): Promise<OwnerUser> {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw invalidCredentialsError();
  }

  if (user.role !== "OWNER") {
    throw forbiddenError();
  }

  return user;
}

const userService = {
  findOnwerUserOrFail
};

export default userService;
