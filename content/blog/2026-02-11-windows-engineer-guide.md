---
title: "Windowsをエンジニアとして使いこなす完全ガイド【2026年版】"
date: "2026-02-11"
excerpt: "Windows購入初日から実践できるエンジニア向けセットアップガイド。winget、Windows Terminal、PowerShell、Claude Code、PowerToysなどの必須ツールから、dotfilesによる環境管理まで徹底解説。"
tags: ["Windows", "開発環境", "ツール", "セットアップ", "生産性", "AI"]
---

# Windowsをエンジニアとして使いこなす完全ガイド【2026年版】

Windows 11は、開発者向け機能が大幅に強化されています。この記事では、Windows購入初日から実践できる設定・ツール・テクニックを、実務経験に基づいて解説します。

## なぜWindowsなのか

Mac、Linuxと比較して、Windowsが開発環境として優れている理由：

- **ハードウェアの選択肢**: 予算・用途に合わせて自由に選べる
- **ゲーミングとの両立**: 開発もゲームも1台で完結
- **企業環境との親和性**: Active Directory、Microsoft 365との連携
- **WSL2**: 必要に応じてLinux環境も利用可能
- **コストパフォーマンス**: 同スペックならMacより安価

## 初日セットアップ：必須の3ステップ

### 1. wingetのセットアップ（所要時間：5分）

wingetは、Windows公式のパッケージマネージャーです。アプリやツールのインストール・更新を一元管理できます。

Windows 11では標準でインストール済みです。Windows 10の場合は、Microsoft Storeから「アプリ インストーラー」をインストールしてください。

```powershell
# インストール確認
winget --version
```

**基本的な使い方**:

```powershell
# アプリの検索
winget search vscode

# アプリのインストール
winget install Microsoft.VisualStudioCode
winget install Git.Git
winget install OpenJS.NodeJS.LTS

# 複数のアプリを一括インストール
winget install Google.Chrome Microsoft.PowerToys SlackTechnologies.Slack

# インストール済みアプリの更新
winget upgrade --all

# インストール済みアプリ一覧
winget list
```

**Tips**: `winget export` でインストール済みアプリをJSON形式で出力できます。新しいPCでのセットアップに便利です。

```powershell
# エクスポート
winget export -o packages.json

# インポート（新しいPCで）
winget import -i packages.json
```

### 2. Windows TerminalとPowerShellのセットアップ（所要時間：30分）

Windows Terminalは、モダンで高機能なターミナルアプリです。

```powershell
# Windows Terminalインストール（Windows 11では標準搭載）
winget install Microsoft.WindowsTerminal

# 最新のPowerShell 7をインストール
winget install Microsoft.PowerShell
```

**PowerShellプロファイルの設定**:

```powershell
# プロファイルファイルを開く（存在しない場合は作成）
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}
notepad $PROFILE
```

**おすすめの設定（$PROFILEに追記）**:

```powershell
# Oh My Poshでプロンプトをカスタマイズ
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\paradox.omp.json" | Invoke-Expression

# PSReadLineで入力補完を強化
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete

# 便利なエイリアス
Set-Alias ll Get-ChildItem
Set-Alias g git
Set-Alias code cursor
function gs { git status }
function gp { git push }
function dc { docker compose $args }

# ディレクトリ移動を便利に
function .. { Set-Location .. }
function ... { Set-Location ..\.. }

# 環境変数
$env:EDITOR = "code"
```

**Oh My Poshのインストール**:

```powershell
# Oh My Poshインストール
winget install JanDeDobbeleer.OhMyPosh

# Nerd Fontインストール（アイコン表示に必要）
oh-my-posh font install Meslo
```

Windows Terminalの設定（settings.json）で、フォントを「MesloLGM Nerd Font」に変更してください。

**PSReadLineの便利な機能**:

- **履歴予測**: 入力中に過去のコマンドを候補表示
- **構文ハイライト**: コマンドの色分け表示
- **メニュー補完**: Tabキーで候補をリスト表示

**Windows Terminalの便利な設定**:

- **画面分割**: `Alt+Shift+D`（水平分割）、`Alt+Shift+-`（垂直分割）
- **新しいタブ**: `Ctrl+Shift+T`
- **ペイン間移動**: `Alt+矢印キー`
- **設定**: `Ctrl+,`

### 3. Gitの初期設定（所要時間：15分）

```powershell
# Gitインストール
winget install Git.Git

# ユーザー情報の設定
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# デフォルトブランチ名
git config --global init.defaultBranch main

# カラー表示
git config --global color.ui auto

# 改行コードの自動変換（Windows推奨設定）
git config --global core.autocrlf true

# 便利なエイリアス
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --graph --oneline --all"

# Windows Credential Managerを使用
git config --global credential.helper manager
```

**SSH鍵の生成とGitHub登録**:

```powershell
# SSH鍵生成
ssh-keygen -t ed25519 -C "you@example.com"

# ssh-agentを有効化（管理者権限のPowerShellで）
Get-Service ssh-agent | Set-Service -StartupType Automatic
Start-Service ssh-agent

# 秘密鍵を登録
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# 公開鍵をクリップボードにコピー
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard

# GitHubで登録
# Settings > SSH and GPG keys > New SSH key
# クリップボードの内容を貼り付け

# 接続テスト
ssh -T git@github.com
# "Hi username! You've successfully authenticated..." と表示されればOK
```

## 生産性を劇的に上げるツール

### PowerToys（必須）

Microsoftが提供する生産性向上ツール集です。

```powershell
winget install Microsoft.PowerToys
```

**主な機能**:

- **PowerToys Run**（`Alt+Space`）: Spotlightのような高速ランチャー
- **FancyZones**: ウィンドウを自由なレイアウトで配置
- **Color Picker**（`Win+Shift+C`）: 画面上の色をピック
- **Text Extractor**（`Win+Shift+T`）: 画面上のテキストをOCR
- **Paste as Plain Text**（`Ctrl+Win+V`）: 書式なしでペースト
- **Always on Top**（`Win+Ctrl+T`）: ウィンドウを最前面に固定

**FancyZonesの設定**:

- Shiftキーを押しながらウィンドウをドラッグでゾーンに配置
- カスタムレイアウトを作成可能（3分割、4分割など）

### Windows標準のウィンドウ管理

PowerToysを使わなくても、Windows 11には強力なウィンドウ管理機能があります。

**主なショートカット**:

- `Win+矢印キー`: ウィンドウを画面端にスナップ
- `Win+Z`: スナップレイアウトを表示
- `Win+Tab`: タスクビュー（仮想デスクトップ管理）
- `Win+Ctrl+D`: 新しい仮想デスクトップを作成
- `Win+Ctrl+左右`: 仮想デスクトップを切り替え

### クリップボード履歴（標準機能）

Windows標準のクリップボード履歴機能を有効化します。

```
設定 > システム > クリップボード > クリップボードの履歴 をオン
```

**使い方**:

- `Win+V`: クリップボード履歴を表示
- 矢印キーで選択、Enterで貼り付け
- ピン留めで永続保存可能

**実務での活用**:

- エラーメッセージをコピー → Claude/ChatGPTに投げる → 解決策をコピー → ターミナルで実行
- APIキー、設定値などを一時保存

### Windows音声入力

Windows 11には高精度な音声入力機能が標準搭載されています。

**使い方**:

- `Win+H`: どのアプリでも音声入力を開始
- 句読点は「まる」「てん」と発声
- 「改行」で改行

**活用シーン**:

- コードレビューのコメント記入
- ドキュメント・ブログ記事の下書き
- Slackやメールの返信

**Tips**: より高精度な音声入力が必要な場合は、AquaVoice（Windows版）やWhisperベースのツールを検討してください。

## 開発環境のセットアップ

### Node.jsのバージョン管理（fnm）

プロジェクトごとに異なるNode.jsバージョンを使い分けられます。

```powershell
# fnmインストール
winget install Schniz.fnm

# PowerShellプロファイルに追記
notepad $PROFILE
```

**$PROFILEに追記**:

```powershell
# fnm初期化
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

**使い方**:

```powershell
# 利用可能なバージョン一覧
fnm list-remote

# 最新版インストール
fnm install 20
fnm use 20
fnm default 20

# 確認
node -v  # v20.x.x
```

**プロジェクトごとのバージョン指定**:

```powershell
# プロジェクトAではNode 18を使用
cd ~/projects/project-a
fnm use 18

# .node-versionファイルを作成すると自動切り替え
echo "18" > .node-version
```

### よく使う開発ツールのインストール

```powershell
# データベース
winget install PostgreSQL.PostgreSQL
winget install Redis.Redis

# 便利なCLIツール
winget install junegunn.fzf
winget install BurntSushi.ripgrep.MSVC
winget install sharkdp.bat
winget install stedolan.jq

# Docker
winget install Docker.DockerDesktop

# エディタ（Cursor）
winget install Anysphere.Cursor
```

**各ツールの説明**:

- `fzf`: ファジーファインダー（曖昧検索）
- `ripgrep`: 高速なgrep代替
- `bat`: シンタックスハイライト付きcat
- `jq`: JSON整形・抽出

**fzfのPowerShell統合**:

```powershell
# $PROFILEに追記
# Ctrl+Rでコマンド履歴をfzfで検索
Set-PSReadLineKeyHandler -Key Ctrl+r -ScriptBlock {
    $command = Get-Content (Get-PSReadLineOption).HistorySavePath | fzf --tac
    if ($command) {
        [Microsoft.PowerShell.PSConsoleReadLine]::Insert($command)
    }
}
```

### Claude Code（AIコーディングアシスタント）

Claude Codeは、Anthropicが提供するターミナルベースのAI開発アシスタントです。

```powershell
# Claude Codeインストール（Node.js 18以上が必要）
npm install -g @anthropic-ai/claude-code
```

**基本的な使い方**:

```powershell
# プロジェクトディレクトリで起動
cd ~/projects/my-app
claude

# 起動後、自然言語で指示
# 例: 「このプロジェクトの構造を説明して」
# 例: 「ログイン機能を追加して」
# 例: 「このバグを修正して」
```

**CLAUDE.mdでプロジェクト設定**:

プロジェクトルートに `CLAUDE.md` を作成すると、Claude Codeがプロジェクトの文脈を理解した上で提案してくれます。

```markdown
# プロジェクト名

## 技術スタック
- Next.js 15, TypeScript, Tailwind CSS

## コード規約
- Server Components優先
- 型定義を厳密に

## コマンド
- `npm run dev` - 開発サーバー
- `npm run build` - ビルド
```

**主な機能**:

- **コード生成**: 自然言語で機能を説明するだけでコードを生成
- **バグ修正**: エラーメッセージを伝えるだけで原因を特定・修正
- **リファクタリング**: 既存コードの改善提案と実行
- **テスト作成**: テストコードの自動生成
- **Git操作**: コミットメッセージの作成やPR作成の支援

**実務での活用Tips**:

- **CLAUDE.md を充実させる**: プロジェクトの技術スタックや規約を記述しておくと、より的確な提案が得られる
- **小さなタスクから始める**: バグ修正や単一機能の追加から試して、徐々に大きなタスクを任せる
- **レビュー意識を持つ**: 生成されたコードは必ず確認し、理解した上でマージする

## wingetエクスポートで環境を管理

インストールするパッケージを一元管理し、新しいPCでも一発でセットアップできます。

**エクスポート**:

```powershell
# 現在のインストール済みアプリをエクスポート
winget export -o ~/packages.json
```

**packages.jsonの例**:

```json
{
  "$schema": "https://aka.ms/winget-packages.schema.2.0.json",
  "Sources": [
    {
      "Packages": [
        { "PackageIdentifier": "Microsoft.VisualStudioCode" },
        { "PackageIdentifier": "Git.Git" },
        { "PackageIdentifier": "OpenJS.NodeJS.LTS" },
        { "PackageIdentifier": "Microsoft.PowerShell" },
        { "PackageIdentifier": "Microsoft.WindowsTerminal" },
        { "PackageIdentifier": "Microsoft.PowerToys" },
        { "PackageIdentifier": "Google.Chrome" },
        { "PackageIdentifier": "Anysphere.Cursor" },
        { "PackageIdentifier": "SlackTechnologies.Slack" },
        { "PackageIdentifier": "Docker.DockerDesktop" },
        { "PackageIdentifier": "JanDeDobbeleer.OhMyPosh" },
        { "PackageIdentifier": "Schniz.fnm" },
        { "PackageIdentifier": "junegunn.fzf" },
        { "PackageIdentifier": "BurntSushi.ripgrep.MSVC" },
        { "PackageIdentifier": "sharkdp.bat" }
      ],
      "SourceDetails": {
        "Name": "winget",
        "Type": "Microsoft.Winget.Source.2019-10-01",
        "Argument": "https://cdn.winget.microsoft.com/cache"
      }
    }
  ]
}
```

**新しいPCでのセットアップ**:

```powershell
# packages.jsonから一括インストール
winget import -i packages.json --accept-package-agreements --accept-source-agreements
```

## dotfilesで設定を管理

設定ファイル（PowerShellプロファイル、.gitconfigなど）をGitHubで管理し、どのPCでも同じ環境を再現できます。

**dotfilesリポジトリの作成**:

```powershell
# dotfilesディレクトリ作成
mkdir ~/dotfiles
cd ~/dotfiles
git init

# 設定ファイルをコピー
Copy-Item $PROFILE ~/dotfiles/profile.ps1
Copy-Item ~/.gitconfig ~/dotfiles/gitconfig

# packages.jsonも追加
winget export -o ~/dotfiles/packages.json

# GitHubにプッシュ
git add .
git commit -m "Initial dotfiles"
git remote add origin git@github.com:yourusername/dotfiles.git
git push -u origin main
```

**install.ps1スクリプトの作成**:

```powershell
# ~/dotfiles/install.ps1
#Requires -RunAsAdministrator

Write-Host "Setting up Windows development environment..." -ForegroundColor Cyan

# wingetパッケージのインストール
Write-Host "Installing packages from packages.json..." -ForegroundColor Yellow
winget import -i $PSScriptRoot\packages.json --accept-package-agreements --accept-source-agreements

# PowerShellプロファイルのシンボリックリンク作成
Write-Host "Creating symbolic links..." -ForegroundColor Yellow
$profileDir = Split-Path $PROFILE
if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force
}
New-Item -ItemType SymbolicLink -Path $PROFILE -Target "$PSScriptRoot\profile.ps1" -Force

# .gitconfigのシンボリックリンク作成
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.gitconfig" -Target "$PSScriptRoot\gitconfig" -Force

# Oh My Poshテーマ設定
Write-Host "Configuring Oh My Posh..." -ForegroundColor Yellow
oh-my-posh font install Meslo

Write-Host "Setup complete! Please restart your terminal." -ForegroundColor Green
```

**新しいPCでのセットアップ**:

```powershell
git clone git@github.com:yourusername/dotfiles.git ~/dotfiles
cd ~/dotfiles
.\install.ps1
```

## 知っておくべきキーボードショートカット

### システム全体

| ショートカット | 機能 |
|--------------|------|
| `Win+S` または `Win` | 検索 |
| `Alt+Space` | PowerToys Run起動 |
| `Win+Tab` | タスクビュー |
| `Alt+Tab` | ウィンドウ切り替え |
| `Alt+F4` | アプリ終了 |
| `Ctrl+W` | タブを閉じる |
| `Ctrl+N` | 新規ウィンドウ |
| `Ctrl+T` | 新規タブ |
| `Ctrl+C/V/X` | コピー/ペースト/カット |
| `Ctrl+Z` | 取り消し |
| `Ctrl+Y` | やり直し |
| `Win+V` | クリップボード履歴 |
| `Win+Shift+S` | スクリーンショット |

### ターミナル（PowerShell）

| ショートカット | 機能 |
|--------------|------|
| `Home` | 行頭に移動 |
| `End` | 行末に移動 |
| `Ctrl+左右` | 単語単位で移動 |
| `Ctrl+Backspace` | 前の単語を削除 |
| `Ctrl+Delete` | 次の単語を削除 |
| `Ctrl+R` | コマンド履歴検索 |
| `Ctrl+C` | コマンド中断 |
| `Ctrl+L` | 画面クリア |
| `Tab` | 補完 |
| `↑/↓` | 履歴を遡る/進む |

### エディタ（Cursor/VS Code）

| ショートカット | 機能 |
|--------------|------|
| `Ctrl+P` | ファイル検索 |
| `Ctrl+Shift+P` | コマンドパレット |
| `Ctrl+B` | サイドバー表示切替 |
| `Ctrl+J` | ターミナル表示切替 |
| `Ctrl+Shift+F` | 全体検索 |
| `Ctrl+D` | 次の同じ単語を選択 |
| `Alt+↑/↓` | 行を上下に移動 |
| `Alt+Shift+↑/↓` | 行を複製 |
| `Ctrl+/` | コメントアウト |

## 便利なターミナルテクニック

### zlocationで爆速ディレクトリ移動

PowerShell版のzコマンドです。

```powershell
# インストール
Install-Module -Name ZLocation -Scope CurrentUser

# $PROFILEに追記
Import-Module ZLocation
```

**使い方**:

```powershell
# 通常の移動
cd ~/projects/my-app/src/components/atoms

# zを使った移動（過去に訪れたディレクトリなら）
z atoms
```

### ripgrepで高速検索

```powershell
# 使い方（通常のfindstrより10倍速い）
rg "function" --type js
rg "TODO" -i  # 大文字小文字無視
```

### batで見やすいファイル表示

```powershell
# 使い方（catの代替、シンタックスハイライト付き）
bat index.js
bat package.json
```

## システム設定の最適化

### 開発者モードを有効化

設定 > プライバシーとセキュリティ > 開発者向け > 開発者モード をオン

シンボリックリンクの作成などが可能になります。

### タスクバーを最適化

右クリック > タスクバーの設定:

- **検索**: 非表示またはアイコンのみ
- **タスクビュー**: オフ（Win+Tabで呼び出せる）
- **ウィジェット**: オフ

### パフォーマンス設定

```powershell
# 視覚効果を減らしてパフォーマンス向上
SystemPropertiesPerformance.exe
# → 「パフォーマンスを優先する」または必要な項目のみ選択
```

### スタートアップアプリの整理

設定 > アプリ > スタートアップ

不要なアプリを無効化して起動を高速化。

## セキュリティ設定（必須）

### BitLocker（ディスク暗号化）

設定 > プライバシーとセキュリティ > デバイスの暗号化

PCを紛失・盗難された場合もデータを保護できます。

### Windows Defender

Windows標準のセキュリティソフトで十分強力です。設定 > プライバシーとセキュリティ > Windows セキュリティ で確認。

### パスワードマネージャー

```powershell
winget install AgileBits.1Password
# または
winget install Bitwarden.Bitwarden
```

全サービスで異なる強力なパスワードを使い、2要素認証（2FA）を有効化します。

## 初期セットアップチェックリスト

新しいWindows PCを購入したら、この順序で設定します。

**1. システム設定（30分）**
- [ ] Microsoftアカウントログイン
- [ ] Windows Update実行
- [ ] 開発者モード有効化
- [ ] BitLocker有効化

**2. winget（5分）**
- [ ] winget動作確認
- [ ] packages.json準備

**3. 開発環境（1時間）**
- [ ] Windows Terminalセットアップ
- [ ] PowerShellプロファイル設定
- [ ] Oh My Posh導入
- [ ] Git設定（SSH鍵含む）
- [ ] Node.js（fnm）セットアップ

**4. 生産性ツール（30分）**
- [ ] PowerToysインストール・設定
- [ ] クリップボード履歴有効化
- [ ] 音声入力設定

**5. AI開発ツール（15分）**
- [ ] Claude Codeインストール
- [ ] CLAUDE.md作成

**6. アプリケーション（30分）**
- [ ] Cursorインストール
- [ ] Google Chromeインストール
- [ ] Slackインストール
- [ ] 1Passwordインストール

**7. dotfiles（1時間）**
- [ ] GitHubからクローン
- [ ] シンボリックリンク作成
- [ ] 設定読み込み

**8. 動作確認（30分）**
- [ ] `git clone`できるか
- [ ] `npm install`できるか
- [ ] `docker compose up`できるか

**合計所要時間**: 約4-5時間

一度セットアップすれば、次回以降はdotfilesとpackages.jsonで30分程度で完了します。

## まとめ

Windowsをエンジニアとして使いこなすには：

1. **winget**でパッケージ管理を一元化
2. **Windows Terminal + PowerShell + Oh My Posh**でターミナル環境を快適化
3. **PowerToys + クリップボード履歴**で生産性を向上
4. **Claude Code**でAIを活用した開発を実践
5. **dotfiles + packages.json**で環境を再現可能に
6. **ショートカット**を習得して操作を高速化

これらの設定により、開発効率は飛躍的に向上します。特にスタートアップや個人開発では、環境構築にかける時間を最小化し、プロダクト開発に集中できる環境が重要です。

初期投資は半日程度ですが、その後の数年間で数百時間の節約になります。ぜひ今日から実践してみてください。

---

**関連記事**:
- [Macをエンジニアとして使いこなす完全ガイド【2026年版】](/blog/2026-02-11-mac-engineer-guide)
- [スタートアップの技術選定：2026年版最強スタック](/blog/2026-02-11-startup-tech-stack)
- [dotfilesリポジトリの作り方完全ガイド【Mac/Windows対応】](/blog/2026-02-12-dotfiles-guide)
