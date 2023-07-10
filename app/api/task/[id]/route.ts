import sql from "@/lib/sql";
import iTask from "@/types/iTask";
import { NextResponse } from "next/server";
import camelCaseToSnakeCase from "@/utils/camel-case-to-snake-case"

type Context = {
    params: {
        id: string
    }
}
export async function DELETE(request:Request, context:Context) {
    try {
        const { params } = context
        const id = Number(params.id)
        await sql`DELETE FROM tasks WHERE id = ${id}`
        return NextResponse.json({  }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}

export async function GET(request:Request, context:Context) {
    try {
        const { params } = context
        const id = Number(params.id)
        const tasks = await sql`SELECT * FROM tasks WHERE id = ${id}`
        return NextResponse.json({ task: { ...tasks[0], isDone: tasks[0].isdone } }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}


export async function PATCH(request:Request, context:Context) {
    try {
        const body = await request.json()
        const { params } = context
        const id = Number(params.id)

        const task:iTask = body.task
        await sql`
        UPDATE tasks
        SET name = ${task.name}, description = ${task.description}, isdone = ${task.isDone}
        WHERE id = ${id}
        `
        return NextResponse.json({  }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 404 })
    }
}