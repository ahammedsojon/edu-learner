import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Course, ICourse } from "@/models/course.model";
import { json } from "stream/consumers";

export async function create(data: Partial<ICourse>) {
  try {
    const res = await Course.create(data);
    return JSON.parse(JSON.stringify(res));
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCourses() {
  try {
    const response = await Course.find({}).lean();
    if (response) {
      return replaceMongoIdInArray(response);
    }
  } catch (error: any) {
    throw new Error(error.message);
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

export async function deleteCourseById(id: string) {
  try {
    const response = await Course.findByIdAndDelete(id);
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    throw new Error(error.message);
  }
}
