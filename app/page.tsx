export const dynamic = 'force-dynamic'
export const revalidate = 0

import TaskForm from "@/components/task-form"
import TasksList from "@/components/task-list"
import { api } from "@/lib/axios"

export default async function Home() {
  const { data: { tasks } } = await api.get("/task")
  return (
    <main className="space-y-20">
      <TaskForm />
      <TasksList tasks={tasks} />
    </main>
  )
}
