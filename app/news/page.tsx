import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getAllNews } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News',
  description: 'Release notes, updates, and announcements for Chiapuru apps.',
  openGraph: {
    title: 'News | Chiapuru',
    description: 'Release notes, updates, and announcements for Chiapuru apps.',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Chiapuru News',
      },
    ],
  },
};

export default async function NewsPage() {
  const posts = await getAllNews();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            News
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Release notes and updates
          </p>
        </div>
      </section>

      {/* News Posts */}
      <section className="py-16">
        <div className="container-custom">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  tags={post.tags}
                  basePath="/news"
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
                No news yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
