import { IUser } from "@/models/user.model";

export type CredentialType = {
  email: string;
  password: string;
};

export async function signInUser(data: CredentialType) {
  console.log(data);
}

export async function registerUser(data: Partial<IUser>) {
  console.log(data);
}
