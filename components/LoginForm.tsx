"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInUser } from "@/app/actions/auth";
import { useState } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Infer the schema type
  type CredentialType = z.infer<typeof formSchema>;
  const formSchema = z.object({
    email: z.string().min(1, "Email is required"), // Ensure the email field is not empty
    password: z
      .string()
      .min(1, "Password is required") // Ensure password is not empty
      .min(6, "Password must be at least 6 characters long"), // Minimum password length
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<CredentialType> = async (values) => {
    try {
      setLoading(true);
      const res = await signInUser(values);
      window.location.href = "/";
      toast.success("Login successfull.");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[80%]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button
            variant="link"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </Button>
        </div>
        {!loading ? (
          <Button type="submit">Sign In</Button>
        ) : (
          <Button type="button">Loading...</Button>
        )}

        <div className="text-center pt-3">
          <div>Don't have any account?</div>
          <div>
            Register as
            <Button
              variant="link"
              className="underline p-2 h-6"
              type="button"
              onClick={() => router.push("/auth/register/student")}
            >
              Student
            </Button>
            or
            <Button
              variant="link"
              className="underline p-2 h-6"
              type="button"
              onClick={() => router.push("/auth/register/instructor")}
            >
              Instructor
            </Button>
            .
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
