import bcrypt from "bcrypt";
import { invalidCredentialsError } from "../errors/invalid-credentials-error";
import jwt from "jsonwebtoken";
import userRepository, { OwnerUser } from "../repositories/user-repository";
import { conflictError } from "../errors/conflict-error";
import { User } from "@prisma/client";
import userService from "./user-service";

async function signInOwner(
  email: string,
  password: string,
  token: string
): Promise<SignInResult> {
  const user = await userService.findOnwerUserOrFail(email);

  validateOwnerTokenOrFail(token, user.OwnerToken.token);

  const jwToken = createSession({
    userId: user.id,
    ownerToken: user.OwnerToken.token
  });

  const userRes = {
    id: user.id,
    email: user.email,
    name: user.name,
    ownerToken: user.OwnerToken.token
  };

  return {
    user: userRes,
    jwToken
  };
}

async function signUpResident(
  name: string,
  email: string,
  password: string
): Promise<SignUpResult> {
  const user = await userRepository.findByEmail(email);
  if (user) {
    throw conflictError();
  }
  const hashPassword = bcrypt.hashSync(password, 10);

  const insertedUser = await userRepository.insertResident(
    name,
    email,
    hashPassword
  );

  return {
    id: insertedUser.id,
    name: insertedUser.name,
    email: insertedUser.email
  };
}

async function signInResident(email: string, password: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) throw invalidCredentialsError();

  validatePasswordOrFail(password, user.password);

  const jwToken = createSession({ userId: user.id });

  const userRes = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  return {
    user: userRes,
    jwToken
  };
}

function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = bcrypt.compareSync(password, userPassword);

  if (!isPasswordValid) throw invalidCredentialsError();
}

function validateOwnerTokenOrFail(givenToken: string, dbToken: string) {
  if (givenToken != dbToken) {
    throw invalidCredentialsError();
  }
}

function createSession({ ...params }) {
  return jwt.sign(params, process.env.JWT_SECRET, { expiresIn: "2 days" });
}

type SignInResult = {
  user: Pick<OwnerUser, "id" | "email">;
  jwToken: string;
};

export type SignUpResult = Pick<User, "id" | "name" | "email">;

const authService = {
  signInOwner,
  signUpResident,
  signInResident
};

export default authService;
