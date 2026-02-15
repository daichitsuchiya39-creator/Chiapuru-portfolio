import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DownloadCounter from '@/components/DownloadCounter';
import DownloadButton from '@/components/DownloadButton';

export const metadata: Metadata = {
  title: 'Sheet ToolBox - Desktop App',
  description:
    'Three privacy-first desktop tools for spreadsheets (Windows / Mac). Extract sheets, merge files, and remove macros — all offline.',
  openGraph: {
    title: 'Sheet ToolBox | Chiapuru',
    description:
      'Three privacy-first desktop tools for spreadsheets (Windows / Mac).',
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
      'Extract specific sheets from spreadsheet files. Use keyword search or manual selection to split workbooks efficiently.',
    image: '/images/app_image/Excel-Sheet-Pic.png',
    features: ['Batch extract by keyword', 'Manual sheet selection', 'Preserves formatting'],
  },
  {
    slug: 'sheet-merge',
    title: 'Sheet Merge',
    description:
      'Merge sheets from multiple spreadsheet files into one. Consolidate and share across teams.',
    image: '/images/app_image/SheetMarge.png',
    features: ['Batch merge multiple files', 'Auto-adjusts sheet names', 'Preserves formulas & formatting'],
  },
  {
    slug: 'macro-remover',
    title: 'Macro Remover',
    description:
      'Remove VBA macros from .xlsm files and convert them to safe .xlsx format.',
    image: '/images/app_image/Excel-Macro-Remover.png',
    features: ['One-click macro removal', 'Preserves data & formatting', 'Drag & drop support'],
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
              Desktop App — Windows / Mac
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Sheet ToolBox
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Three desktop tools for spreadsheet workflows.
              <br />
              Works offline. Handles large files at native speed.
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
                Works Offline
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No internet required. Safe to use on corporate networks.
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
                Blazing Fast
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built with Rust + Tauri. Handles large files without breaking a sweat.
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
                Privacy-First
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All processing stays on your machine. Nothing is sent to external servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center">Three Tools, One App</h2>
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
                    Details & Download
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
          <h2 className="section-title text-center">Web vs Desktop</h2>
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">
                      &nbsp;
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-gray-900 dark:text-white">
                      Web
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-primary-600 dark:text-primary-400">
                      Desktop
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      Installation
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      Not required
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      Required
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      Offline Use
                    </td>
                    <td className="px-6 py-3 text-center text-gray-400">-</td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      Supported
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      File Size Limit
                    </td>
                    <td className="px-6 py-3 text-center text-orange-600 dark:text-orange-400">
                      Up to 5MB
                    </td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      No limit
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      Data Privacy
                    </td>
                    <td className="px-6 py-3 text-center text-orange-600 dark:text-orange-400">
                      Uploaded to server
                    </td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      100% local
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      Speed
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      Standard
                    </td>
                    <td className="px-6 py-3 text-center text-green-600 dark:text-green-400">
                      Fast (Rust)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                      Platforms
                    </td>
                    <td className="px-6 py-3 text-center text-gray-600 dark:text-gray-400">
                      All OS
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
          <h2 className="section-title text-center">Download</h2>
          <div className="mx-auto max-w-xl space-y-6">
            {/* Download Counter */}
            <DownloadCounter />

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                All three tools in one desktop app
              </p>
              <div className="space-y-4">
                {/* Windows */}
                <DownloadButton
                  href="https://github.com/daichitsuchiya39-creator/excel-toolbox/releases/download/v0.1.0/Excel.Toolbox_0.1.0_x64-setup.exe"
                  platform="windows"
                  version="v0.1.0"
                  fileName="x64 Setup (.exe)"
                />

                {/* Mac */}
                <DownloadButton
                  href="https://github.com/daichitsuchiya39-creator/excel-toolbox/releases/download/v0.1.0/Excel.Toolbox_0.1.0_aarch64.dmg"
                  platform="mac"
                  version="v0.1.0"
                  fileName="Apple Silicon (.dmg)"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Have a discount code? You can enter it at checkout.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">
              Try the Web version first
            </h2>
            <p className="mb-8 text-primary-100">
              No installation needed — try each tool right in your browser.
              <br />
              <span className="text-sm text-primary-200">
                Web version: 5MB file size limit. Not suitable for sensitive or confidential data.
              </span>
            </p>
            <Link
              href="/apps/excel"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
            >
              Try Web Version
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
