# Vercel デプロイ前チェックリスト

## 環境準備

- [ ] GitHub アカウントにログイン
- [ ] Vercel アカウント作成済み
- [ ] GitHub リポジトリがVercelに接続済み（`chiapuru-portfolio`）
- [ ] 本番環境の environment variables を用意済み

## 環境変数準備（Vercel Project Settings で設定）

- [ ] `NEXTAUTH_SECRET` - `openssl rand -base64 32` で生成
- [ ] `NEXTAUTH_URL=https://chiapuru.com`
- [ ] `GOOGLE_CLIENT_ID` - Google Cloud Console から取得
- [ ] `GOOGLE_CLIENT_SECRET` - Google Cloud Console から取得
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase ダッシュボードから取得
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase ダッシュボードから取得
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase ダッシュボードから取得

## Google OAuth 設定（Google Cloud Console）

- [ ] OAuth 2.0 クライアント ID → 承認済みリダイレクト URI に以下を追加：
  - `https://chiapuru.com/api/auth/callback/google`

## Supabase 設定

- [ ] 本番プロジェクトに `memberships` テーブルが存在
- [ ] テーブルに必要なカラム存在確認（id, email, tier, expires_at, created_at, updated_at）
- [ ] RLS ポリシー設定完了

## Vercel カスタムドメイン設定

- [ ] `chiapuru.com` ドメイン Vercel に接続済み
- [ ] DNS レコード設定完了
- [ ] SSL 証明書有効化確認

## ビルド・デプロイ

- [ ] ローカルで `npm run build` が成功
- [ ] GitHub main ブランチに最新コード push 完了
- [ ] Vercel が自動デプロイを開始
- [ ] デプロイ完了（Vercel Dashboard で確認）

## 本番環境テスト

- [ ] `https://chiapuru.com` にアクセス可能
- [ ] Header の「Sign in」ボタンが表示
- [ ] Google ログイン成功
- [ ] `/dashboard` でメンバーシップ情報表示
- [ ] `/member-only-blog` でメンバー限定コンテンツ表示
- [ ] Supabase `memberships` テーブルにレコード作成確認
- [ ] ログアウト後、`/member-only-blog` にアクセス → `/auth/signin` にリダイレクト

## デプロイ後の確認

- [ ] Vercel Analytics でアクセス統計が表示
- [ ] Vercel Logs でエラーが出ていないか確認
- [ ] Supabase Dashboard でメンバーデータが記録されているか確認

---

## 実施順序

1. **環境変数準備** → Vercel Project Settings に入力
2. **Google OAuth 設定** → callback URL 追加
3. **Supabase 本番設定確認** → memberships テーブル確認
4. **GitHub push** → Vercel 自動デプロイ開始
5. **本番環境テスト** → 機能動作確認
6. **運用開始** → ユーザー導入

---
*Last updated: 2026-02-07*
