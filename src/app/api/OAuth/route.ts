// app/api/OAuth/route.ts
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';


// app/api/OAuth/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This single function works for both GET (redirect flow) and POST (optional) POST
async function handler(request: NextRequest) {
    
        // ─── GET redirect from Google (what you see in the browser) ───
        if (request.method === 'GET') {
            const url = new URL(request.url);
            const code = url.searchParams.get('code');

            const oAuth2Client = new OAuth2Client(
                process.env.GOOGLE_CLIENT_IDg,
                process.env.GOOGLE_CLIENT_SECRETg,
                process.env.REDIRECT_URI  // ← EXACT redirect URI
            );

            // Step 2: Google redirected back with code → exchange it
            if (code) {
                
                    const { tokens } = await oAuth2Client.getToken(code);

                    await oAuth2Client.setCredentials(tokens);

                    const token = await tokens.id_token as string

                    const cookieStore = await cookies()

                    await cookieStore.set("user-token", token)
                
            }

            // Redirect to your main app
            const response = NextResponse.redirect(new URL('/', request.url)); // ← change to your main page

            return response;
        }

        return new NextResponse('Method not allowed', { status: 405 });

}

// This is the correct way — one function handling both methods
export { handler as GET, handler as POST };