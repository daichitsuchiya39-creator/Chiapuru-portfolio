import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritesByEmail } from '@/lib/favorites';
import CategoryCard from '@/components/CategoryCard';
import AppCard from '@/components/AppCard';
import { getAllCategories } from '@/lib/apps';
import { getAllMemberApps } from '@/lib/member-only-apps';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Chiapuruが開発した業務効率化ツールの一覧。スプレッドシート自動化やWebアプリケーションなど。',
  openGraph: {
    title: 'Apps | Chiapuru',
    description: 'Chiapuruが開発した業務効率化ツールの一覧。スプレッドシート自動化やWebアプリケーションなど。',
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

export default async function AppsPage() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user?.email
    ? await getFavoritesByEmail(session.user.email)
    : [];
  const favoritedSlugs = new Set(
    favorites.filter((f) => f.content_type === 'app').map((f) => f.content_slug)
  );

  const [categories, memberApps] = await Promise.all([
    getAllCategories(),
    getAllMemberApps(),
  ]);

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

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                description={cat.description}
                icon={cat.icon}
                appCount={cat.appCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Member-Only Apps */}
      {memberApps.length > 0 && (
        <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
          <div className="container-custom">
            <h2 className="section-title text-center">Member-Only Apps</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {memberApps.map((app) => (
                <AppCard
                  key={`member-${app.slug}`}
                  title={app.title}
                  description={app.description}
                  slug={app.slug}
                  image=""
                  isFavorited={favoritedSlugs.has(app.slug)}
                  memberOnly={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

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
