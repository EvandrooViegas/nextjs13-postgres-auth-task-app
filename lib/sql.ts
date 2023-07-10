import postgres from "postgres"

const URL = process.env.NEXT_PUBLIC_DATABASE_URL!
const host = process.env.NEXT_PUBLIC_PGHOST!
const port = Number(process.env.NEXT_PUBLIC_PGPORT!)
const database = process.env.NEXT_PUBLIC_DATABASE!
const username = process.env.NEXT_PUBLIC_PGUSER!
const password = process.env.NEXT_PUBLIC_PGPASSWORD!

const sql = postgres(URL, {
    host,
    port,
    database,
    username,
    password,
    ssl: "require"
})

export default sql