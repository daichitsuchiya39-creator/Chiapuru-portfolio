'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  // For App Router we can render a simple page instructing to use Google sign-in button
  // Client-side `signIn` is used in Header; keep this page simple.
  return (
    <div className="container-custom py-24">
      <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
      <p className="mb-6">Sign in with Google to access member features.</p>
      <div>
        <button
          onClick={() => signIn('google')}
          className="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
