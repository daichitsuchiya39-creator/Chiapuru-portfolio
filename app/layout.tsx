import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Chiapuru - 仕事を効率化するツール',
    template: '%s | Chiapuru',
  },
  description:
    'AI × 個人開発者のChiapuruが作る、仕事を効率化するツールとブログ。Excel自動化、Python、AI活用など。',
  keywords: ['個人開発', 'Excel自動化', 'Python', 'Flask', 'AI', 'ツール開発'],
  authors: [{ name: 'Chiapuru' }],
  creator: 'Chiapuru',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://chiapuru.com',
    siteName: 'Chiapuru',
    title: 'Chiapuru - 仕事を効率化するツール',
    description: 'AI × 個人開発者のChiapuruが作る、仕事を効率化するツールとブログ。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chiapuru - 仕事を効率化するツール',
    description: 'AI × 個人開発者のChiapuruが作る、仕事を効率化するツールとブログ。',
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
    <html lang="ja" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
