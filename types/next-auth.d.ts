import 'next-auth';

declare module 'next-auth' {
  interface Session {
    membershipTier?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    membershipTier?: string;
  }
}
