// app/api/OAuth/route.ts
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';
import { toast } from "sonner";


// app/api/OAuth/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This single function works for both GET (redirect flow) and POST (optional) POST
async function handler(request: NextRequest) {

    // ─── GET redirect from Google (what you see in the browser) ───
    if (request.method === 'POST') {
        try {
            const body = await request.json();
            const { code } = body;

            // 2. Validate that code exists and is a string
            if (!code || typeof code !== "string") {
                console.error("Missing or invalid code:", body);
                return new Response(JSON.stringify({ error: "Invalid code" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                });
            }

            console.log("Code received on server:", code);

            const oAuth2Client = new OAuth2Client(
                process.env.GOOGLE_CLIENT_IDf,
                process.env.GOOGLE_CLIENT_SECRETf,
                'https://15canary.netlify.app/sign-up'  // ← EXACT redirect URI
            );

            // Step 2: Google redirected back with code → exchange it
            if (code) {

                const { tokens } = await oAuth2Client.getToken(code);

                await oAuth2Client.setCredentials(tokens);

                const token = await tokens.id_token as string

                const cookieStore = await cookies()

                await cookieStore.set("user-token", token)

            }
        } catch (error) {
            console.error("Unexpected error in google-exchange:", error);
            return new Response(JSON.stringify({ error: "Server error" }), {
                status: 500,
            });
        }
    }

    toast.success("Welcome!")

    return Response.json({ success: true });

}

// This is the correct way — one function handling both methods
export { handler as GET, handler as POST };