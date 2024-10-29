import { cookies } from "next/headers";
import { NextRequest ,NextResponse } from "next/server";

const handler = async (request: NextRequest, response: NextResponse) => {

    const terminateCookie = await cookies()
    terminateCookie.set("user-token", '', {expires: new Date(0)})

    return new Response
}

export { handler as GET, handler as POST };