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

const LoginForm = () => {
  const router = useRouter();
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
      await signInUser(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[80%]"
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
        <Button type="submit">Sign In</Button>

        <div className="text-center">
          Don't have any account?
          <Button
            variant="link"
            className="underline"
            type="button"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
