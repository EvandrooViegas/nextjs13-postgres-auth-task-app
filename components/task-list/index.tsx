import iTask from "@/types/iTask";
import React from "react";
import Task from "./task";
import { getProfile } from "@/services/auth";
import iProfile from "@/types/iProfile";

type Props = { tasks: iTask[] };
export default function TasksList(props: Props) {
  const profile = getProfile() as iProfile
  const { tasks } = props;
  const tasksTodo = tasks.filter(task => !task.isDone)
  if (!tasks || tasks.length) return <p>No tasks!</p>;
  return (
    <div className="flex flex-col gap-4">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {profile.name} {"'"}s Tasks
        </h2>
        <p>You have {tasksTodo?.length} {tasksTodo.length === 1 ? 'task' : 'tasks'} to do</p>
      <div className="grid grid-cols-2 gap-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
