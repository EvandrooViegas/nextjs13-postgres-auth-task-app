"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import iTask from "@/types/iTask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Task(props: Props) {
  const {
    params: { id },
  } = props;
  const [task, setTask] = useState<iTask | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let hasFetched = false;
    if (!hasFetched) {
      setIsLoading(true);
      api
        .get<{ task: iTask }>(`/task/${id}`)
        .then((response) => setTask(response.data.task))
        .finally(() => setIsLoading(false));
    }
    return () => {
      hasFetched = true
    }
  }, [id]);
  const removeTask = async () => {
    await api.delete(`/task/${id}`);
    router.push("/");
  };

  if (!task && !isLoading) return <h1>Task my not be avalible</h1>;
  if (isLoading) return <p>Loading Task...</p>;
  return (
    <>
      {task ? (
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {task.name}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {task.description}
          </p>
          <div className="space-x-2">
            <Button variant="destructive" onClick={removeTask}>
              Delete
            </Button>
            <Button variant="outline">
              <Link href={`/task/${id}/edit`}>Edit</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
