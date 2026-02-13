import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritesByEmail } from '@/lib/favorites';
import AppCard from '@/components/AppCard';
import Link from 'next/link';
import { getAppsByCategory } from '@/lib/apps';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Spreadsheet Tools',
  description: 'スプレッドシートの分割・統合・変換など、表計算作業を効率化するツール群。',
  openGraph: {
    title: 'Spreadsheet Tools | Chiapuru',
    description: 'スプレッドシートの分割・統合・変換など、表計算作業を効率化するツール群。',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Spreadsheet Tools',
      },
    ],
  },
};

export default async function ExcelAppsPage() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user?.email
    ? await getFavoritesByEmail(session.user.email)
    : [];
  const favoritedSlugs = new Set(
    favorites.filter((f) => f.content_type === 'app').map((f) => f.content_slug)
  );

  const apps = await getAppsByCategory('excel');

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/apps"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Apps
          </Link>
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Spreadsheet Tools
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              スプレッドシートの分割・統合・変換など、表計算作業を効率化するツール群
            </p>
          </div>
        </div>
      </section>

      {/* Sheet ToolBox Banner */}
      <section className="py-8">
        <div className="container-custom">
          <Link
            href="/apps/excel-toolbox"
            className="group flex items-center justify-between rounded-xl border border-primary-200 bg-gradient-to-r from-primary-50 to-white p-6 transition-all hover:shadow-lg dark:border-primary-800 dark:from-primary-900/20 dark:to-gray-800"
          >
            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Desktop App
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Sheet ToolBox
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                3つのツールをデスクトップアプリ（Windows / Mac）で使えます
              </p>
            </div>
            <svg
              className="h-5 w-5 shrink-0 text-primary-500 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard
                key={app.slug}
                title={app.title}
                description={app.description}
                slug={app.slug}
                image={app.image}
                isFavorited={favoritedSlugs.has(app.slug)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
