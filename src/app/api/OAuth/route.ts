// app/api/OAuth/route.ts
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_IDg,
    process.env.GOOGLE_CLIENT_SECRETg,
    process.env.REDIRECT_URI  // ← EXACT redirect URI
);

const handler = async (
    request: NextRequest,
) => {

    // read from real request URL (Google callback)
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    // Determine where to redirect after login
    let redirectTo = '/'; // fallback

    // Step 2: Google redirected back with code → exchange it
    if (code) {
        try {
            const { tokens } = await oAuth2Client.getToken(code);

            await oAuth2Client.setCredentials(tokens);

            const token = await tokens.id_token as string

            const cookieStore = await cookies()

            await cookieStore.set("user-token", token)

            // Option A: For popup flow — send to parent window
            if (request.headers.get('accept')?.includes('text/html')) {
                return new Response(`
          <script>
            if (window.opener) {
              window.opener.postMessage({ code: "${code}", user: MISHACK }, "*");
              window.close();
            }
          </script>
          <h3>Login successful! Closing...</h3>
        `, { headers: { 'Content-Type': 'text/html' } });
            }

            // Option B: For redirect flow — set cookie and redirect
            const response = await NextResponse.redirect(redirectTo);

            return response;

        } catch (err: any) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        }
    }
    // Step 1: No code → start login → redirect to Google

    const referer = await request.headers.get('referer');
    console.log('here',referer)

    const from = '/api/OAuth'

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['openid', 'email', 'profile'],
    });

    return NextResponse.redirect(authUrl);
};

export { handler as GET, handler as POST };