import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Chiapuru — Crafting tools I wish existed',
    template: '%s | Chiapuru',
  },
  description:
    'Privacy-first spreadsheet tools, built by an indie maker. SheetToolBox keeps your files local — nothing leaves your machine.',
  keywords: ['spreadsheet tools', 'SheetToolBox', 'privacy-first', 'desktop app', 'Tauri', 'indie developer'],
  authors: [{ name: 'Chiapuru' }],
  creator: 'Chiapuru',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chiapuru.com',
    siteName: 'Chiapuru',
    title: 'Chiapuru — Crafting tools I wish existed',
    description: 'Privacy-first spreadsheet tools, built by an indie maker.',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Chiapuru — Crafting tools I wish existed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chiapuru — Crafting tools I wish existed',
    description: 'Privacy-first spreadsheet tools, built by an indie maker.',
    images: ['https://chiapuru.com/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
