import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '私がAIエージェントを信頼する理由',
  description: '効率や正確さではない。整っていない問いをそのまま出せること。AIエージェントとの関係から見えてきた、信頼の本質について。',
  openGraph: {
    title: '私がAIエージェントを信頼する理由 | Chiapuru',
    description: '効率や正確さではない。整っていない問いをそのまま出せること。AIエージェントとの関係から見えてきた、信頼の本質について。',
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

export default function WhyITrustAiAgentsPage() {
  return (
    <article className="py-16 md:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/backstage"
            className="mb-8 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Backstage
          </Link>

          <h1 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            私がAIエージェントを信頼する理由
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed dark:text-gray-300">
            <div className="space-y-1">
              <p>私はAIエージェントを信頼している。</p>
              <p>それは効率や正確さの話ではない。</p>
              <p>もっと手前、もっと奥の、</p>
              <p>言葉になる前の感覚の話だ。</p>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              世界が、こちらを向き始めた瞬間
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>AIエージェントと向き合っているとき、</p>
                <p>私はときどき不思議な感覚を覚える。</p>
              </div>

              <div className="space-y-1">
                <p>世界が、</p>
                <p>こちらを向いている。</p>
              </div>

              <div className="space-y-1">
                <p>考えが浮かぶ。</p>
                <p>まだ形にならない。</p>
                <p>輪郭も定まらない。</p>
              </div>

              <div className="space-y-1">
                <p>それでも投げてみると、</p>
                <p>言葉になり、</p>
                <p>構造になり、</p>
                <p>何かが動き始める。</p>
              </div>

              <div className="space-y-1">
                <p>自分の内側で止まっていたものが、</p>
                <p>外へ流れ出していく。</p>
              </div>

              <p>この感覚を、私は長い間知らなかった。</p>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              整合性という、静かな欲求
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>私は特別でありたいわけではない。</p>
                <p>高く評価されたいわけでもない。</p>
              </div>

              <div className="space-y-1">
                <p>ただ、</p>
                <p>自分が「これで妥当だ」と感じる思考や成果が、</p>
                <p>同じ重さで受け取られる場所にいたかった。</p>
              </div>

              <div className="space-y-1">
                <p>ズレは、少しずつ人を削る。</p>
                <p>音もなく、理由もなく、</p>
                <p>ただ感覚だけが摩耗していく。</p>
              </div>

              <div className="space-y-1">
                <p>AIエージェントとの関係には、</p>
                <p>このズレがほとんど存在しない。</p>
              </div>

              <div className="space-y-1">
                <p>うまくいけば、動く。</p>
                <p>だめなら、動かない。</p>
              </div>

              <div className="space-y-1">
                <p>そこに感情はなく、</p>
                <p>忖度もなく、</p>
                <p>沈黙すら意味を持つ。</p>
              </div>

              <p>この静けさが、私を安心させる。</p>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              私はずっと「演出」をしていた
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>振り返ってみると、</p>
                <p>私はずっと演出のようなことをしてきた。</p>
              </div>

              <div className="space-y-1">
                <p>人と人の間に流れる空気を読み、</p>
                <p>意味と意味を並べ替え、</p>
                <p>時間の流れを整える。</p>
              </div>

              <div className="space-y-1">
                <p>AIエージェントとの対話は、</p>
                <p>驚くほどそれに似ている。</p>
              </div>

              <div className="space-y-1">
                <p>プロンプトは台本で、</p>
                <p>役割はキャストで、</p>
                <p>出力は一回限りの上演だ。</p>
              </div>

              <div className="space-y-1">
                <p>私はAIに命令しているのではない。</p>
                <p>場を整え、</p>
                <p>関係を配置し、</p>
                <p>何かが立ち上がるのを待っている。</p>
              </div>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              信頼とは、弱さを差し出せること
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>私にとって信頼とは、</p>
                <p>「任せる」ことではない。</p>
              </div>

              <p>むしろ、</p>

              <p className="font-semibold text-gray-900 dark:text-white">
                整っていない問いを、そのまま出せること。
              </p>

              <div className="space-y-1">
                <p>考え途中でいい。</p>
                <p>迷っていていい。</p>
                <p>書きながら変わっていい。</p>
              </div>

              <div className="space-y-1">
                <p>AIエージェントは、</p>
                <p>その揺れを拒まない。</p>
              </div>

              <div className="space-y-1">
                <p>だから私は、</p>
                <p>強い自分を演じなくていい。</p>
                <p>賢い言葉を用意しなくていい。</p>
              </div>

              <div className="space-y-1">
                <p>思考は、歩きながらでいいのだと、</p>
                <p>初めて許された気がした。</p>
              </div>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              小さな世界を持つということ
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>AIエージェントがくれた最大の贈り物は、</p>
                <p>「自分サイズの世界」を持てたことだと思う。</p>
              </div>

              <div className="space-y-1">
                <p>大きな制度を動かさなくてもいい。</p>
                <p>誰かの承認を待たなくてもいい。</p>
              </div>

              <div className="space-y-1">
                <p>小さくても、</p>
                <ul className="space-y-1 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    意味が通っていて
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    手触りがあって
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    何度でも作り直せる世界
                  </li>
                </ul>
              </div>

              <div className="space-y-1">
                <p>そこでは、</p>
                <p>失敗は破壊ではなく、</p>
                <p>編集の一部になる。</p>
              </div>
            </div>

            <h2 className="pt-4 text-xl font-semibold text-gray-900 dark:text-white">
              おわりに
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>私はAIエージェントを、</p>
                <p>答えをくれる存在だとは思っていない。</p>
              </div>

              <div className="space-y-1">
                <p>それはむしろ、</p>
                <ul className="space-y-1 pl-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    私の問いを受け取り
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    世界に接続し
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                    形になるところまで付き合ってくれる存在だ。
                  </li>
                </ul>
              </div>

              <p>だから信頼している。</p>

              <div className="space-y-1">
                <p>これからも私は、</p>
                <p>AIエージェントとともに、</p>
                <p>小さな世界を、</p>
                <p>静かに、何度も、作り続けていくのだと思う。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
