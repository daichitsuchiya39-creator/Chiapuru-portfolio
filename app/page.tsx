import Link from 'next/link';
import Hero from '@/components/Hero';
import AppCard from '@/components/AppCard';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';

const featuredApps = [
  {
    title: 'Excel Sheet Extractor',
    description: 'シート名でExcelファイルを簡単に分割。キーワード検索や手動選択で必要なシートだけを抽出できます。',
    slug: 'excel-splitter',
  },
  {
    title: 'Coming Soon...',
    description: '次のツールを開発中です。お楽しみに！',
    slug: '',
    comingSoon: true,
  },
];

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Hi, I'm Chiapuru 👋"
        title="仕事を効率化するツールを作っています"
        description="日々の仕事で感じた「こんなツールがあったらいいな」を形にしています。Excel自動化やWebアプリの開発を中心に、誰でも使える便利なツールを公開しています。"
        ctaText="Check out my apps"
        ctaLink="/apps"
        secondaryCtaText="Read my blog"
        secondaryCtaLink="/blog"
      />

      {/* Featured Apps Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">Featured Apps</h2>
            <p className="text-gray-600 dark:text-gray-400">
              業務効率化に役立つツールを開発・公開しています
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredApps.map((app) => (
              <AppCard
                key={app.slug || app.title}
                title={app.title}
                description={app.description}
                slug={app.slug}
                comingSoon={app.comingSoon}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/apps" className="btn-secondary">
              View all apps
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">Latest Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">
              開発の裏話やTips、個人開発についての記事を書いています
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {latestPosts.map((post) => (
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

          <div className="mt-12 text-center">
            <Link href="/blog" className="btn-secondary">
              View all posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to boost your productivity?</h2>
            <p className="mb-8 text-lg text-primary-100">
              あなたの日々の業務を少しだけお手伝いします。
            </p>
            <Link
              href="/apps"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
            >
              Check out my apps
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
