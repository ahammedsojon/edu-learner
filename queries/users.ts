import { User } from "@/models/user.model";

export async function getUserByEmail(email: string) {
  const res = await User.findOne({ email }).lean();
  console.log(JSON.parse(JSON.stringify(res)));

  return JSON.parse(JSON.stringify(res));
}
