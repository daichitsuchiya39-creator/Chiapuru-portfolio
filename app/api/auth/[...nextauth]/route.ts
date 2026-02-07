import NextAuth from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const GET = NextAuth(authOptions as any);
export const POST = GET;
