import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { createOrGetMembership } from './membership';

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
    async signIn({ user }) {
      // Auto-create/get membership when user signs in with Google
      if (user.email) {
        await createOrGetMembership(user.email);
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // attach token.sub as id if present
      if (token && token.sub && session.user) {
        (session.user as User & { id: string }).id = token.sub;
      }
      return session;
    },
  },
};
