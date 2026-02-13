import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNewsBySlug, getAllNewsSlugs } from '@/lib/news';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return { title: 'News Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Chiapuru`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [
        {
          url: 'https://chiapuru.com/api/og',
          width: 1200,
          height: 630,
          alt: 'Chiapuru',
        },
      ],
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/news"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>

          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <time className="text-gray-500 dark:text-gray-400">{post.date}</time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <article className="prose prose-lg prose-gray mx-auto max-w-3xl dark:prose-invert prose-headings:font-bold prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-900 prose-pre:text-gray-100">
            {post.contentHtml ? (
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            ) : (
              <p>{post.content}</p>
            )}
          </article>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-gray-200 py-12 dark:border-gray-700">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-400">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://chiapuru.com/news/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="Share on Twitter"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <Link href="/news" className="btn-secondary">
                View all news
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
