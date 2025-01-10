"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICourse } from "@/models/course.model";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spin from "./Spin";
import { deleteCourse } from "@/app/actions/course";
import { revalidatePath } from "next/cache";

export function CustomTable({
  columns,
  data,
  type,
}: {
  columns: string[];
  data: ICourse[];
  type: string;
}) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteSingleCourse = async (id: string) => {
    try {
      setDeleteLoading(true);
      const res = await deleteCourse(id);
      // revalidatePath("/dashboard/courses");
      console.log("client", res);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const goToEdit = (id: string) => {
    console.log(id);
    if (type === "course") {
      router.push(`/dashboard/courses/${id}`);
    }
  };

  return (
    <Table className="table-auto w-full">
      <TableCaption className="mt-[100px]">A list of Courses.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className={`${col === "" && "w-[120px]"}`}>
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          <>
            {data.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="font-medium">{course.price}</TableCell>
                <TableCell className="font-medium">
                  {course.published ? "Published" : "Unpublished"}
                </TableCell>
                <TableCell className="font-medium text-end">
                  <Button
                    className="rounded-full bg-transparent hover:bg-[gray] h-8 w-8 text-gray hover:text-white duration-300 me-2"
                    onClick={() => goToEdit(course.id)}
                  >
                    <Pencil />
                  </Button>
                  {deleteLoading ? (
                    <Button className="rounded-full bg-transparent h-8 w-8">
                      <Spin />
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full bg-transparent hover:bg-[red] h-8 w-8 text-gray hover:text-white duration-300"
                      onClick={() => deleteSingleCourse(course.id)}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="font-medium text-center"
            >
              No courses available.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
