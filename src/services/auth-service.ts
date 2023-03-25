import { notFoundError } from "../errors/not-found-error";
import userRepository from "../repositories/user-repository";

async function signInOwner(email: string, password: string, token: string) {
  const result = await userRepository.findOwner(email, token);
  if (!result) {
    throw notFoundError();
  }
}

const authService = {
  signInOwner
};

export default authService;
