"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ThumbnailForm = ({
  thumbnail: courseThumbnail,
  id,
}: {
  thumbnail: string;
  id: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const formSchema = z.object({
    thumbnail: z.string().min(1, "Thumbnail is required"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thumbnail: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("form submitted!", values);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Thumbnail</CardTitle>
          <span
            className="block cursor-pointer hover:bg-gray-600 p-3 rounded-full duration-300"
            onClick={() => {
              setIsEditing(!isEditing);
              console.log(isEditing);
            }}
          >
            <Pencil size={20} />
          </span>
        </div>
        {!isEditing ? (
          <CardDescription>
            {courseThumbnail ? (
              <Image
                src={`/assets/images/courses/${courseThumbnail}`}
                height={200}
                width={200}
                className="max-w-full w-full h-[100px] object-contain"
                alt="thumbnail"
              />
            ) : (
              <div>No Thubmnail</div>
            )}
          </CardDescription>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="border-dashed border-2 h-[160px] w-full flex items-center justify-center">
                      <div>Upload Thumbnail</div>
                    </FormLabel>
                    <FormControl>
                      {/* <div className="border-dashed border-2 h-full w-full flex items-center justify-center">
                        <span>Upload Photo</span>
                      </div> */}

                      <Input type="file" className="hidden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        )}
      </CardHeader>
    </Card>
  );
};

export default ThumbnailForm;
