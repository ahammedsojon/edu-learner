export const replaceMongoIdInObject = (data: Record<string, unknown>) => {
  const { _id, ...rest } = data;
  return JSON.parse(JSON.stringify(rest));
};
