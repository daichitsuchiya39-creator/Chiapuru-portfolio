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
app/                        # Next.js App Router
├── page.tsx                # トップ（Featured Apps + Latest Blog）
├── blog/                   # ブログ一覧・詳細
├── apps/                   # アプリ一覧（カテゴリ別）・詳細
├── about/                  # プロフィール
├── auth/signin/            # Google OAuth ログインページ
├── dashboard/              # メンバーダッシュボード
├── backstage/              # Backstage（メンバー限定）
├── member-only-blog/       # メンバー限定ブログ
├── member-only-apps/       # メンバー限定アプリ
├── news/                   # ニュース一覧（※現在未使用、Blogに統合済み）
├── privacy/                # プライバシーポリシー
├── api/auth/[...nextauth]/ # NextAuth API エンドポイント
├── feed.xml/               # RSS
├── sitemap.ts              # SEO
└── robots.ts               # SEO

components/                 # 共通コンポーネント
├── Header.tsx              # ナビ（ダークモード + Sign in/out）
├── Footer.tsx              # SNSリンク + Backstageリンク
├── BlogCard.tsx            # ブログカード
├── AppCard.tsx             # アプリカード
├── ThemeProvider.tsx        # ダークモード管理
└── Providers.tsx           # SessionProvider 統合

lib/                        # ユーティリティ
├── blog.ts                 # ブログ記事処理
├── apps.ts                 # アプリデータ処理（HIDDEN_CATEGORIES でフィルタ）
├── auth.ts                 # NextAuth 設定（Google OAuth）
├── supabaseClient.ts       # Supabase クライアント（遅延初期化）
├── membership.ts           # メンバーシップ管理
├── member-only-blog.ts     # メンバー限定ブログ処理
└── member-only-apps.ts     # メンバー限定アプリ処理

middleware.ts               # ルート保護（/member-only-*, /backstage）

content/                    # Markdownコンテンツ
├── blog/                   # ブログ記事
├── apps/                   # アプリ説明
├── member-only-blog/       # メンバー限定ブログ
├── member-only-apps/       # メンバー限定アプリ
├── news/                   # ニュース（※Blog統合により廃止予定）
└── pages/                  # 固定ページ
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

## メンバーシップシステム（✅ 本番稼働中）

### 概要
Google OAuth + Supabase を用いたメンバーシップシステム。2026-02-07 に本番デプロイ完了。

### アーキテクチャ
- **認証**: NextAuth v4 + Google OAuth（JWT セッション）
- **DB**: Supabase (PostgreSQL) — `memberships` テーブル（RLS設定済み）
- **ルート保護**: `middleware.ts` で `/member-only-*`, `/backstage` を保護
- **自動登録**: Google サインイン時に `createOrGetMembership()` で free tier 自動作成

### 環境変数（7つ）
```
NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
```
- ローカル: `.env.local`（git ignore済み）
- 本番: Vercel Environment Variables（Production）
- **`SUPABASE_SERVICE_ROLE_KEY`** は絶対に公開しないこと

### 関連ドキュメント
- `docs/supabase-setup.sql` — DB スキーマ
- `docs/SUPABASE_SETUP.md` — Supabase セットアップ手順
- `docs/VERCEL_DEPLOYMENT.md` — 本番デプロイ手順
- `.env.local.example` — 環境変数テンプレート

### 残タスク
- [ ] メンバー限定コンテンツ追加（随時）
- [ ] 課金機能統合（Stripe / Paddle）
- [ ] メンバーシップティア追加（Free → Pro → Enterprise）
- [ ] メンバー向けメール通知

---

## 開発履歴

### Phase 1: サイト基盤構築（～2026-02-06）
- Next.js 15 + App Router でポートフォリオサイト構築
- Markdown ベースのブログ・アプリ紹介ページ
- OG画像自動生成、プライバシーポリシーページ
- ダークモード対応

### Phase 2: メンバーシップシステム（2026-02-07）
- Google OAuth + Supabase でメンバーシップ機能実装
- メンバー限定コンテンツ（Blog / Apps）の認証保護
- ダッシュボード、お気に入り機能
- Backstage（メンバー限定）ページ追加
- Vercel 本番デプロイ完了

### Phase 3: コンテンツ拡充（2026-02-08～02-12）
- **アプリ追加**: 推しコイン実力チェッカー（Crypto カテゴリ）
- **アプリカテゴリ化**: `/apps` をカテゴリ一覧に変更、Excel専用ページ追加
- **ブログ記事追加**:
  - 私がAIエージェントを信頼する理由
  - Macをエンジニアとして使いこなす完全ガイド
  - Windowsエンジニア向け完全ガイド
  - スタートアップ技術選定ガイド
  - dotfilesリポジトリ作成ガイド
  - Claude API業務自動化ガイド
- **remark-gfm 追加**: Markdown テーブル表示対応
- **favicon 設定**: `logo-chiapuru-site3` を採用

### Phase 4: デスクトップアプリ配布（2026-02-12～02-13）
- SheetPic の Tauri デスクトップ版をビルド（Windows / Mac）
- ダウンロードリンク追加（認証ゲート付き）
- Tauri 開発記録 & Rust 初体験のブログ記事追加
- ToolBox ランディングページ追加

### Phase 5: サイト整理・商標対策（2026-02-13～02-14）
- **商標対策**: 全アプリ名から「Excel」を除去（SheetPic, MacroRemover, SheetMerge）
- **Crypto カテゴリ非表示**: `lib/apps.ts` に `HIDDEN_CATEGORIES` フィルタ追加
- **News → Blog 統合**: News ページの記事を Blog に移動、301 リダイレクト設定（`next.config.ts`）
- **リダイレクト**: `/news/excel-sheetpic-tauri-devlog` → `/blog/excel-sheetpic-tauri-devlog`

### Phase 6: 英語リブランディング・海外展開準備（2026-02-14）
- **サイト言語変更**: `lang="ja"` → `lang="en"`、OG locale `ja_JP` → `en_US`
- **ブランドメッセージ刷新**:
  - タグライン: `仕事を効率化するツールを作っています` → `Crafting tools I wish existed`
  - サブメッセージ: `Privacy-first spreadsheet tools, built by an indie maker.`
  - CTA: `Your data stays on your machine. Always.`
- **全ページ英語化**: Hero, About, Apps, Blog, Footer, RSS フィード
- **「無料」表記の削除**: 有料販売準備のため、無料を強調する文言を除去
- **変更ファイル**: `app/layout.tsx`, `app/page.tsx`, `app/about/page.tsx`, `app/apps/page.tsx`, `app/blog/page.tsx`, `app/feed.xml/route.ts`, `components/Footer.tsx`
- **メンバー限定記事追加**: SheetToolBox プロトタイプ完成報告（`content/member-only-blog/2026-02-13-sheettoolbox-prototype-complete.md`）

### 現在のコンテンツ一覧

#### 公開アプリ（`content/apps/`）
| slug | カテゴリ | 説明 |
|------|---------|------|
| excel-splitter | excel | SheetPic（シート抽出） |
| macro-remover | excel | MacroRemover（マクロ除去） |
| sheet-merge | excel | SheetMerge（シート結合） |
| oshi-coin-checker | crypto | 推しコイン実力チェッカー（※非表示） |

#### ブログ記事（`content/blog/`） — 11記事
技術記事（Mac/Windows/dotfiles/Claude API）、開発記録（Tauri/Rust）、自己紹介など

---
*Last updated: 2026-02-14*
