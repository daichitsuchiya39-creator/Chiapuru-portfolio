import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sheet ToolBox - デスクトップアプリ',
  description:
    'スプレッドシート作業を効率化する3つのデスクトップアプリ（Windows / Mac対応）。シート抽出・統合・マクロ除去をオフラインで高速処理。',
  openGraph: {
    title: 'Sheet ToolBox | Chiapuru',
    description:
      'スプレッドシート作業を効率化する3つのデスクトップアプリ（Windows / Mac対応）。',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Sheet ToolBox',
      },
    ],
  },
};

const tools = [
  {
    slug: 'excel-splitter',
    title: 'Sheet Pic',
    description:
      'Excelファイルから必要なシートだけを簡単に抽出。キーワード検索や手動選択で効率的にシートを分割できます。',
    image: '/images/app_image/Excel-Sheet-Pic.png',
    features: ['キーワード検索で一括抽出', '手動選択で自由に抽出', '書式を完全保持'],
  },
  {
    slug: 'sheet-merge',
    title: 'Sheet Merge',
    description:
      '複数のExcelファイルのシートを1つのファイルに統合。各ファイルのシートをまとめて管理・共有できます。',
    image: '/images/app_image/SheetMarge.png',
    features: ['複数ファイルを一括統合', 'シート名の自動調整', '書式・数式を維持'],
  },
  {
    slug: 'macro-remover',
    title: 'Macro Remover',
    description:
      'マクロ付きExcelファイル（.xlsm）からマクロを除去し、安全な.xlsxファイルに変換します。',
    image: '/images/app_image/Excel-Macro-Remover.png',
    features: ['ワンクリックでマクロ除去', 'データ・書式を完全保持', 'ドラッグ&ドロップ対応'],
  },
];

export default function ExcelToolBoxPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <Link
            href="/apps"
            className="mb-6 inline-flex items-center text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Apps
          </Link>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"
                />
              </svg>
              Desktop App - Windows / Mac 対応
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Sheet ToolBox
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              スプレッドシート作業を効率化する3つのデスクトップアプリ。
              <br />
              オフラインで動作し、大容量ファイルも高速に処理できます。
            </p>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="border-b border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636a9 9 0 11-12.728 0M12 3v9"
                  />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                オフライン対応
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                インターネット不要。社内ネットワークでも安心して使えます
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                高速処理
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rust + Tauriで構築。大容量ファイルもストレスなく処理
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                <svg
                  className="h-6 w-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                安全・安心
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ファイルは端末内で処理。外部サーバーへの送信はありません
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center">3つのツール</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/apps/${tool.slug}`}
                className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {tool.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-4 space-y-1.5">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="h-4 w-4 shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-1 font-medium text-primary-500 dark:text-primary-400">
                    詳細・ダウンロード
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Web版との比較 */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom">
          <h2 className="section-title text-center">Web版との違い</h2>
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      &nbsp;
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Web版
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                      デスクトップ版
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      インストール
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      不要
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      必要
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      オフライン利用
                    </td>
                    <td className="px-6 py-3 text-center text-gray-400">-</td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      対応
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      大容量ファイル
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      100MBまで
                    </td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      制限なし
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      処理速度
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      通常
                    </td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      高速（Rust）
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      対応OS
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      全OS
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      Windows / Mac
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center">ダウンロード</h2>
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                3つのツールがすべて入ったデスクトップアプリ
              </p>
              <div className="space-y-4">
                {/* Windows */}
                <a
                  href="https://github.com/daichitsuchiya39-creator/excel-toolbox/releases/download/v0.1.0/Excel.Toolbox_0.1.0_x64-setup.exe"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-700 dark:hover:bg-primary-900/20"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 12V6.75l8-1.25V12H3zm0 .5h8v6.5l-8-1.25V12.5zM11.5 12V5.35l9.5-1.6V12h-9.5zm0 .5h9.5v8.25l-9.5-1.6V12.5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Windows版</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">v0.1.0 - x64 セットアップ (.exe)</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>

                {/* Mac */}
                <a
                  href="https://github.com/daichitsuchiya39-creator/excel-toolbox/releases/download/v0.1.0/Excel.Toolbox_0.1.0_aarch64.dmg"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-all hover:border-primary-300 hover:bg-primary-50 dark:border-gray-600 dark:hover:border-primary-700 dark:hover:bg-primary-900/20"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Mac版</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">v0.1.0 - Apple Silicon (.dmg)</p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">
              まずはWeb版で試してみませんか？
            </h2>
            <p className="mb-8 text-primary-100">
              インストール不要のWeb版で各ツールをお試しいただけます。
            </p>
            <Link
              href="/apps/excel"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
            >
              Web版を試す
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
