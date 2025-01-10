"use server";

import { ICourse } from "@/models/course.model";
import { create, getCourses, deleteCourseById } from "@/queries/courses";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function createCourse(data: Partial<ICourse>) {
  try {
    const res = create(data);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAllCourses() {
  try {
    const res = getCourses();
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteCourse(id: string) {
  try {
    const res = await deleteCourseById(id);
    if (res) {
      revalidatePath("/dashboard/courses");
    }
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
