# Chiapuru Portfolio - プロジェクトガイド

## 概要

**Chiapuru.com** は、個人開発者Chiapuruのポートフォリオサイト兼ブログ。業務効率化ツールの紹介とAI/LLM活用の実践例を発信するプラットフォーム。

### ミッション
- 「自分が欲しかったもの」を形にして共有する
- AI開発ツール（Claude Code）を活用した開発プロセスの実証
- 大学職員としての経験を活かした業務効率化の追求

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, @tailwindcss/typography |
| Content | Markdown + gray-matter + remark |
| Deploy | Vercel（推奨） |

## ディレクトリ構造

```
app/                    # Next.js App Router
├── page.tsx            # トップ（Featured Apps + Latest Blog）
├── blog/               # ブログ一覧・詳細
├── apps/               # アプリ一覧・詳細
├── about/              # プロフィール
├── feed.xml/           # RSS
├── sitemap.ts          # SEO
└── robots.ts           # SEO

components/             # 共通コンポーネント
├── Header.tsx          # ナビ（ダークモード切替含む）
├── Footer.tsx          # SNSリンク
├── BlogCard.tsx        # ブログカード
├── AppCard.tsx         # アプリカード
└── ThemeProvider.tsx   # ダークモード管理

lib/                    # ユーティリティ
├── blog.ts             # ブログ記事処理
└── apps.ts             # アプリデータ処理

content/                # Markdownコンテンツ
├── blog/               # ブログ記事
└── apps/               # アプリ説明
```

## コンテンツ追加方法

### ブログ記事の追加
`content/blog/` に `.md` ファイルを作成:
```yaml
---
title: "記事タイトル"
date: "YYYY-MM-DD"
excerpt: "記事の概要"
tags: ["タグ1", "タグ2"]
---
本文をMarkdownで記述
```

### アプリの追加
`content/apps/` に `.md` ファイルを作成:
```yaml
---
title: "アプリ名"
description: "説明"
features: ["機能1", "機能2"]
howToUse: ["手順1", "手順2"]
externalLink: "https://..."
screenshots: ["/images/app/screenshot1.png"]
---
詳細説明
```

## 開発時の注意点

### スタイリング慣例
- カスタムクラス: `btn-primary`, `btn-secondary`, `card`, `section-title`, `container-custom`
- カラー: `primary-500`（Indigo）, `accent-500`（Green）
- ダークモード: `dark:` プレフィックスで対応

### コード規約
- TypeScriptの型定義を厳密に維持
- Server Components優先（`"use client"` は最小限に）
- 画像は `public/images/` に配置、Next.js Image で最適化

### SEO対応
- 新ページ追加時は `sitemap.ts` を更新
- メタデータは各ページの `generateMetadata()` で動的生成

## 今後の拡張ポイント

### コンテンツ面
- [ ] 新しい業務効率化ツールの追加（AppsScript系、Python系）
- [ ] AI/LLM活用のTips記事の充実
- [ ] 開発プロセスの記録（このサイト自体の開発記録など）

### 機能面
- [ ] タグによる記事フィルタリング
- [ ] 記事検索機能
- [ ] コメント機能（Giscus等）
- [ ] ニュースレター購読機能
- [ ] アプリのダウンロード数トラッキング

### 技術面
- [ ] MDX対応（インタラクティブなコンテンツ）
- [ ] i18n（英語対応）
- [ ] PWA化
- [ ] パフォーマンスモニタリング（Web Vitals）

## 開発者のコンテキスト

**Chiapuru** は大学職員として働きながら個人開発を行う。以下の背景を踏まえて提案すること:

- **強み**: Excel/VBA、Python、AI/LLM活用
- **学習中**: React/Next.js、TypeScript
- **時間制約**: 本業との両立のため、効率的なアプローチを好む
- **価値観**: 過度な抽象化より実用性重視、ユーザー体験を最優先

## コマンド

```bash
npm run dev      # 開発サーバー
npm run build    # ビルド
npm run lint     # Lint
npm run deploy   # Git push（Vercel自動デプロイ）
```

## 提案時のガイドライン

新規チャットでこのプロジェクトに関する提案を行う際は:

1. **既存のアーキテクチャを尊重** - Markdown + App Routerの構成を維持
2. **シンプルさを優先** - 学習コストの高い技術は慎重に
3. **段階的な改善を提案** - 大規模リファクタより小さな改善の積み重ね
4. **実用性を重視** - 「あったら便利」より「これがないと困る」を優先
5. **AI活用を意識** - Claude Codeでの開発効率を考慮した設計

---
*Last updated: 2026-01-31*
