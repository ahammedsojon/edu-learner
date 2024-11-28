"use server";

import { signIn } from "@/auth";
import { IUser, User } from "@/models/user.model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";

export type CredentialType = {
  email: string;
  password: string;
};

export async function signInUser(data: CredentialType) {
  try {
    console.log(data);
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function registerUser(data: Partial<IUser>) {
  try {
    dbConnect();
    const hashedPassword = await bcrypt.hash(data?.password as string, 5);
    const res = await User.create({ ...data, password: hashedPassword });
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(error);
  }
}
