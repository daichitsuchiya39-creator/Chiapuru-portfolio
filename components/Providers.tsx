'use client';

import { ThemeProvider } from './ThemeProvider';
import Header from './Header';
import Footer from './Footer';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
