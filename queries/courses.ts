import { Course, ICourse } from "@/models/course.model";

export async function create(data: Partial<ICourse>) {
  try {
    const res = await Course.create(data);
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(error);
  }
}
