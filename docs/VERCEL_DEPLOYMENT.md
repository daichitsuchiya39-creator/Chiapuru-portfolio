# Vercel へのデプロイガイド

## 前提条件
- Vercel アカウント作成済み
- GitHub リポジトリが Vercel に接続済み（自動デプロイ設定済み）
- 本番環境用の環境変数が用意できている

## ステップ1：Vercel Project Settings で環境変数を登録

### 1.1 Vercel ダッシュボードにアクセス
1. https://vercel.com/dashboard にログイン
2. プロジェクト「chiapuru-portfolio」を選択

### 1.2 Environment Variables を設定
1. **Settings → Environment Variables** をクリック
2. 以下の環境変数を **Production** に追加（値はローカルの `.env.local` から取得）：

```
NEXTAUTH_SECRET=（openssl rand -base64 32 で生成した値）
NEXTAUTH_URL=https://chiapuru.com
GOOGLE_CLIENT_ID=（Google Cloud Console から取得）
GOOGLE_CLIENT_SECRET=（Google Cloud Console から取得）
NEXT_PUBLIC_SUPABASE_URL=（Supabase ダッシュボードから取得）
NEXT_PUBLIC_SUPABASE_ANON_KEY=（Supabase ダッシュボードから取得）
SUPABASE_SERVICE_ROLE_KEY=（Supabase ダッシュボードから取得）
```

**注意**：`NEXT_PUBLIC_*` 以外のシークレットはこのチャットに貼らないでください。

3. 各変数を入力したら **Save** をクリック

## ステップ2：Google OAuth に本番環境の callback URL を登録

1. https://console.cloud.google.com にログイン
2. 「Chiapuru Membership」プロジェクトを選択
3. **認証情報 → OAuth 2.0 クライアント ID** をクリック
4. **承認済みリダイレクト URI** に以下を追加：
   ```
   https://chiapuru.com/api/auth/callback/google
   ```
5. **保存** をクリック

## ステップ3：カスタムドメイン設定（既に設定済みの場合はスキップ）

1. Vercel プロジェクト → **Settings → Domains**
2. **Add Domain** をクリック
3. `chiapuru.com` を入力
4. Vercel が提供する DNS レコード（CNAME）をドメイン管理画面に登録
5. DNS 反映待機（数分～数時間）

## ステップ4：デプロイ確認

### 方法1：自動デプロイ（推奨）
- GitHub にプッシュ → Vercel が自動でビルド・デプロイ

### 方法2：手動デプロイ
```bash
# Vercel CLI をインストール（初回のみ）
npm install -g vercel

# デプロイ実行
vercel --prod
```

## ステップ5：本番環境でのテスト

### ログイン機能テスト
1. https://chiapuru.com にアクセス
2. Header の「Sign in」ボタンをクリック
3. Google でログイン
4. `/dashboard` が表示される

### メンバー限定コンテンツテスト
1. https://chiapuru.com/member-only-blog にアクセス
2. ログイン状態で コンテンツが表示される
3. ログアウト後、再度アクセス → `/auth/signin` にリダイレクト

### Supabase 本番連携確認
1. Supabase ダッシュボード → **Table Editor** → `memberships`
2. 本番環境でログインしたユーザーのレコードが自動作成されているか確認

## トラブルシューティング

### 「invalid_client」エラー
- Google Cloud Console で callback URL が正しく登録されているか確認
- `NEXTAUTH_URL=https://chiapuru.com` が正しく設定されているか確認

### メンバーシップが作成されない
- Supabase 本番プロジェクトに `memberships` テーブルが存在するか確認
- `SUPABASE_SERVICE_ROLE_KEY` が正しく設定されているか確認

### `/member-only-blog` でリダイレクトループ
- session が正常に取得されているか、ブラウザ Dev Tools → Application → Cookies で確認
- `next-auth.session-token` が存在しているか確認

## デプロイ後の運用

### ログの確認
- Vercel Dashboard → **Deployments** → デプロイ詳細 → **Logs** で実行ログ確認

### Analytics 確認
- Vercel Dashboard → **Analytics** でアクセス統計確認

### 本番環境でのメンバーシップ管理
Supabase SQL エディタで：
```sql
-- メンバーをプレミアムに昇格
UPDATE memberships 
SET tier = 'premium', expires_at = NOW() + INTERVAL '30 days'
WHERE email = 'user@example.com';

-- メンバーシップ一覧表示
SELECT email, tier, expires_at FROM memberships ORDER BY created_at DESC;
```

---
*Last updated: 2026-02-07*
