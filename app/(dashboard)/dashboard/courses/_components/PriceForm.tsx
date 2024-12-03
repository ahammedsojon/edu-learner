"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PriceForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formSchema = z.object({
    price: z.string().min(1, "Title is required"),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("form submitted!", values);
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price</CardTitle>
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
        {!isEditing && <CardDescription>React Mastery</CardDescription>}
      </CardHeader>
      {isEditing && (
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="price"
                        placeholder="Course Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};

export default PriceForm;
