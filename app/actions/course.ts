"use server";

import { ICourse } from "@/models/course.model";
import { create } from "@/queries/courses";

export async function createCourse(data: Partial<ICourse>) {
  const res = create(data);
  return res;
}
