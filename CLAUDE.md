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

## 【引き継ぎドキュメント】メンバーシップシステム実装状況（2026-02-07）

### 概要
Google OAuth + Supabase を用いたメンバーシップシステムを実装完了。ローカル開発環境で動作確認済み。本番環境（Vercel）へのデプロイ準備中。

### 実装済み機能

#### 1. 認証基盤（Next-Auth.js v4 + Google OAuth）
- **ファイル**: `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- **機能**:
  - Google OAuth ログイン
  - JWT ベースのセッション管理
  - ログイン時にメンバーシップ自動作成
- **状況**: ✅ ローカルで動作確認済み（ポート 3001）

#### 2. Supabase 連携
- **ファイル**: `lib/supabaseClient.ts`, `lib/membership.ts`
- **機能**:
  - Supabase クライアント初期化（公開Key + 管理者Key）
  - メンバーシップテーブルの照会・自動作成
  - Row Level Security (RLS) ポリシー設定
- **スキーマ**: `memberships`（id, email, tier, expires_at, created_at, updated_at）
- **セットアップスクリプト**: `docs/supabase-setup.sql`
- **状況**: ✅ テーブル作成・RLS設定完了

#### 3. ユーザーインターフェース
- **ログイン UI**: `app/auth/signin/page.tsx`（Google ボタン）
- **ダッシュボード**: `app/dashboard/page.tsx`（ユーザー情報・メンバーシップ表示）
- **Header**: `components/Header.tsx`（Sign in / Sign out ボタン、Dashboard リンク）
- **状況**: ✅ ローカルで動作確認済み

#### 4. メンバー限定コンテンツ保護
- **Middleware**: `middleware.ts`（`/member-only-*` ルート認証保護）
- **メンバー限定ブログ**: 
  - `lib/member-only-blog.ts`（Markdown 読み込み）
  - `app/member-only-blog/page.tsx`（一覧）
  - `app/member-only-blog/[slug]/page.tsx`（詳細）
- **メンバー限定ツール**:
  - `lib/member-only-apps.ts`（Markdown 読み込み）
  - `app/member-only-apps/page.tsx`（一覧）
  - `app/member-only-apps/[slug]/page.tsx`（詳細）
- **認証**: Server Component 内で `getServerSession()`確認 → 未認証は `/auth/signin` へリダイレクト
- **状況**: ✅ Build 成功、構造完成

#### 5. 自動メンバー登録フロー
1. ユーザーが Google でサインイン
2. NextAuth `signIn` callback → `createOrGetMembership()` 呼び出し
3. Supabase に自動的に `memberships` レコード作成（tier: 'free'）
4. Dashboard でメンバーシップ情報表示
- **状況**: ✅ ローカルで動作確認済み

### テックスタック（追加部分）

| レイヤー | 技術 |
|---------|------|
| **認証** | next-auth v4.22.1 |
| **OAuth Provider** | Google Cloud Console |
| **Database** | Supabase (PostgreSQL) |
| **Database Client** | @supabase/supabase-js v2.0.4 |
| **Session Strategy** | JWT (secure httpOnly Cookie) |
| **Route Protection** | Next.js Middleware |

### 環境変数

#### ローカル開発（`.env.local`）
```
NEXTAUTH_SECRET=（openssl rand -base64 32 で生成）
NEXTAUTH_URL=http://localhost:3000 または http://localhost:3001
GOOGLE_CLIENT_ID=（Google Cloud Console から取得）
GOOGLE_CLIENT_SECRET=（Google Cloud Console から取得）
NEXT_PUBLIC_SUPABASE_URL=（Supabase ダッシュボードから取得）
NEXT_PUBLIC_SUPABASE_ANON_KEY=（Supabase ダッシュボードから取得）
SUPABASE_SERVICE_ROLE_KEY=（Supabase ダッシュボードから取得）
```

#### 本番環境（Vercel Project Settings）
- 同じ変数を **Environment Variables** → **Production** に登録
- `NEXTAUTH_URL` は `https://chiapuru.com` に変更
- Google OAuth callback URL にも `https://chiapuru.com/api/auth/callback/google` 追加

### 実装ファイル一覧

**新規作成**:
- `lib/auth.ts` - NextAuth 設定
- `lib/supabaseClient.ts` - Supabase クライアント初期化
- `lib/membership.ts` - メンバーシップ管理
- `lib/member-only-blog.ts` - メンバー限定ブログ処理
- `lib/member-only-apps.ts` - メンバー限定アプリ処理
- `app/api/auth/[...nextauth]/route.ts` - OAuth プロバイダー
- `app/auth/signin/page.tsx` - ログインページ
- `app/dashboard/page.tsx` - メンバーダッシュボード
- `app/member-only-blog/page.tsx` - メンバーブログ一覧
- `app/member-only-blog/[slug]/page.tsx` - メンバーブログ詳細
- `app/member-only-apps/page.tsx` - メンバーアプリ一覧
- `app/member-only-apps/[slug]/page.tsx` - メンバーアプリ詳細
- `middleware.ts` - ルート保護
- `.env.local.example` - 環境変数テンプレート
- `docs/supabase-setup.sql` - Supabase スキーマ
- `docs/SUPABASE_SETUP.md` - Supabase セットアップ手順
- `docs/VERCEL_DEPLOYMENT.md` - 本番デプロイ手順
- `docs/DEPLOYMENT_CHECKLIST.md` - デプロイチェックリスト

**修正既存ファイル**:
- `components/Header.tsx` - Sign in / out ボタン追加
- `components/Providers.tsx` - SessionProvider 統合
- `package.json` - 依存関係追加

### 残作業（優先順）

#### 🔴 本番デプロイ前必須タスク
1. **Vercel 環境変数登録** (`docs/VERCEL_DEPLOYMENT.md` ステップ1)
   - 7つの環境変数を Vercel Project Settings に登録
   - Production 環境のみ設定
2. **Google OAuth 本番設定** (`docs/VERCEL_DEPLOYMENT.md` ステップ2)
   - `https://chiapuru.com/api/auth/callback/google` を callback URL に追加
3. **Supabase 本番テーブル確認**
   - 本番プロジェクトに `memberships` テーブル存在確認
   - `docs/supabase-setup.sql` を本番環境で実行（済みの場合はスキップ）
4. **Vercel 自動デプロイ**
   - GitHub main ブランチに push → Vercel が自動でデプロイ
5. **本番環境テスト**
   - `https://chiapuru.com` でログイン確認
   - `/member-only-blog` でメンバー限定コンテンツ確認
   - Supabase `memberships` テーブルにレコード作成確認

#### 🟡 本番デプロイ後のコンテンツ拡充
1. **メンバー限定ブログ記事追加**
   - `content/member-only-blog/YYYY-MM-DD-title.md` を作成
   - Frontmatter: `title`, `date`, `excerpt`, `tags`
2. **メンバー限定ツール説明追加**
   - `content/member-only-apps/app-slug.md` を作成
   - Frontmatter: `title`, `description`, `features`, `howToUse`

#### 🟢 将来の最適化（低優先度）
- [ ] プレミアム会員の有効期限チェック & 自動ダウングレード
- [ ] 課金機能統合（Stripe / Paddle）
- [ ] メンバーシップティア追加（Free → Pro → Enterprise など）
- [ ] メンバー向けメール通知
- [ ] ダウンロード・コンテンツアクセス統計

### 重要な注意事項

#### セキュリティ
- **`SUPABASE_SERVICE_ROLE_KEY`** は絶対に `.env.local` 以外に公開しないこと
- ローカル環境とVercel環境を分けて管理（`.env.local` は git ignore済み）
- Google OAuth secrets も同様

#### パフォーマンス
- メンバーシップ照会（`getMembershipByEmail()`）は Server-side で実行
- Client-side で `useSession()` 使用時はリダイレクト先で session token 確認
- Middleware で早期にリクエスト棄却 → Server Component での二重チェック回避

#### Markdown 構文
**メンバー限定ブログ** (`content/member-only-blog/`):
```yaml
---
title: "ブログタイトル"
date: "2026-02-07"
excerpt: "ブログの概要"
tags: ["技術", "AI"]
---
# 本文を Markdown で記述
```

**メンバー限定ツール** (`content/member-only-apps/`):
```yaml
---
title: "ツール名"
description: "簡潔な説明"
features: ["機能1", "機能2", "機能3"]
howToUse: ["ステップ1", "ステップ2"]
---
# 詳しい使い方を Markdown で記述
```

### テスト手順（ローカル）

```bash
# 環境準備
cp .env.local.example .env.local
# .env.local に実際の値を入力

# 開発サーバー起動
npm run dev
# http://localhost:3000 (3001 の場合もある) にアクセス

# ログインテスト
# 1. Header の "Sign in" をクリック → Google ログイン
# 2. /dashboard でメンバーシップ情報表示確認
# 3. /member-only-blog にアクセス → コンテンツ表示確認
# 4. ログアウト → /member-only-blog → /auth/signin へリダイレクト確認
```

### 引き継ぎチェックリスト

- [x] 実装完了・ローカルで動作確認
- [x] TypeScript 型安全化
- [x] ビルド成功（`npm run build`）
- [x] コミット・プッシュ完了
- [x] ドキュメント作成完了
- [ ] **Vercel 本番環境変数登録（引き継ぎ先で実行）**
- [ ] **本番デプロイ（引き継ぎ先で実行）**
- [ ] **本番環境テスト（引き継ぎ先で実行）**
- [ ] メンバー限定コンテンツ追加（随時）
- [ ] 課金機能統合（将来）

---
*Last updated: 2026-02-07*
