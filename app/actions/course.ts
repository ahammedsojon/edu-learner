"use server";

import { ICourse } from "@/models/course.model";
import { create } from "@/queries/courses";

export async function createCourse(data: Partial<ICourse>) {
  try {
    const res = create(data);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
