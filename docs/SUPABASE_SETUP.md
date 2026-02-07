# Supabase メンバーシップテーブルセットアップガイド

## 概要
このガイドでは、Supabase に `memberships` テーブルを作成し、Google OAuth と連携させる手順を説明します。

## 前提条件
- Supabase プロジェクト既に作成済み
- `.env.local` に Supabase 接続情報が設定済み

## セットアップ手順

### 1. Supabase ダッシュボードにアクセス
1. https://supabase.com にログイン
2. プロジェクト（`chiapuru-membership` など）を選択

### 2. SQL エディタを開く
1. ダッシュボード左側メニューから **SQL Editor** を選択
2. **New Query** をクリック

### 3. SQLスクリプトを実行
1. [docs/supabase-setup.sql](./supabase-setup.sql) の内容をコピー
2. SQL エディタに貼り付け
3. **Run** ボタンをクリック

**実行内容**
- `memberships` テーブル作成（id, email, tier, expires_at, created_at, updated_at）
- RLS（Row Level Security）ポリシー設定
- email カラムのインデックス作成
- 自動更新トリガー（updated_at）設定

### 4. テーブル確認
1. 左側メニューから **Table Editor** を選択
2. `memberships` テーブルが表示されることを確認

### 5. テストデータ挿入（オプション）
SQL エディタで以下を実行：
```sql
INSERT INTO memberships (email, tier) VALUES ('your-test-email@example.com', 'free');
```

## Google OAuth と連携する際の流れ

### ログイン時の自動登録
1. ユーザーが Google でサインイン
2. NextAuth がメールアドレスを取得
3. `lib/membership.ts` の `getMembershipByEmail()` で Supabase を照会
4. 存在しなければ初期登録（tier: 'free'）

**実装コード例** (`lib/membership.ts` 内）：
```typescript
export async function createOrGetMembership(email: string): Promise<Membership | null> {
  try {
    // Check if exists
    let { data, error } = await supabaseAdmin
      .from('memberships')
      .select('*')
      .eq('email', email)
      .limit(1)
      .maybeSingle();

    if (!data) {
      // Create new free member
      const { data: newData, error: insertError } = await supabaseAdmin
        .from('memberships')
        .insert([{ email, tier: 'free' }])
        .select()
        .single();
      
      if (insertError) throw insertError;
      return newData as Membership | null;
    }

    return data as Membership | null;
  } catch (e) {
    console.error('Supabase error:', e);
    return null;
  }
}
```

## メンバーシップティアの操作

### ティアの確認
```sql
SELECT email, tier, expires_at FROM memberships WHERE email = 'user@example.com';
```

### ティアの更新（Premium へアップグレード）
```sql
UPDATE memberships 
SET tier = 'premium', expires_at = NOW() + INTERVAL '30 days'
WHERE email = 'user@example.com';
```

### ティアの確認（ダウングレード）
```sql
UPDATE memberships 
SET tier = 'free', expires_at = NULL
WHERE email = 'user@example.com';
```

## トラブルシューティング

### 「テーブルが見つからない」エラー
- SQL エディタでスクリプトが正常に実行されたか確認
- Supabase ダッシュボードの **Logs** で エラーメッセージを確認

### 「Service Role Key が無効」エラー
- `.env.local` の `SUPABASE_SERVICE_ROLE_KEY` の値を確認
- Supabase ダッシュボード → Settings → API → Service Role Key をコピー放

### RLS エラー（本番環境で）
- RLS ポリシーがユーザー認証と正しく連携しているか確認
- 当初は RLS を無効化して動作確認後、徐々に有効化することを推奨

## 次のステップ

- [ ] テーブル作成確認
- [ ] テストユーザーで Google ログイン → Dashboard アクセス確認
- [ ] Supabase 管理画面で memberships レコード作成確認
- [ ] 本番環境への migration スクリプト実行

---
*Last updated: 2026-02-07*
