"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const profileSchema = z.object({
  name: z
    .string()
    .min(5, "Profile name must be at least 5 characters long")
    .max(100, "Profile name must not be more than 100 characters long"),
  email: z.string().email(),
  password: z.string(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export default function SignIn() {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });
  
  const { auth, isLoading } = useAuth<ProfileSchema>("sign-up")
  const onSubmit = async (data: ProfileSchema) => {
    await auth(data)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-2xl">
        <h3 className="text-2xl mb-3 font-semibold tracking-tight">
          Sign Up
        </h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email..." type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormControl>
                <Input placeholder="Password..." type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-sm">Already have a profile? <Link href="/signin" className="underline">Sign In</Link>.</p>
    </Form>
  );
}
