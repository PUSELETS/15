import { NextResponse, type NextRequest } from "next/server";

const allowedOrigins = [
  'https://15canary.netlify.app',
  'http://localhost:3000',
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  const corsHeaders = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Authorization, Content-Type, Accept, X-Requested-With',
    ...(isAllowedOrigin ? { 'Access-Control-Allow-Origin': origin! } : {}),
    // Add COOP – allow popups for Google OAuth
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    // Optional: safer CORP for images/scripts
    'Cross-Origin-Resource-Policy': 'cross-origin',
    'Referrer-Policy': 'no-referrer-when-downgrade',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*',
};