import { IUserWithId } from "@/models/user.model";

export const replaceMongoIdInObject = (data: IUserWithId) => {
  if (!data) return null;
  const { _id, ...rest } = data;
  return JSON.parse(JSON.stringify({ ...rest, id: _id }));
};

export const replaceMongoIdInArray = (res: Record<string, unknown>[]) => {
  if (!res) return null;
  const data = res.map((each) => {
    const { _id, ...rest } = each;
    return { id: _id, ...rest };
  });
  return JSON.parse(JSON.stringify(data));
};
