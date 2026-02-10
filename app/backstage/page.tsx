import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Backstage',
  description: 'chiapuru.com の舞台裏。なぜツールを作っているのか、何を大切にしているのか。',
  openGraph: {
    title: 'Backstage | Chiapuru',
    description: 'chiapuru.com の舞台裏。なぜツールを作っているのか、何を大切にしているのか。',
    images: [
      {
        url: 'https://chiapuru.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Chiapuru Backstage',
      },
    ],
  },
};

export default function BackstagePage() {
  return (
    <article className="py-16 md:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Backstage
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
            <p>ここは、chiapuru.com の舞台裏です。</p>
            <p>メンバー登録をしてくださった方だけに見えています。</p>

            <div className="space-y-1">
              <p>表では、</p>
              <p>普段の仕事を少し楽にするためのツールや、</p>
              <p>考える前提を整えるための小さな仕組みを置いています。</p>
            </div>

            <div className="space-y-1">
              <p>この場所では、</p>
              <p>なぜそれらを作っているのか、</p>
              <p>何を大切にしているのかを、</p>
              <p>静かに書き留めています。</p>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              大切にしていること
            </h2>

            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                人がやらなくていいことは、できるだけ減らしたい
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                思考する時間を、事務や手続きに奪われたくない
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                小さくても、すぐに試せる世界を作りたい
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                便利さは、やさしさに近いと思っている
              </li>
            </ul>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              なぜツールを作るのか
            </h2>

            <div className="space-y-4">
              <p>効率化が目的ではありません。<br />余白を取り戻すことが目的です。</p>
              <p>余白があれば、人は考えられる。<br />考えられれば、選べる。</p>
              <p>それだけで、世界は少し静かになると信じています。</p>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              これから
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>ここに書かれていることは、</p>
                <p>ときどき書き換わるかもしれません。</p>
              </div>

              <div className="space-y-1">
                <p>chiapuru.com に置いてあるツールも、</p>
                <p>同じように変わっていきます。</p>
              </div>

              <div className="space-y-1">
                <p>変わりながら、</p>
                <p>それでも手触りだけは失わないように。</p>
              </div>
            </div>

            <div className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-700">
              <Link
                href="/backstage/why-i-trust-ai-agents"
                className="group block"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">Essay</span>
                <h3 className="mt-1 text-lg font-medium text-gray-900 transition-colors group-hover:text-primary-500 dark:text-white dark:group-hover:text-primary-400">
                  私がAIエージェントを信頼する理由
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
