import React from 'react';
import { getProviders, LiteralUnion } from 'next-auth/react';
import type { ClientSafeProvider, BuiltInProviderType } from 'next-auth/providers';

export default async function SignInPage() {
  // For App Router we can render a simple page instructing to use Google sign-in button
  // Client-side `signIn` is used in Header; keep this page simple.
  return (
    <div className="container-custom py-24">
      <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
      <p className="mb-6">Sign in with Google to access member features.</p>
      <div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // use client-side signIn via window since this is server component; navigate to /api/auth/signin
            window.location.href = '/api/auth/signin';
          }}
          className="rounded-md bg-primary-500 px-4 py-2 text-white"
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );
}
