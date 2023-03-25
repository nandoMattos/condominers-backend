import userService from "./user-service";
import bcrypt from "bcrypt";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";
import { forbiddenError } from "../errors/forbidden-error";
import jwt from "jsonwebtoken";
import { OwnerUser } from "../repositories/user-repository";

async function signInOwner(
  email: string,
  password: string,
  token: string
): Promise<SignInResult> {
  const user = await userService.findOnwerUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  validateOwnerTokenOrFail(token, user.OwnerToken.token);

  const jwToken = createSession(user.id, user.OwnerToken.token);
  const userRes = {
    id: user.id,
    email: user.email
  };
  return {
    user: userRes,
    jwToken
  };
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

function validateOwnerTokenOrFail(givenToken: string, dbToken: string) {
  if (givenToken != dbToken) {
    throw forbiddenError();
  }
}

function createSession(userId: number, ownerToken: string) {
  return jwt.sign({ userId, ownerToken }, process.env.JWT_SECRET);
}

type SignInResult = {
  user: Pick<OwnerUser, "id" | "email">;
  jwToken: string;
};

const authService = {
  signInOwner
};

export default authService;
