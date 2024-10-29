import { cookies } from "next/headers";

const handler = async () => {

    const terminateCookie = await cookies()
    terminateCookie.set("user-token", '', {expires: new Date(0)})

    return new Response
}

export { handler as GET, handler as POST };