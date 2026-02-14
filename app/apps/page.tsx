import type { Metadata } from 'next';
import CategoryCard from '@/components/CategoryCard';
import { getAllCategories } from '@/lib/apps';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Privacy-first spreadsheet tools by Chiapuru. Extract sheets, remove macros, merge files — all processed locally.',
  openGraph: {
    title: 'Apps | Chiapuru',
    description: 'Privacy-first spreadsheet tools by Chiapuru. Extract sheets, remove macros, merge files — all processed locally.',
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
  const categories = await getAllCategories();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Apps
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Privacy-first tools for spreadsheet power users.
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

      {/* Request Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Have a tool idea?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            I&apos;d love to hear your suggestions. Drop me a message on X.
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
