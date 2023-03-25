import { PossesorToken, User } from "@prisma/client";
import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().min(5).max(200).required(),
  password: Joi.string().min(5).max(100).required()
});

export const signInSchema = Joi.object({
  email: Joi.string().min(5).max(200).required(),
  password: Joi.string().min(5).max(100).required()
});

export const signInOnwerSchema = signInSchema.keys({
  token: Joi.string().required()
});

export type SignUpParams = Pick<User, "name" | "email" | "password">;
export type SignInParams = Pick<User, "email" | "password">;
export type SignInOwnerPamars = Pick<User, "email" | "password"> &
  Pick<PossesorToken, "token">;
