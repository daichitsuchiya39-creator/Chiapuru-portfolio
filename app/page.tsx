import Link from 'next/link';
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import AppCard from '@/components/AppCard';
import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/blog';
import { getAllNews } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Privacy-first spreadsheet tools, built by an indie maker. SheetToolBox keeps your files local — nothing leaves your machine.',
  openGraph: {
    type: 'website',
    title: 'Chiapuru — Crafting tools I wish existed',
    description: 'Privacy-first spreadsheet tools, built by an indie maker.',
    url: 'https://chiapuru.com',
    siteName: 'Chiapuru',
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
};

const featuredApps = [
  {
    title: 'Sheet Pic',
    description: 'Extract specific sheets from spreadsheet files. Preserves formatting, styles, and merged cells — all processed locally.',
    slug: 'excel-splitter',
    image: '/images/app_image/Excel-Sheet-Pic.png',
  },
  {
    title: 'Coming Soon...',
    description: 'More tools in the works — stay tuned.',
    slug: '',
    comingSoon: true,
  },
];

export default async function Home() {
  const [posts, news] = await Promise.all([getAllPosts(), getAllNews()]);
  const latestPosts = posts.slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Hi, I'm Chiapuru"
        title="Crafting tools I wish existed"
        description="Privacy-first spreadsheet tools, built by an indie maker. SheetToolBox keeps your files local — nothing leaves your machine."
        ctaText="Explore tools"
        ctaLink="/apps"
        secondaryCtaText="Read the blog"
        secondaryCtaLink="/blog"
      />

      {/* Featured Apps Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">Featured Apps</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Tools built to solve real workflow problems
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredApps.map((app) => (
              <AppCard
                key={app.slug || app.title}
                title={app.title}
                description={app.description}
                slug={app.slug}
                image={app.image}
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

      {/* Latest News Section */}
      {latestNews.length > 0 && (
        <section className="bg-gray-50 py-20 dark:bg-gray-800/50">
          <div className="container-custom">
            <div className="mb-12 text-center">
              <h2 className="section-title">Latest News</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Release notes and updates
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {latestNews.map((post) => (
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

            <div className="mt-12 text-center">
              <Link href="/news" className="btn-secondary">
                View all news
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Blog Posts Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="section-title">Latest Blog Posts</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Behind the scenes of building indie software
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
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Your data stays on your machine. Always.</h2>
            <p className="mb-8 text-lg text-primary-100">
              Privacy-first tools for spreadsheet power users.
            </p>
            <Link
              href="/apps"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
            >
              Explore tools
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
