import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";



let token: string;

export const setToken = async (newToken: string) => {
    token = newToken
    const cookieStore = await cookies()
    cookieStore.set("user-token", token)
}

export async function middleware(request: NextRequest, response: NextResponse) {
    
}


