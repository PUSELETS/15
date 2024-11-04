import { setCheck } from "@/lib/email";

 const handler = async (request: Request) => {

    const body = await request.json()
    
    setCheck(body.type)

    return new Response
}

export { handler as GET, handler as POST };