import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppBySlug, getAllAppSlugs } from '@/lib/apps';

interface Props {
  params: Promise<{ slug: string }>;
}

// Default app data for excel-splitter if no markdown file exists
const defaultExcelSplitter = {
  slug: 'excel-splitter',
  title: 'Excel Sheet Extractor',
  description: 'シート名でExcelファイルを簡単に分割。キーワード検索や手動選択で必要なシートだけを抽出できます。',
  image: '',
  features: [
    'キーワード検索でシートを抽出 - シート名に含まれるキーワードで一括抽出',
    '手動選択で複数シート抽出 - 必要なシートを自由に選んで抽出',
    '書式を保持したまま新ファイル生成 - 元のフォーマットを崩さずに保存',
    '複数ファイルの一括処理 - まとめて処理で作業効率アップ',
  ],
  howToUse: [
    'Excelファイルをアップロード',
    '抽出したいシートを選択（キーワード検索または手動選択）',
    '「抽出」ボタンをクリック',
    '新しいExcelファイルをダウンロード',
  ],
  externalLink: '',
  screenshots: [],
  disclaimer:
    '本ツールは提供される情報の正確性、完全性、有用性についていかなる保証もいたしません。本ツールを使用して生成されたデータおよびファイルについて、その正確性をご利用ユーザー様ご自身で目視により確認してください。本ツール使用によって生じたいかなる損害についても、当サイト・開発者は一切責任を負いかねます。',
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

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/apps"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Apps
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                {app.title}
              </h1>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">{app.description}</p>

              {app.externalLink && (
                <a
                  href={app.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  今すぐ使う
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">{app.title}を使ってみよう</h2>
            <p className="mb-8 text-primary-100">今すぐ無料でお試しいただけます。</p>
            {app.externalLink ? (
              <a
                href={app.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
              >
                今すぐ使う
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
              <p className="text-primary-100">リンクは近日公開予定です</p>
            )}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      {app.disclaimer && (
        <section className="bg-red-50 py-16 dark:bg-red-950/20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <svg
                    className="h-5 w-5 text-red-600 dark:text-red-400"
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
                  <h3 className="mb-3 font-bold text-red-900 dark:text-red-100">免責事項</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">{app.disclaimer}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
