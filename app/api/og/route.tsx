import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '40px',
        }}
      >
        {/* ロゴ背景 */}
        <div
          style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #6366f1 0%, #10b981 100%)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            C
          </div>
        </div>

        {/* メインテキスト */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0',
            lineHeight: '1.2',
          }}
        >
          Chiapuru
        </div>

        {/* サブテキスト */}
        <div
          style={{
            fontSize: '28px',
            color: '#a5f3fc',
            textAlign: 'center',
            fontWeight: '500',
            margin: '0',
            marginTop: '8px',
          }}
        >
          AI × 個人開発者
        </div>

        {/* キャッチコピー */}
        <div
          style={{
            fontSize: '18px',
            color: '#cbd5e1',
            textAlign: 'center',
            marginTop: '12px',
          }}
        >
          仕事を効率化するツール
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
