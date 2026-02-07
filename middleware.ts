import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

// This function will be called for every request to protected routes
export default withAuth(
  function middleware(req: NextRequest) {
    // If we reach here, the user is authenticated (withAuth ensures this)
    // You can add additional logic here if needed
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Only allow authenticated users
        return !!token;
      },
    },
  }
);

// Specify which routes require authentication
export const config = {
  matcher: ['/member-only/:path*', '/dashboard/:path*'],
};
