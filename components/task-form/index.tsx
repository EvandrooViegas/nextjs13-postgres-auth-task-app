"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import iTask from "@/types/iTask";
import { getProfile } from "@/services/auth";

const taskSchema = z.object({
  name: z
    .string()
    .min(5, "Task name must be at least 5 characters long")
    .max(100, "Task name must not be more than 100 characters long"),
  description: z.string().optional(),
  isDone: z.boolean(),
});

type TaskSchema = z.infer<typeof taskSchema>;

type Props = {
  task?: iTask;
};

export default function TaskForm(props: Props) {
  const { task } = props;
  const isEditing = Boolean(task)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: { ...task },
  });
  const onSubmit = async (data: TaskSchema) => {
    setIsLoading(true);
    if (isEditing) {
      await api.patch(`/task/${task!.id}`, {
        task: data
      });
    } else {
      await api.post<TaskSchema>("/task", {
        task: data,
      });
    }
    setIsLoading(false);
    toast({
      title: `Task ${isEditing ? 'edited' : 'created' } successfully`,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <h3 className="text-2xl mb-3 font-semibold tracking-tight">
          {isEditing ? 'Update a task' : 'Create a new Task'}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDone"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormLabel>Is the task done?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={
                    field.onChange as (checked: CheckedState) => void
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
