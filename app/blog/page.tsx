import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritesByEmail } from '@/lib/favorites';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { getAllMemberPosts } from '@/lib/member-only-blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog',
  description: '個人開発、Excel自動化、Python、Flaskなどの技術記事や開発の裏話を公開しています。',
  openGraph: {
    title: 'Blog | Chiapuru',
    description: '個人開発、Excel自動化、Python、Flaskなどの技術記事や開発の裏話を公開しています。',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Chiapuru Blog',
      },
    ],
  },
};

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const favorites = session?.user?.email
    ? await getFavoritesByEmail(session.user.email)
    : [];
  const favoritedSlugs = new Set(
    favorites.filter((f) => f.content_type === 'blog').map((f) => f.content_slug)
  );
  const [posts, memberPosts] = await Promise.all([getAllPosts(), getAllMemberPosts()]);

  const allPosts = [
    ...posts.map((p) => ({ ...p, memberOnly: false })),
    ...memberPosts.map((p) => ({ ...p, memberOnly: true })),
  ].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    const orderA = 'order' in a ? (a.order as number) ?? 0 : 0;
    const orderB = 'order' in b ? (b.order as number) ?? 0 : 0;
    return orderB - orderA;
  });

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            開発の裏話やTips、個人開発についての記事を書いています。
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container-custom">
          {allPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post) => (
                <BlogCard
                  key={`${post.memberOnly ? 'member-' : ''}${post.slug}`}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  tags={post.tags}
                  isFavorited={favoritedSlugs.has(post.slug)}
                  memberOnly={post.memberOnly}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                まだ記事がありません。
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                近日中に最初の記事を公開予定です。お楽しみに！
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
