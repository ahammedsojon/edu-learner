import { replaceMongoIdInObject } from "@/lib/convertData";
import { Course, ICourse } from "@/models/course.model";

export async function create(data: Partial<ICourse>) {
  try {
    const res = await Course.create(data);
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCourseById(id: string) {
  try {
    const response = await Course.findById(id).lean();
    if (response) {
      return replaceMongoIdInObject(response);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}
