import { NextResponse, type NextRequest } from "next/server";

const allowedOrigins = [
  'https://15canary.netlify.app',           // your production domain
  'http://localhost:3000',            // dev
  // add more if you have staging, preview URLs, etc.
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');

  // Allow requests with no origin (like curl, Postman, same-origin)
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  const corsHeaders = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Authorization, Content-Type, Accept, X-Requested-With',
    // Important: only expose if the origin is allowed
    ...(isAllowedOrigin ? { 'Access-Control-Allow-Origin': origin! } : {}),
    // Or use * if you don’t need credentials:
    // 'Access-Control-Allow-Origin': '*',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: corsHeaders });
  }

  // Add headers to normal responses
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Optional: only run middleware on API routes
export const config = {
  matcher: '/api/:path*',
};



