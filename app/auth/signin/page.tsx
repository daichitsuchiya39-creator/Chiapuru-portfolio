'use client';

import React, { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <div className="container-custom py-24">
      <h1 className="mb-4 text-2xl font-bold">Sign in</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Sign in with Google to access member features.
      </p>
      <div>
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
