import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    const profileToken = request.cookies.get("profile-token")?.value
    switch(request.nextUrl.pathname) {
        case "/": {
            if(!profileToken) return NextResponse.redirect(new URL("/signup", request.url))
            return NextResponse.next()
        }
    }
    return NextResponse.next()
}
