import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Chiapuruのプロフィール。大学職員として働きながら、業務効率化ツールを開発する個人開発者。',
};

const skills = [
  { name: 'Python', level: 90 },
  { name: 'Flask', level: 85 },
  { name: 'Excel/VBA', level: 95 },
  { name: 'JavaScript/TypeScript', level: 75 },
  { name: 'React/Next.js', level: 70 },
  { name: 'HTML/CSS', level: 85 },
];

const timeline = [
  {
    year: '現在',
    title: '個人開発 × 大学職員',
    description: '業務で感じた課題をツールで解決。副業としての起業準備も進行中。',
  },
  {
    year: '2024',
    title: 'Excel Sheet Extractor リリース',
    description: '最初のWebアプリをリリース。Flaskで開発し、多くのユーザーに利用されている。',
  },
  {
    year: '2020',
    title: 'プログラミング学習開始',
    description: 'Pythonから学習を開始。業務効率化のためのスクリプト作成からスタート。',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-6xl dark:bg-primary-900/30">
              👋
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Hi, I&apos;m Chiapuru
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              大学職員 × 個人開発者
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="section-title">About Me</h2>
            <div className="prose prose-lg prose-gray dark:prose-invert">
              <p>
                大学職員として働きながら、日々の業務で感じた「こんなツールがあったらいいな」を形にしている個人開発者です。
              </p>
              <p>
                2020年にPythonを学び始め、最初は業務効率化のための小さなスクリプトを書いていました。
                そこから徐々にWebアプリケーション開発に興味を持ち、Flask、React、Next.jsなどを学んでいます。
              </p>
              <p>
                私が作るツールは、すべて「自分が欲しかったもの」です。
                同じような課題を抱えている方の役に立てれば嬉しいです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="section-title">Skills</h2>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="section-title">Timeline</h2>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="mb-1 inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      {item.year}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800/50">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">Connect</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              お仕事のご依頼やご質問は、以下のSNSからお気軽にどうぞ。
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 text-center text-white">
            <h2 className="mb-4 text-3xl font-bold">Check out my work</h2>
            <p className="mb-8 text-primary-100">
              私が開発したツールやブログ記事をご覧ください。
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/apps"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-primary-600 transition-all duration-200 hover:bg-gray-100"
              >
                View Apps
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
