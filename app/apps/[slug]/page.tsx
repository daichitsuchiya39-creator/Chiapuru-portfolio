import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppBySlug, getAllAppSlugs } from '@/lib/apps';
import FavoriteButton from '@/components/FavoriteButton';

interface Props {
  params: Promise<{ slug: string }>;
}

// Default app data for excel-splitter if no markdown file exists
const CATEGORY_LABELS: Record<string, { href: string; label: string }> = {
  excel: { href: '/apps/excel', label: 'Back to Sheet Tool Box' },
};

const defaultExcelSplitter = {
  slug: 'excel-splitter',
  title: 'Sheet Pic',
  description: 'Extract specific sheets from spreadsheet files. Use keyword search or manual selection to split workbooks.',
  category: 'excel',
  image: '',
  features: [
    'Keyword search - Batch extract sheets by keyword match',
    'Manual selection - Pick the sheets you need',
    'Preserves formatting - Keeps styles, merged cells, and formulas intact',
    'Batch processing - Process multiple files at once',
  ],
  howToUse: [
    'Upload your spreadsheet file',
    'Select sheets to extract (keyword search or manual selection)',
    'Click "Extract"',
    'Download the new spreadsheet file',
  ],
  externalLink: '',
  screenshots: [],
  disclaimer:
    'This tool is provided as-is without warranty of any kind. Please verify the accuracy of generated files yourself. The developer assumes no liability for any damages resulting from the use of this tool.',
};

export async function generateStaticParams() {
  const slugs = await getAllAppSlugs();
  const defaultSlugs = ['excel-splitter'];
  const allSlugs = [...new Set([...slugs, ...defaultSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let app = await getAppBySlug(slug);

  if (!app && slug === 'excel-splitter') {
    app = defaultExcelSplitter;
  }

  if (!app) {
    return { title: 'App Not Found' };
  }

  return {
    title: app.title,
    description: app.description,
    openGraph: {
      title: `${app.title} | Chiapuru`,
      description: app.description,
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

export default async function AppDetailPage({ params }: Props) {
  const { slug } = await params;
  let app = await getAppBySlug(slug);

  if (!app && slug === 'excel-splitter') {
    app = defaultExcelSplitter;
  }

  if (!app) {
    notFound();
  }

  const backLink = app.category && CATEGORY_LABELS[app.category]
    ? CATEGORY_LABELS[app.category]
    : { href: '/apps', label: 'Back to Apps' };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href={backLink.href}
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLink.label}
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                {app.title}
              </h1>
              <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">{app.description}</p>
              <div className="mb-8">
                <FavoriteButton contentType="app" slug={slug} />
              </div>

              {app.externalLink && (
                <a
                  href={app.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Try it now
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-2xl dark:bg-gray-700">
              {app.image ? (
                <Image src={app.image} alt={app.title} fill className="object-cover" priority />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl">📊</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {app.features && app.features.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="section-title text-center">Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {app.features.map((feature, index) => {
                const [title, ...descParts] = feature.split(' - ');
                const description = descParts.join(' - ');
                return (
                  <div key={index} className="card flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">{title}</h3>
                      {description && (
                        <p className="text-gray-600 dark:text-gray-400">{description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How to Use Section */}
      {app.howToUse && app.howToUse.length > 0 && (
        <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
          <div className="container-custom">
            <h2 className="section-title text-center">How to Use</h2>
            <div className="mx-auto max-w-2xl">
              {app.howToUse.map((step, index) => (
                <div key={index} className="mb-6 flex items-start gap-4 last:mb-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-gray-700 dark:text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Web Version Warning */}
      {app.category === 'excel' && app.externalLink && (
        <section className="py-8">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-900/20">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300">
                    Web Version Limitations
                  </h4>
                  <p className="mt-1 text-sm text-orange-700 dark:text-orange-400">
                    The web version has a 5MB file size limit and is not recommended for
                    sensitive or confidential data. For larger files and full offline
                    privacy, use the{' '}
                    <Link
                      href="/apps/excel-toolbox"
                      className="font-semibold underline hover:no-underline"
                    >
                      Desktop version
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Section */}
      {app.screenshots && app.screenshots.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="section-title text-center">Screenshots</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {app.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 shadow-lg dark:bg-gray-700"
                >
                  <Image src={screenshot} alt={`Screenshot ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      {app.contentHtml && (
        <section className="py-16">
          <div className="container-custom">
            <article className="prose prose-lg prose-gray mx-auto max-w-3xl dark:prose-invert prose-headings:font-bold prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline">
              <div dangerouslySetInnerHTML={{ __html: app.contentHtml }} />
            </article>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Try {app.title}</h2>
            <p className="mb-8 text-primary-100">Get started right away.</p>
            {app.externalLink ? (
              <a
                href={app.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
              >
                Try it now
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <p className="text-primary-100">Link coming soon</p>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      {app.disclaimer && (
        <section className="bg-gray-50 py-16 dark:bg-gray-800/30">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-600 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100">Disclaimer</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{app.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
