
import TaskForm from "@/components/task-form";
import { api } from "@/lib/axios";
import iTask from "@/types/iTask";

type Props = {
  params: {
    id: string
  }
}
export default async function Task(props:Props) {
  const { params: { id } } = props;
  const { data: { task } } = await api.get<{ task: iTask }>(`/task/${id}`)
 

  if(!task) return <p>Task my no be avalible!</p>
  return (
    <TaskForm task={task} />
  )
}
