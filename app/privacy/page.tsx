import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Chiapuru and its tools.',
  openGraph: {
    title: 'Privacy Policy | Chiapuru',
    description: 'Privacy policy for Chiapuru and its tools.',
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

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'content/pages/privacy.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title,
    contentHtml,
  };
}

export default async function PrivacyPage() {
  const privacy = await getPrivacyContent();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {privacy.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="prose prose-sm dark:prose-invert max-w-3xl md:prose-base">
            <article
              dangerouslySetInnerHTML={{ __html: privacy.contentHtml }}
              className="mx-auto space-y-4"
            />
          </div>
        </div>
      </section>
    </>
  );
}
