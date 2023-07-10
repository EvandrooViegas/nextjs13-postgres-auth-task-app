import sql from "@/lib/sql";
import { getProfile } from "@/services/auth";
import iProfile from "@/types/iProfile";
import iTask from "@/types/iTask";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const profile = getProfile()
        console.log(cookies().getAll())
        console.log(profile);
        if(profile) {
            const tasks = await sql`SELECT * FROM tasks WHERE profile_id = ${profile.id};`
            return NextResponse.json({ tasks: tasks.map(task => ({ ...task, isDone: task.isdone })) }, { status: 200 })
        }
        return NextResponse.json({ tasks: [] }, { status: 202 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 404 })
    }

}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const profile:iProfile = body.profile
        const task:iTask = body.task
        await sql`INSERT INTO tasks (
            name,
            description,
            isDone,
            profile_id
        ) VALUES (
            ${task.name},
            ${task.description},
            ${task.isDone ? '1' : '0'},
            ${profile.id}
        )`
        return NextResponse.json({ }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}