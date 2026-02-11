---
title: "Claude APIを活用した業務自動化【Python実践ガイド】"
date: "2026-02-12"
excerpt: "Claude APIを使ったドキュメント業務の自動化を解説。議事録作成、レポート要約、メール下書き生成など、実務で使えるPythonスクリプトを紹介。"
tags: ["Claude API", "Python", "自動化", "AI", "業務効率化", "LLM"]
---

# Claude APIを活用した業務自動化【Python実践ガイド】

Claude APIを使えば、日常的なドキュメント業務を大幅に効率化できます。この記事では、議事録作成、レポート要約、メール生成など、実務で使えるPythonスクリプトを紹介します。

## Claude APIとは

Claude APIは、Anthropicが提供する大規模言語モデル（LLM）のAPIです。

**主な特徴**:

- **長文理解**: 200Kトークン（約15万文字）のコンテキスト
- **高精度**: 日本語の理解・生成が自然
- **安全性**: 有害コンテンツの生成を抑制
- **構造化出力**: JSONなどの形式で出力可能

**料金（2026年2月時点）**:

| モデル | 入力 | 出力 |
|--------|------|------|
| Claude Sonnet 4 | $3/100万トークン | $15/100万トークン |
| Claude Haiku | $0.25/100万トークン | $1.25/100万トークン |

1万文字の文書を処理しても数円程度。業務自動化には十分なコストパフォーマンスです。

## 環境構築

### Step 1: APIキーの取得

1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. アカウント作成・ログイン
3. API Keys > Create Key でAPIキーを生成
4. クレジットを追加（最低$5から）

### Step 2: Pythonセットアップ

```bash
# 仮想環境作成
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# パッケージインストール
pip install anthropic python-dotenv
```

### Step 3: 環境変数設定

```bash
# .envファイル作成
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > .env
```

### Step 4: 基本的な使い方

```python
# basic_example.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "こんにちは！"}
    ]
)

print(message.content[0].text)
```

```bash
python basic_example.py
# こんにちは！何かお手伝いできることはありますか？
```

## 実践1: 議事録の自動生成

会議の音声文字起こしから、構造化された議事録を生成します。

### ユースケース

- Zoom/Teams会議の自動文字起こし → 議事録
- 打ち合わせメモ → フォーマット済み議事録
- 長時間会議 → 要点のみ抽出

### 実装

```python
# meeting_minutes.py
import anthropic
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

def generate_meeting_minutes(transcript: str, meeting_info: dict) -> str:
    """
    会議の文字起こしから議事録を生成

    Args:
        transcript: 会議の文字起こしテキスト
        meeting_info: 会議情報（タイトル、日時、参加者など）

    Returns:
        Markdown形式の議事録
    """
    client = anthropic.Anthropic()

    prompt = f"""以下の会議の文字起こしから、議事録を作成してください。

## 会議情報
- タイトル: {meeting_info.get('title', '未定')}
- 日時: {meeting_info.get('date', datetime.now().strftime('%Y-%m-%d'))}
- 参加者: {', '.join(meeting_info.get('participants', []))}

## 文字起こし
{transcript}

## 出力形式
以下の形式でMarkdown議事録を作成してください：

1. **概要**: 会議の目的と結論を2-3文で
2. **決定事項**: 箇条書きで明確に
3. **アクションアイテム**: 誰が・何を・いつまでに
4. **議論の要点**: 主要なトピックごとに整理
5. **次回予定**: 次のステップや会議予定

注意事項:
- 冗長な表現は避け、簡潔に
- 発言者名は必要な場合のみ記載
- 専門用語はそのまま使用
"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text


# 使用例
if __name__ == "__main__":
    # サンプルの文字起こし
    transcript = """
    田中: では、今日の定例会議を始めます。今日のアジェンダは新機能のリリース日程についてです。

    佐藤: 開発チームとしては、来週金曜日にはステージング環境へのデプロイが完了する見込みです。

    田中: QAの方はいかがですか？

    山田: ステージング後、3営業日あればテスト完了できます。ただ、決済機能のテストには本番と同じ環境が必要です。

    佐藤: 決済のテスト環境は明日までに用意します。

    田中: では、来週金曜にステージング、翌週水曜にQA完了、木曜に本番リリースでどうでしょう。

    佐藤・山田: 問題ありません。

    田中: では、そのスケジュールで進めましょう。佐藤さん、明日までに決済テスト環境の準備をお願いします。山田さんはテスト計画書の更新をお願いします。次回は来週月曜に進捗確認しましょう。
    """

    meeting_info = {
        "title": "新機能リリース定例会議",
        "date": "2026-02-12",
        "participants": ["田中", "佐藤", "山田"]
    }

    minutes = generate_meeting_minutes(transcript, meeting_info)
    print(minutes)

    # ファイルに保存
    with open("meeting_minutes.md", "w", encoding="utf-8") as f:
        f.write(minutes)
```

### 出力例

```markdown
# 新機能リリース定例会議 議事録

**日時**: 2026-02-12
**参加者**: 田中、佐藤、山田

## 概要

新機能のリリース日程を決定。来週金曜にステージング、翌週木曜に本番リリースのスケジュールで合意。

## 決定事項

- 本番リリース日: 翌週木曜日
- ステージングデプロイ: 来週金曜日
- QA完了予定: 翌週水曜日

## アクションアイテム

| 担当 | タスク | 期限 |
|------|--------|------|
| 佐藤 | 決済テスト環境の準備 | 明日まで |
| 山田 | テスト計画書の更新 | - |

## 議論の要点

### リリーススケジュール
- 開発チーム: 来週金曜にステージング完了見込み
- QAチーム: ステージング後3営業日でテスト完了可能
- 決済機能テストには本番同等環境が必要

## 次回予定

- 来週月曜日: 進捗確認会議
```

## 実践2: レポート・文書の要約

長文のレポートや文書を、指定した長さに要約します。

### ユースケース

- 調査レポートの要約作成
- 長文メールの要点抽出
- 記事・論文のサマリー生成

### 実装

```python
# document_summarizer.py
import anthropic
from dotenv import load_dotenv
from enum import Enum

load_dotenv()

class SummaryLength(Enum):
    SHORT = "100文字程度"
    MEDIUM = "300文字程度"
    LONG = "500文字程度"
    BULLET = "箇条書き5-7項目"

def summarize_document(
    document: str,
    length: SummaryLength = SummaryLength.MEDIUM,
    focus: str = None
) -> str:
    """
    文書を要約する

    Args:
        document: 要約対象の文書
        length: 要約の長さ
        focus: 特に注目すべき観点（オプション）

    Returns:
        要約テキスト
    """
    client = anthropic.Anthropic()

    focus_instruction = ""
    if focus:
        focus_instruction = f"\n特に「{focus}」の観点を重視して要約してください。"

    prompt = f"""以下の文書を{length.value}で要約してください。{focus_instruction}

## 文書
{document}

## 要約の条件
- 重要な情報を優先的に含める
- 固有名詞や数値は正確に
- 原文にない情報は追加しない
- 簡潔で読みやすい文章に
"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text


def batch_summarize(documents: list[dict]) -> list[dict]:
    """
    複数の文書を一括要約

    Args:
        documents: [{"title": "...", "content": "..."}]

    Returns:
        [{"title": "...", "summary": "..."}]
    """
    results = []
    for doc in documents:
        summary = summarize_document(doc["content"])
        results.append({
            "title": doc["title"],
            "summary": summary
        })
    return results


# 使用例
if __name__ == "__main__":
    sample_document = """
    2026年第1四半期の業績報告

    売上高は前年同期比15%増の120億円となりました。主な要因として、
    新規SaaSプロダクト「CloudSync」の好調な立ち上がりが挙げられます。
    CloudSyncは1月のローンチ以降、3ヶ月で500社の導入を達成し、
    ARR（年間経常収益）は10億円に到達しました。

    一方、既存事業のオンプレミスライセンス販売は前年同期比20%減と
    苦戦しています。これはクラウド移行のトレンドに沿ったものであり、
    想定の範囲内です。

    営業利益は18億円（前年同期比5%増）、営業利益率は15%となりました。
    CloudSyncの開発投資（5億円）を吸収しつつ増益を達成できたことは、
    既存事業の収益力の高さを示しています。

    今後の見通しとして、CloudSyncは年内に1000社導入を目指します。
    また、第2四半期にはエンタープライズ向けプランの提供を開始し、
    大企業へのアプローチを強化します。

    通期業績予想は据え置きとし、売上高500億円、営業利益80億円を
    見込んでいます。
    """

    # 通常の要約
    print("=== 通常の要約 ===")
    print(summarize_document(sample_document))

    print("\n=== 箇条書き要約 ===")
    print(summarize_document(sample_document, SummaryLength.BULLET))

    print("\n=== 観点を指定した要約 ===")
    print(summarize_document(sample_document, focus="新規事業の成長性"))
```

### 出力例

```
=== 通常の要約 ===
2026年Q1の売上高は前年比15%増の120億円。新規SaaS「CloudSync」が
3ヶ月で500社導入、ARR10億円を達成し成長を牽引。既存オンプレ事業は
20%減も想定内。営業利益は18億円（5%増）で、開発投資を吸収しつつ増益。
通期予想は売上500億円、営業利益80億円を維持。

=== 箇条書き要約 ===
- 売上高120億円（前年比+15%）
- 新規SaaS「CloudSync」が500社導入、ARR10億円達成
- オンプレ事業は20%減（クラウド移行トレンドで想定内）
- 営業利益18億円（+5%）、利益率15%
- CloudSync開発投資5億円を吸収して増益
- 年内CloudSync 1000社導入目標
- 通期予想：売上500億円、営業利益80億円
```

## 実践3: メール下書きの自動生成

コンテキストに応じたビジネスメールの下書きを生成します。

### ユースケース

- 問い合わせへの返信テンプレート生成
- 依頼・お礼メールの下書き
- 英語メールの作成サポート

### 実装

```python
# email_generator.py
import anthropic
from dotenv import load_dotenv
from enum import Enum
from dataclasses import dataclass

load_dotenv()

class EmailTone(Enum):
    FORMAL = "formal"      # フォーマル（社外・上司向け）
    POLITE = "polite"      # 丁寧（社内・取引先向け）
    CASUAL = "casual"      # カジュアル（同僚向け）

class EmailType(Enum):
    REPLY = "返信"
    REQUEST = "依頼"
    THANKS = "お礼"
    APOLOGY = "お詫び"
    REPORT = "報告"
    INQUIRY = "問い合わせ"

@dataclass
class EmailContext:
    recipient: str           # 宛先の名前・役職
    sender: str              # 送信者の名前
    email_type: EmailType    # メールの種類
    tone: EmailTone          # トーン
    subject: str             # 件名
    key_points: list[str]    # 伝えたいポイント
    original_email: str = "" # 返信の場合、元のメール

def generate_email(context: EmailContext) -> dict:
    """
    ビジネスメールの下書きを生成

    Args:
        context: メールのコンテキスト情報

    Returns:
        {"subject": "件名", "body": "本文"}
    """
    client = anthropic.Anthropic()

    tone_guide = {
        EmailTone.FORMAL: "非常にフォーマルな敬語。「〜いたします」「〜存じます」を使用",
        EmailTone.POLITE: "丁寧語。「〜です」「〜ます」を基本に、適度に敬語を使用",
        EmailTone.CASUAL: "です・ます調だが、堅くなりすぎない親しみやすい文体"
    }

    original_context = ""
    if context.original_email:
        original_context = f"""
## 返信対象のメール
{context.original_email}
"""

    prompt = f"""以下の条件でビジネスメールの下書きを作成してください。

## 基本情報
- 宛先: {context.recipient}
- 送信者: {context.sender}
- メールの種類: {context.email_type.value}
- 件名の方向性: {context.subject}

## 伝えたいポイント
{chr(10).join(f'- {point}' for point in context.key_points)}

## トーン
{tone_guide[context.tone]}
{original_context}

## 出力形式
以下のJSON形式で出力してください：
```json
{{
  "subject": "件名",
  "body": "本文（改行は\\nで表現）"
}}
```

注意事項:
- 件名は簡潔に（20文字以内推奨）
- 本文は適切な挨拶で開始
- 結びの挨拶を含める
- 署名は含めない（後で追加するため）
"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=2048,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    # JSON部分を抽出してパース
    import json
    import re

    response_text = message.content[0].text
    json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)

    if json_match:
        return json.loads(json_match.group(1))
    else:
        # JSONブロックがない場合はそのままパース試行
        return json.loads(response_text)


# 使用例
if __name__ == "__main__":
    # 例1: 依頼メール
    context = EmailContext(
        recipient="山田部長",
        sender="田中",
        email_type=EmailType.REQUEST,
        tone=EmailTone.FORMAL,
        subject="プロジェクト予算について",
        key_points=[
            "新規プロジェクトの予算承認をお願いしたい",
            "予算額は500万円",
            "来週金曜日までに回答が欲しい",
            "詳細資料を添付している"
        ]
    )

    email = generate_email(context)
    print("=== 依頼メール ===")
    print(f"件名: {email['subject']}")
    print(f"\n{email['body']}")

    # 例2: 返信メール
    context2 = EmailContext(
        recipient="株式会社ABC 鈴木様",
        sender="田中",
        email_type=EmailType.REPLY,
        tone=EmailTone.FORMAL,
        subject="お問い合わせへの回答",
        key_points=[
            "お問い合わせいただいた製品の在庫はある",
            "納期は注文から5営業日",
            "見積書を添付する",
            "ご不明点があれば連絡してほしい"
        ],
        original_email="""
        貴社製品「XYZ-100」の購入を検討しております。
        在庫状況と納期について教えていただけますでしょうか。
        また、見積書をいただけると助かります。
        """
    )

    email2 = generate_email(context2)
    print("\n=== 返信メール ===")
    print(f"件名: {email2['subject']}")
    print(f"\n{email2['body']}")
```

### 出力例

```
=== 依頼メール ===
件名: 【ご相談】新規プロジェクト予算承認のお願い

山田部長

お疲れ様です。田中です。

新規プロジェクトの予算につきまして、ご承認をお願いしたく
ご連絡いたしました。

予算額は500万円を想定しております。
詳細につきましては、添付資料をご確認いただけますと幸いです。

誠に恐れ入りますが、来週金曜日までにご回答いただけますと
大変助かります。

ご多忙のところ恐縮ですが、ご検討のほどよろしくお願いいたします。
```

## 実践4: 定型業務の自動化スクリプト

複数のタスクを組み合わせた実用的な自動化スクリプトを作成します。

### 日報自動生成

```python
# daily_report.py
import anthropic
from dotenv import load_dotenv
from datetime import datetime
import json

load_dotenv()

def generate_daily_report(
    tasks_completed: list[str],
    tasks_in_progress: list[str],
    issues: list[str] = None,
    tomorrow_plan: list[str] = None
) -> str:
    """
    日報を自動生成

    Args:
        tasks_completed: 完了したタスク
        tasks_in_progress: 進行中のタスク
        issues: 課題・問題点
        tomorrow_plan: 明日の予定

    Returns:
        フォーマット済み日報
    """
    client = anthropic.Anthropic()

    prompt = f"""以下の情報から、日報を作成してください。

## 完了したタスク
{chr(10).join(f'- {task}' for task in tasks_completed)}

## 進行中のタスク
{chr(10).join(f'- {task}' for task in tasks_in_progress)}

## 課題・問題点
{chr(10).join(f'- {issue}' for issue in (issues or ['特になし']))}

## 明日の予定
{chr(10).join(f'- {plan}' for plan in (tomorrow_plan or ['未定']))}

## 出力形式
以下の形式で日報を作成してください：

```
【日報】{datetime.now().strftime('%Y年%m月%d日')}

■ 本日の成果
（完了タスクを簡潔にまとめる）

■ 進行中の作業
（進捗状況を簡潔に）

■ 課題・相談事項
（あれば記載、なければ「特になし」）

■ 明日の予定
（予定を記載）
```

注意事項:
- 箇条書きは必要最小限に
- 具体的な進捗率があれば記載
- 課題は解決策の方向性も添える
"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return message.content[0].text


# 使用例
if __name__ == "__main__":
    report = generate_daily_report(
        tasks_completed=[
            "ユーザー認証機能の実装完了",
            "コードレビュー対応（PR #123）",
            "週次ミーティング参加"
        ],
        tasks_in_progress=[
            "決済機能の実装（進捗70%）",
            "APIドキュメントの作成（進捗30%）"
        ],
        issues=[
            "決済APIのテスト環境でタイムアウトが発生。原因調査中"
        ],
        tomorrow_plan=[
            "決済機能の残り実装",
            "QAチームとのテスト計画打ち合わせ"
        ]
    )

    print(report)
```

### ファイル一括処理

```python
# batch_processor.py
import anthropic
from dotenv import load_dotenv
from pathlib import Path
import json

load_dotenv()

def process_files(
    input_dir: str,
    output_dir: str,
    task: str,
    file_pattern: str = "*.txt"
) -> list[dict]:
    """
    ディレクトリ内のファイルを一括処理

    Args:
        input_dir: 入力ディレクトリ
        output_dir: 出力ディレクトリ
        task: 処理内容（例: "要約", "翻訳", "校正"）
        file_pattern: 対象ファイルパターン

    Returns:
        処理結果のリスト
    """
    client = anthropic.Anthropic()
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    results = []

    for file in input_path.glob(file_pattern):
        print(f"Processing: {file.name}")

        content = file.read_text(encoding="utf-8")

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": f"以下のテキストを{task}してください:\n\n{content}"
                }
            ]
        )

        result = message.content[0].text

        # 結果を保存
        output_file = output_path / f"{file.stem}_processed{file.suffix}"
        output_file.write_text(result, encoding="utf-8")

        results.append({
            "input": file.name,
            "output": output_file.name,
            "status": "success"
        })

    return results


# 使用例
if __name__ == "__main__":
    results = process_files(
        input_dir="./documents",
        output_dir="./summaries",
        task="300文字程度で要約",
        file_pattern="*.txt"
    )

    print(json.dumps(results, indent=2, ensure_ascii=False))
```

## コスト最適化のTips

### 1. モデルの使い分け

```python
# 簡単なタスクはHaikuを使用
def get_model(task_complexity: str) -> str:
    if task_complexity == "simple":
        return "claude-haiku-3-20240307"  # 安価
    else:
        return "claude-sonnet-4-20250514"  # 高精度
```

### 2. プロンプトの最適化

```python
# 悪い例（トークン数が多い）
prompt = """
あなたは優秀なアシスタントです。
以下の文章について、非常に詳細に分析し、
様々な観点から検討した上で、
最終的な要約を作成してください...
"""

# 良い例（簡潔）
prompt = """
以下を200文字で要約:

{text}
"""
```

### 3. キャッシュの活用

```python
import hashlib
import json
from pathlib import Path

CACHE_DIR = Path(".cache")
CACHE_DIR.mkdir(exist_ok=True)

def cached_api_call(prompt: str, model: str) -> str:
    # プロンプトからキャッシュキーを生成
    cache_key = hashlib.md5(f"{model}:{prompt}".encode()).hexdigest()
    cache_file = CACHE_DIR / f"{cache_key}.json"

    # キャッシュがあれば返す
    if cache_file.exists():
        return json.loads(cache_file.read_text())["response"]

    # APIを呼び出し
    client = anthropic.Anthropic()
    message = client.messages.create(
        model=model,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    response = message.content[0].text

    # キャッシュに保存
    cache_file.write_text(json.dumps({"response": response}))

    return response
```

### 4. バッチ処理での並列化

```python
import asyncio
import anthropic

async def process_batch_async(items: list[str]) -> list[str]:
    client = anthropic.AsyncAnthropic()

    async def process_one(item: str) -> str:
        message = await client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{"role": "user", "content": f"要約: {item}"}]
        )
        return message.content[0].text

    # 並列実行（同時実行数を制限）
    semaphore = asyncio.Semaphore(5)

    async def limited_process(item: str) -> str:
        async with semaphore:
            return await process_one(item)

    results = await asyncio.gather(*[limited_process(item) for item in items])
    return results
```

## エラーハンドリング

```python
import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=60)
)
def safe_api_call(prompt: str) -> str:
    """リトライ機能付きAPI呼び出し"""
    try:
        client = anthropic.Anthropic()
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text

    except anthropic.RateLimitError:
        print("レート制限に達しました。リトライします...")
        raise

    except anthropic.APIError as e:
        print(f"APIエラー: {e}")
        raise
```

## まとめ

Claude APIを活用した業務自動化のポイント:

1. **議事録・要約**: 長文処理が得意なClaudeの強みを活かす
2. **メール生成**: トーンやコンテキストを指定して適切な文面を生成
3. **バッチ処理**: 複数ファイルの一括処理で大幅な時間短縮
4. **コスト最適化**: モデル使い分け、キャッシュ、並列化で効率化

月額数百円〜数千円のAPI費用で、年間数百時間の業務を自動化できます。ぜひ身近なドキュメント業務から試してみてください。

---

**関連記事**:
- [Macをエンジニアとして使いこなす完全ガイド【2026年版】](/blog/mac-engineer-guide)
- [Windowsをエンジニアとして使いこなす完全ガイド【2026年版】](/blog/windows-engineer-guide)
- [スタートアップの技術選定：2026年版最強スタック](/blog/startup-tech-stack)
- [dotfilesリポジトリの作り方完全ガイド【Mac/Windows対応】](/blog/dotfiles-guide)
