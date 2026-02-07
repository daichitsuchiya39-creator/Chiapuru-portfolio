import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAppBySlug } from '@/lib/member-only-apps';
import FavoriteButton from '@/components/FavoriteButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);

  if (!app) {
    return { title: 'Tool Not Found' };
  }

  return {
    title: `${app.title} | Member Tools | Chiapuru`,
    description: app.description,
  };
}

export default async function MemberAppPage({ params }: Props) {
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
  const app = await getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/member-only-apps"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Member Tools
          </Link>

          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">{app.title}</h1>
          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-600 dark:text-gray-400">{app.description}</p>
          </div>
          <div className="mt-4">
            <FavoriteButton contentType="member-only-app" slug={slug} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom grid max-w-4xl gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2">
            <article className="prose prose-lg dark:prose-invert">
              <div
                dangerouslySetInnerHTML={{
                  __html: app.contentHtml || '',
                }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            {app.features && app.features.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-lg font-semibold">Features</h2>
                <ul className="space-y-2">
                  {app.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="mr-2 h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to Use */}
            {app.howToUse && app.howToUse.length > 0 && (
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h2 className="mb-4 text-lg font-semibold">How to Use</h2>
                <ol className="space-y-2">
                  {app.howToUse.map((step, idx) => (
                    <li key={idx} className="flex">
                      <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-200">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
