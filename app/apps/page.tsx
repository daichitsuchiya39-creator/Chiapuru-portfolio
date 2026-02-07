import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritesByEmail } from '@/lib/favorites';
import AppCard from '@/components/AppCard';
import { getAllApps } from '@/lib/apps';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Chiapuruが開発した業務効率化ツールの一覧。Excel自動化やWebアプリケーションなど。',
  openGraph: {
    title: 'Apps | Chiapuru',
    description: 'Chiapuruが開発した業務効率化ツールの一覧。Excel自動化やWebアプリケーションなど。',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Chiapuru Apps',
      },
    ],
  },
};

const staticApps = [
  {
    slug: 'excel-splitter',
    title: 'Excel Sheet Extractor',
    description: 'シート名でExcelファイルを簡単に分割。キーワード検索や手動選択で必要なシートだけを抽出できます。',
    image: '',
  },
  {
    slug: '',
    title: 'Coming Soon...',
    description: '次のツールを開発中です。お楽しみに！',
    image: '',
    comingSoon: true,
  },
];

export default async function AppsPage() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user?.email
    ? await getFavoritesByEmail(session.user.email)
    : [];
  const favoritedSlugs = new Set(
    favorites.filter((f) => f.content_type === 'app').map((f) => f.content_slug)
  );
  const apps = await getAllApps();
  const displayApps = apps.length > 0 ? apps : staticApps;

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Apps
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            業務効率化に役立つツールを開発・公開しています。
            <br />
            すべて無料でお使いいただけます。
          </p>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayApps.map((app, index) => (
              <AppCard
                key={app.slug || index}
                title={app.title}
                description={app.description}
                slug={app.slug}
                image={app.image}
                comingSoon={'comingSoon' in app ? app.comingSoon : false}
                isFavorited={favoritedSlugs.has(app.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Request Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            こんなツールが欲しい！
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            リクエストがあれば、ぜひTwitterでお知らせください。
          </p>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Request a feature
          </a>
        </div>
      </section>
    </>
  );
}
