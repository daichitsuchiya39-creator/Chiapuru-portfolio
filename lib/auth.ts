import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

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
    async session({ session, token }: { session: Session; token: JWT }) {
      // attach token.sub as id if present
      if (token && token.sub && session.user) {
        (session.user as User & { id: string }).id = token.sub;
      }
      return session;
    },
  },
};
