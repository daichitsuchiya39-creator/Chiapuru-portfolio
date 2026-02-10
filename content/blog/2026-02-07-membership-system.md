---
title: "chiapuru.comにメンバーシップ機能を実装しました"
date: "2026-02-07"
excerpt: "Google OAuth + Supabaseを使った無料会員登録機能をClaude Codeと一緒に実装。ログインからメンバー限定コンテンツの保護まで、1日で本番デプロイまで完了しました。"
tags: ["Next.js", "開発記録", "AI", "Claude Code"]
order: 1
---

# Chiapuru.comにメンバーシップ機能を実装しました

「会員限定のコンテンツを配信したい」

ブログやツールを公開していると、いずれ出てくる要望です。

今回、**Google OAuth + Supabase**を使った無料会員登録機能を実装し、本番環境へのデプロイまで完了しました。

## 何ができるようになったか

- **Googleアカウントでワンクリックログイン**
- **ダッシュボード**でメンバーシップ情報を確認
- **メンバー限定ブログ**・**メンバー限定ツール**へのアクセス
- 未ログインユーザーはサインインページへ自動リダイレクト

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| 認証 | NextAuth v4 + Google OAuth |
| データベース | Supabase (PostgreSQL) |
| セッション | JWT (httpOnly Cookie) |
| ルート保護 | Next.js Middleware |
| フロントエンド | Next.js 15 App Router |

## 仕組み

ログインの流れはシンプルです：

1. ユーザーが「Sign in」をクリック
2. Googleアカウントで認証
3. NextAuthの`signIn`コールバックでSupabaseにメンバーシップを自動作成
4. ダッシュボードにリダイレクト

メンバー限定コンテンツの保護は2段階で行っています：

- **Middleware**：`/member-only-*` と `/dashboard/*` へのアクセスを早期にブロック
- **Server Component**：`getServerSession()`で二重チェック

## Claude Codeとの開発

今回の実装は**Claude Code**をフル活用しました。

特に助かったのは：

- **Supabase URLの形式ミス**を発見・修正（ダッシュボードURLとAPI URLの違い）
- **ビルドエラーの即座な対応**（`useSearchParams()`の`Suspense`ラップ、Supabaseクライアントの遅延初期化）
- **10箇所の改善点**を一括で洗い出し・修正

1人で作業していたら半日以上かかる作業が、数時間で完了しました。

## 苦労したポイント

### Vercelビルドでの環境変数問題

ローカルでは動くのに、Vercelのビルドで`supabaseUrl is required`エラー。

原因は、Supabaseクライアントがモジュール読み込み時に初期化されるため、環境変数が未設定のビルドフェーズでクラッシュしていたこと。

**解決策**：遅延初期化パターンに変更。クライアントを関数呼び出し時に初めて生成するようにしました。

### Supabase URLの形式

Supabaseのダッシュボード画面のURL（`https://supabase.com/dashboard/project/...`）をAPI URLと間違えて設定していました。正しくは`https://<project-ref>.supabase.co`の形式です。

## 今後の展開

現在は無料会員のみですが、将来的には：

- プレミアム会員の導入（Stripe連携）
- メンバー限定コンテンツの拡充
- 会員向けメール通知

まずはメンバー限定のブログ記事やツールを充実させていきます。

## まとめ

Google OAuth + Supabaseの組み合わせは、個人開発のメンバーシップ機能としてちょうどいいバランスです。無料枠の範囲で十分に運用できます。

興味のある方は、ぜひ[サインイン](/auth/signin)してみてください！
