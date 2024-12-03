"use client";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import CourseFormField from "./CourseFormField";
import Spin from "@/components/Spin";
import { createCourse } from "@/app/actions/course";
import { useState } from "react";
import generateSlug from "@/lib/generateSlug";
import getLoggedInUser from "@/lib/getLoggedInUser";
import mongoose, { Mongoose } from "mongoose";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AddCourseForm = ({ instructor }: { instructor: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // console.log({ instructor });

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subTitle: z.string().min(1, "Subtitle is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      description: "",
      price: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        slug: generateSlug(values.title),
        instructor,
      };
      const res = await createCourse(data);
      router.push(`/dashboard/courses/${res?._id}`);
      toast.success("Course has bee created successfully.");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-10"
        >
          <div className="col-span-2 w-full md:max-w-[60%] mx-auto">
            <Card>
              <CardContent className="py-3">
                <CourseFormField name={"title"} label={"Title"} form={form} />
                <CourseFormField
                  name={"subTitle"}
                  label={"Subtitle"}
                  form={form}
                />
                <CourseFormField
                  name={"description"}
                  label={"Description"}
                  form={form}
                />
                <CourseFormField name={"price"} label={"Price"} form={form} />
                {/* <CourseFormField name={"category"} label={"Category"} form={form} /> */}
                <div className="col-span-2 text-end">
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spin /> : <span>Save</span>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCourseForm;
