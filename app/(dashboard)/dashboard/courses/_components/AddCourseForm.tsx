"use client";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import CourseFormField from "./CourseFormField";
import Spin from "@/components/Spin";
import { createCourse } from "@/app/actions/course";
import { useEffect, useState } from "react";
import generateSlug from "@/lib/generateSlug";
import getLoggedInUser from "@/lib/getLoggedInUser";
import mongoose, { Mongoose } from "mongoose";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { log } from "console";
import Image from "next/image";

const AddCourseForm = ({ instructor }: { instructor: string }) => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const router = useRouter();
  // console.log({ instructor });

  const formSchema = z.object({
    thumbnail: z.string().min(1, "Thumbnail is required"),
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
      thumbnail: "",
    },
  });

  const handleFile = async (e: any, field: FieldValues) => {
    try {
      setFileLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("files", file);
      formData.append("destination", "./public/assets/images/courses");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.status === 200) {
        console.log("file uploaded successfully!");
        const fileName = await response.text();
        setThumbnail(fileName);
        field.onChange(fileName);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setFileLoading(false);
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setLoading(true);

      const data = {
        ...values,
        slug: generateSlug(values.title),
        instructor,
        thumbnail: values?.thumbnail,
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
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      {fileLoading ? (
                        <div className="border-dashed border-2 h-[160px] w-full flex items-center justify-center mb-2">
                          <Spin />
                        </div>
                      ) : (
                        <>
                          <FormLabel className="border-dashed border-2 h-[160px] w-full flex items-center justify-center mb-2">
                            {thumbnail ? (
                              <Image
                                src={`/assets/images/courses/${thumbnail}`}
                                className="max-w-full w-full h-full object-cover"
                                alt={thumbnail}
                                height={160}
                                width={160}
                              />
                            ) : (
                              <div>Upload Thumbnail</div>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFile(e, field)}
                            />
                          </FormControl>
                        </>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <InputField name={"title"} label={"Title"} form={form} />
                <InputField name={"subTitle"} label={"Subtitle"} form={form} />
                <InputField
                  name={"description"}
                  label={"Description"}
                  form={form}
                />
                <InputField name={"price"} label={"Price"} form={form} />
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
