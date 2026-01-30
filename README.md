# Chiapuru Portfolio

個人開発者Chiapuruのポートフォリオサイト。Next.js 15 + TypeScript + Tailwind CSSで構築。

## 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown (gray-matter + remark)

## 機能

- レスポンシブデザイン（モバイルファースト）
- ダークモード対応
- Markdownベースのブログ
- SEO最適化（メタタグ、OGP、サイトマップ、RSS）
- Google Analytics対応（環境変数で設定）

## セットアップ

### 必要な環境

- Node.js 18.17以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/chiapuru-portfolio.git
cd chiapuru-portfolio

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

### 環境変数

`.env.example` をコピーして `.env.local` を作成し、必要な値を設定してください。

```bash
cp .env.example .env.local
```

## ディレクトリ構成

```
chiapuru-portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # トップページ
│   ├── apps/              # アプリ一覧・詳細
│   ├── blog/              # ブログ一覧・詳細
│   ├── about/             # Aboutページ
│   ├── layout.tsx         # ルートレイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # 共通コンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AppCard.tsx
│   ├── BlogCard.tsx
│   └── ThemeProvider.tsx
├── lib/                   # ユーティリティ
│   ├── blog.ts           # ブログ記事の読み込み
│   └── apps.ts           # アプリデータの読み込み
├── content/               # Markdownコンテンツ
│   ├── apps/             # アプリ説明
│   └── blog/             # ブログ記事
└── public/               # 静的ファイル
    └── images/
```

## コンテンツの追加

### ブログ記事の追加

`content/blog/` に Markdown ファイルを作成：

```markdown
---
title: "記事タイトル"
date: "2024-01-01"
excerpt: "記事の抜粋"
tags: ["タグ1", "タグ2"]
---

本文をここに書く...
```

### アプリの追加

`content/apps/` に Markdown ファイルを作成：

```markdown
---
title: "アプリ名"
description: "アプリの説明"
image: "/images/app-screenshot.png"
features:
  - "機能1"
  - "機能2"
howToUse:
  - "ステップ1"
  - "ステップ2"
externalLink: "https://example.com"
---

詳細な説明...
```

## デプロイ

### Vercel（推奨）

1. [Vercel](https://vercel.com) にログイン
2. GitHubリポジトリを連携
3. 環境変数を設定
4. デプロイ

### その他

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

## カスタマイズ

### カラーの変更

`tailwind.config.ts` の `colors.primary` と `colors.accent` を編集：

```typescript
colors: {
  primary: {
    500: '#6366f1', // メインカラー
    // ...
  },
  accent: {
    500: '#10b981', // アクセントカラー
    // ...
  },
}
```

### SNSリンクの変更

`components/Footer.tsx` と `app/about/page.tsx` のリンクを編集。

## ライセンス

MIT License
# Chiapuru-portfolio
