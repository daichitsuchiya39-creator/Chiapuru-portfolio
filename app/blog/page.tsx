import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: '個人開発、Excel自動化、Python、Flaskなどの技術記事や開発の裏話を公開しています。',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

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
