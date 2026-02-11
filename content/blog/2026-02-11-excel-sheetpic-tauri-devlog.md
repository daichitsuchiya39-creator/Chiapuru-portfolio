---
title: "Excel Sheet PicをTauriでデスクトップアプリ化した話"
date: "2026-02-11"
excerpt: "Web版Excel Sheet Picを、Rust + Tauriでローカル完結のデスクトップアプリに。書式保持の実装とTauri v2のハマりポイントをまとめました。"
tags: ["Tauri", "Rust", "Excel", "デスクトップアプリ", "個人開発"]
---

# Excel Sheet PicをTauriでデスクトップアプリ化した話

「業務のExcelファイル、外部サーバーに送りたくないんだけど...」

Web版のExcel Sheet Picを公開してから、ずっと頭にあった課題でした。

Webアプリは手軽に使えて便利ですが、機密情報を含むファイルをサーバーにアップロードすることに抵抗がある方もいます。特に業務で使うExcelファイルは、個人情報や社外秘のデータを含んでいることも多い。

そこで、**ファイルが一切外に出ない「ローカル完結版」** を作ることにしました。

## なぜTauri + Rustを選んだのか

デスクトップアプリを作る方法はいくつかあります。

- **Electron** - 実績は豊富だが、アプリサイズが大きい
- **Tauri** - Rustベースで軽量、Web技術でUIを作れる

Tauriを選んだ理由はシンプルです。

1. **アプリサイズが小さい** - Electronだと100MB超えも珍しくないが、Tauriなら数MB
2. **Web技術がそのまま使える** - フロントはHTML/CSS/JSでOK
3. **Rustに触れてみたかった** - 正直、これが一番大きい

Rustは全くの初心者でしたが、「やってみないとわからない」の精神で飛び込みました。

## 開発の流れ

### 1. プロジェクトの雛形を作る

```bash
npm create tauri-app@latest
```

Tauriの初期化はコマンド一発。ただし、Rustの開発環境が必要なので、先に`rustup`をインストールしておきます。

作業場所は`excel-tools/sheetpic-tauri`に新規作成しました。

### 2. UIを設計する（1画面で完結）

Web版のExcel Sheet Picをベースに、シンプルな1画面構成にしました。

- **ファイル選択** - ローカルのExcelファイルを選ぶ
- **抽出方法の切替** - キーワード検索 or 手動選択
- **シート一覧表示** - 選択したファイルのシートを表示
- **抽出実行** - ボタン1つで新しいファイルを生成

余計な画面遷移はなし。開いて、選んで、抽出。これだけです。

初期テンプレートをそのまま置き換えて、SheetPic専用に改修しました。

### 3. Rust側の実装 ― 書式保持がカギ

ここが一番苦労したポイントです。

Excelのシート抽出で最も重要なのは、**書式を崩さないこと**。文字色、背景色、罫線、結合セル、列幅...。これらが失われると、抽出した意味がありません。

最初に試したのは`calamine`でデータを読み取り、`rust_xlsxwriter`で新しいファイルに書き込むアプローチ。しかし、これだと書式の再現が不完全になりがちです。

そこで発想を変えました。

**「コピーする」のではなく「不要なシートを削除する」。**

元ファイルをそのまま読み込んで、残したいシート以外を削除して保存する。こうすれば、書式も結合セルも列幅も、すべてそのまま残ります。

使ったRustライブラリは **`umya-spreadsheet`** です。

```rust
// Rustコマンドの構成
load_sheets(path) -> Vec<String>           // シート名一覧を取得
extract_by_keyword(path, keyword, output)  // キーワードで抽出
extract_by_selection(path, sheets, output) // 手動選択で抽出
```

実際のExcelファイルで検証したところ、文字色・背景色・罫線・結合セル・列幅・行高、すべて問題なく保持されていました。

### 4. Tauri v2のダイアログ権限 ― 最大のハマりポイント

ファイル選択ダイアログが開かない。ボタンを押しても、何も起きない。

エラーも出ない。ただ、無反応。

これが一番時間を使ったハマりポイントでした。

原因は**Tauri v2の権限設定**。Tauri v2では、ファイルダイアログを使うために`capabilities/default.json`に明示的に権限を追加する必要があります。

```json
{
  "permissions": [
    "dialog:default"
  ]
}
```

これを追加した瞬間、ファイルダイアログが正常に動くようになりました。

もう一つ注意点。バンドラなしの構成では、`@tauri-apps/plugin-dialog`からの`import`がうまく動かないケースがあります。その場合は`window.__TAURI__.dialog`を直接使うことで回避できました。

### 5. アイコンとアプリ名の設定

`tauri.conf.json`で以下を設定しました。

- `productName`: `ExcelSheetPic`
- `identifier`: `com.chiapuru.excelsheetpic`
- ウィンドウタイトルも変更

アイコンは`tauri icon`コマンドでロゴ画像から各サイズを一括生成。これは便利でした。

### 6. Windows / Mac向けにビルド・配布

```bash
npm run tauri build
```

- **Windows** - Windows環境でビルドし、生成されたファイルをZIP化
- **Mac** - Macでビルドし、`ExcelSheetPic.app`をZIP化

クロスコンパイルは今回見送り、各OS上でネイティブビルドしました。まずは署名なしのZIP配布からスタートです。

## 初めてのRustで感じたこと

今回が人生初のRustでした。所有権や借用など独特の概念に苦戦しつつも、「コンパイルが通れば動く」安心感は新鮮な体験でした。

Python・VBAとの違いや、Rust初心者として感じたことは別記事に詳しくまとめています。

→ [Python・VBA畑の自分が初めてRustを書いて感じたこと](/blog/first-rust-experience)

## ハマりポイントまとめ

| 問題 | 解決策 |
|------|--------|
| ファイルダイアログが無反応 | `capabilities/default.json`に`dialog:default`を追加 |
| `import { open }`が動かない | `window.__TAURI__.dialog`を直接使用 |
| 書式がコピー時に崩れる | 「コピー」ではなく「不要シートを削除」方式に変更 |
| ライブラリ選定 | `calamine + rust_xlsxwriter`より`umya-spreadsheet`が安定 |

## まとめ

Web版Excel Sheet Picの「機密情報を外に出したくない」という課題を、Tauri + Rustでローカル完結アプリにすることで解決しました。

初めてのRustでしたが、Tauriという橋渡しがあったおかげで、Web開発の知識を活かしながらデスクトップアプリを作ることができました。

ダウンロード版は [Excel Sheet Picのページ](/apps/excel-splitter) から入手できます（Sign inが必要です）。

機密情報を扱うExcelファイルの処理には、ぜひローカル完結のデスクトップ版をお試しください。
