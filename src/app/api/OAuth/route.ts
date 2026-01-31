// app/api/OAuth/route.ts
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';
import { sendUserToFirebase } from '@/lib/user';

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

            const oAuth2Client = new OAuth2Client(
                '815887314534-vrbfs0kmphu2207fimric4qaj1j1hs4n.apps.googleusercontent.com',
                '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',
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
        } finally {
            await sendUserToFirebase()
        }

    }

    return Response.json({ success: true });

}

// This is the correct way — one function handling both methods
export { handler as GET, handler as POST };