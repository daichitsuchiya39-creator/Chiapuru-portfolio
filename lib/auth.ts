import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Keep defaults; we'll read session info on server and query Supabase for membership
    async session({ session, token }) {
      // attach token.sub as id if present
      if (token && (token as any).sub) {
        (session as any).user.id = (token as any).sub;
      }
      return session;
    },
  },
};
