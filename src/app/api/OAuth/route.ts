// app/api/OAuth/route.ts
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';

// app/api/OAuth/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This single function works for both GET (redirect flow) and POST (optional) POST
async function handler(request: NextRequest) {

    // ─── GET redirect from Google (what you see in the browser) ───
    

}

// This is the correct way — one function handling both methods
export { handler as GET, handler as POST };