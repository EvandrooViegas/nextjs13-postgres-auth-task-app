import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import iTask from "@/types/iTask";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"

type Props = { task: iTask }
export default function Task(props:Props) {
const { task } = props;
  return (
    <Link href={`/task/${task.id}`}>
    <Card>
      <CardHeader>
        <CardTitle className="break-all">{task.name}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
        <Badge className="w-fit" variant="secondary">{task.isDone ? `Done` : `To do`}</Badge>
      </CardHeader>
    </Card>
    </Link>
  );
}
