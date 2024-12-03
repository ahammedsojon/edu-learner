"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

export default async function getLoggedInUser() {
  const session = await auth();
  console.log(session);

  return await getUserByEmail(session?.user?.email as string);
}
