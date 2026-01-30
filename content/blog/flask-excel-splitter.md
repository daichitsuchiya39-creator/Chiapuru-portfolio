---
title: "FlaskでExcelシート分割アプリを作った話"
date: "2024-12-10"
excerpt: "業務で必要になったExcelシート分割機能をFlaskでWebアプリ化した開発記録。技術選定から公開までの道のり。"
tags: ["Flask", "Python", "Excel", "開発記録"]
---

# FlaskでExcelシート分割アプリを作った話

業務でExcelファイルのシートを分割する作業が頻繁に発生していました。

手作業だと時間がかかるし、ミスも起きやすい。そこで、Webアプリとして自動化することにしました。

## 課題の整理

まず、解決したい課題を整理しました：

- Excelファイルから特定のシートだけを抽出したい
- キーワードで一括検索して抽出したい
- 書式を崩さずに新しいファイルを作りたい

## 技術選定

技術スタックは以下のように決めました：

- **バックエンド**: Flask (Python)
- **Excel処理**: openpyxl
- **フロントエンド**: HTML/CSS/JavaScript (シンプルに)

Flaskを選んだ理由は、Pythonに慣れていたことと、小規模なアプリに適していたからです。

## 実装のポイント

### シートの読み込み

```python
from openpyxl import load_workbook

def get_sheet_names(file_path):
    wb = load_workbook(file_path)
    return wb.sheetnames
```

### キーワード検索

```python
def search_sheets(sheet_names, keyword):
    return [name for name in sheet_names if keyword in name]
```

シンプルな実装ですが、これだけで十分な機能が実現できました。

## 学んだこと

1. **小さく始める** - 最初から完璧を目指さず、最小限の機能で公開
2. **自分が使う** - 自分自身がヘビーユーザーになることで改善点が見つかる
3. **フィードバックを受ける** - 他の人に使ってもらうことで新しい視点が得られる

## まとめ

業務の課題を解決するツールを自分で作る経験は、とても学びが多かったです。

同じような課題を抱えている方がいれば、ぜひ [Excel Sheet Extractor](/apps/excel-splitter) を試してみてください！
