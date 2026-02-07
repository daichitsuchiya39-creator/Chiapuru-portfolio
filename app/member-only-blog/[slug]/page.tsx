import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPostBySlug } from '@/lib/member-only-blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Chiapuru Members`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function MemberBlogPostPage({ params }: Props) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    // Redirect to sign-in
    return (
      <div className="container-custom py-24">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p>Please sign in to view member-only content.</p>
        <Link href="/auth/signin" className="text-primary-500 hover:underline">
          Sign in
        </Link>
      </div>
    );
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/member-only-blog"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Member Blog
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{post.date}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900 dark:text-primary-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <article className="prose prose-lg dark:prose-invert max-w-3xl">
            <div
              dangerouslySetInnerHTML={{
                __html: post.contentHtml || '',
              }}
            />
          </article>
        </div>
      </section>
    </>
  );
}
