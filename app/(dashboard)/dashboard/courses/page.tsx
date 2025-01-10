import { CustomTable } from "@/components/CustomTable";
import CousreBtn from "../_components/CousreBtn";
import { getAllCourses } from "@/app/actions/course";
import { Suspense } from "react";

const dataColumns: string[] = ["Title", "Price", "Published", ""];

export default async function CouresPage() {
  const courses = await getAllCourses();

  return (
    <div>
      <div className="text-end">
        <CousreBtn />
      </div>
      <div className="text-2xl mb-4 mt-2 font-medium">Courses</div>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomTable columns={dataColumns} data={courses} type={"course"} />
      </Suspense>
    </div>
  );
}
