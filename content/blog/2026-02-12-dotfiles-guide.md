---
title: "dotfilesリポジトリの作り方完全ガイド【Mac/Windows対応】"
date: "2026-02-12"
excerpt: "開発環境を一瞬で再現できるdotfilesリポジトリの作り方を解説。Mac（zsh/Homebrew）とWindows（PowerShell/winget）の両方に対応した実践的なガイド。"
tags: ["dotfiles", "開発環境", "Mac", "Windows", "Git", "自動化"]
---

# dotfilesリポジトリの作り方完全ガイド【Mac/Windows対応】

新しいPCを購入したとき、開発環境のセットアップに何時間もかかっていませんか？dotfilesリポジトリを作成すれば、コマンド一発で同じ環境を再現できます。

この記事では、MacとWindows両方に対応したdotfilesリポジトリの作り方を解説します。

## dotfilesとは

dotfilesとは、`.`（ドット）で始まる設定ファイルの総称です。

**代表的なdotfiles**:

| ファイル | 役割 |
|---------|------|
| `.zshrc` | zshの設定（Mac/Linux） |
| `.bashrc` | bashの設定 |
| `.gitconfig` | Gitの設定 |
| `.vimrc` | Vimの設定 |
| `profile.ps1` | PowerShellの設定（Windows） |

これらをGitHubで管理することで：

- **環境の再現**: 新しいPCでもすぐに同じ環境を構築
- **バックアップ**: 設定ファイルを安全に保管
- **履歴管理**: 変更履歴を追跡可能
- **共有**: 他の人と設定を共有

## dotfilesリポジトリの構成

### 基本構成

```
dotfiles/
├── README.md           # セットアップ手順
├── install.sh          # Mac/Linux用インストールスクリプト
├── install.ps1         # Windows用インストールスクリプト
├── Brewfile            # Homebrewパッケージ一覧（Mac）
├── packages.json       # wingetパッケージ一覧（Windows）
│
├── mac/                # Mac固有の設定
│   ├── zshrc
│   ├── zprofile
│   └── macos           # macOSシステム設定
│
├── windows/            # Windows固有の設定
│   └── profile.ps1
│
├── git/                # Git設定（共通）
│   ├── gitconfig
│   └── gitignore_global
│
├── vim/                # Vim設定（共通）
│   └── vimrc
│
└── config/             # その他の設定
    ├── starship.toml   # Starshipプロンプト
    └── wezterm.lua     # WezTerm設定
```

## Mac用dotfilesの作成

### Step 1: ディレクトリ作成

```bash
mkdir ~/dotfiles
cd ~/dotfiles
git init
```

### Step 2: zshrc作成

```bash
vim ~/dotfiles/mac/zshrc
```

**mac/zshrcの内容**:

```bash
# ============================================
# Zinit（プラグインマネージャー）
# ============================================
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"
if [ ! -d "$ZINIT_HOME" ]; then
  mkdir -p "$(dirname $ZINIT_HOME)"
  git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi
source "${ZINIT_HOME}/zinit.zsh"

# プラグイン
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions

# ============================================
# 基本設定
# ============================================
# 履歴
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.zsh_history
setopt HIST_IGNORE_DUPS
setopt SHARE_HISTORY

# 補完
autoload -Uz compinit && compinit
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}'

# ============================================
# エイリアス
# ============================================
alias ll="ls -la"
alias la="ls -a"
alias g="git"
alias gs="git status"
alias gp="git push"
alias gc="git commit"
alias gd="git diff"
alias ga="git add"
alias gl="git log --oneline -10"
alias dc="docker compose"
alias code="cursor"

# ディレクトリ移動
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

# よく使うディレクトリ
alias dev="cd ~/Developer"
alias dl="cd ~/Downloads"

# ============================================
# 関数
# ============================================
# mkdirしてcd
mkcd() {
  mkdir -p "$1" && cd "$1"
}

# ブランチを選択してチェックアウト
gco() {
  git branch -a | fzf | xargs git checkout
}

# ============================================
# 環境変数
# ============================================
export EDITOR="vim"
export LANG="ja_JP.UTF-8"
export PATH="/opt/homebrew/bin:$PATH"

# nodenv
eval "$(nodenv init -)"

# Starship（プロンプト）
eval "$(starship init zsh)"

# fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
```

### Step 3: Brewfile作成

```bash
vim ~/dotfiles/Brewfile
```

**Brewfileの内容**:

```ruby
# ============================================
# Taps
# ============================================
tap "homebrew/bundle"
tap "homebrew/cask-fonts"

# ============================================
# CLIツール
# ============================================
brew "git"
brew "gh"                   # GitHub CLI
brew "node"
brew "nodenv"
brew "fzf"
brew "ripgrep"
brew "bat"
brew "tree"
brew "jq"
brew "wget"
brew "starship"             # プロンプト

# ============================================
# GUIアプリケーション
# ============================================
cask "google-chrome"
cask "cursor"
cask "slack"
cask "discord"
cask "docker"
cask "raycast"
cask "rectangle"
cask "1password"
cask "iterm2"
cask "wezterm"
cask "notion"

# ============================================
# フォント
# ============================================
cask "font-jetbrains-mono-nerd-font"
cask "font-hack-nerd-font"
```

### Step 4: gitconfig作成

```bash
vim ~/dotfiles/git/gitconfig
```

**git/gitconfigの内容**:

```ini
[user]
    name = Your Name
    email = you@example.com

[init]
    defaultBranch = main

[core]
    editor = vim
    autocrlf = input
    ignorecase = false

[color]
    ui = auto

[alias]
    st = status
    co = checkout
    br = branch
    cm = commit
    lg = log --graph --oneline --all
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk

[pull]
    rebase = false

[push]
    default = current

[fetch]
    prune = true
```

### Step 5: install.sh作成

```bash
vim ~/dotfiles/install.sh
chmod +x ~/dotfiles/install.sh
```

**install.shの内容**:

```bash
#!/bin/bash
set -e

DOTFILES_DIR="$HOME/dotfiles"

echo "🚀 Starting dotfiles setup..."

# ============================================
# Homebrew
# ============================================
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # Apple Silicon対応
    if [[ $(uname -m) == "arm64" ]]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
fi

# ============================================
# Brewfileからインストール
# ============================================
echo "📦 Installing packages from Brewfile..."
brew bundle --file="$DOTFILES_DIR/Brewfile"

# ============================================
# シンボリックリンク作成
# ============================================
echo "🔗 Creating symbolic links..."

# zsh
ln -sf "$DOTFILES_DIR/mac/zshrc" "$HOME/.zshrc"

# Git
ln -sf "$DOTFILES_DIR/git/gitconfig" "$HOME/.gitconfig"

# Vim
ln -sf "$DOTFILES_DIR/vim/vimrc" "$HOME/.vimrc"

# Starship
mkdir -p "$HOME/.config"
ln -sf "$DOTFILES_DIR/config/starship.toml" "$HOME/.config/starship.toml"

# WezTerm
ln -sf "$DOTFILES_DIR/config/wezterm.lua" "$HOME/.wezterm.lua"

# ============================================
# fzfインストール
# ============================================
echo "⚙️ Setting up fzf..."
$(brew --prefix)/opt/fzf/install --all --no-bash --no-fish

# ============================================
# macOS設定
# ============================================
if [[ -f "$DOTFILES_DIR/mac/macos" ]]; then
    echo "⚙️ Applying macOS settings..."
    source "$DOTFILES_DIR/mac/macos"
fi

# ============================================
# 完了
# ============================================
echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Restart your terminal"
echo "  2. Run 'source ~/.zshrc'"
echo "  3. Configure SSH keys for GitHub"
echo ""
```

### Step 6: macOSシステム設定（オプション）

```bash
vim ~/dotfiles/mac/macos
```

**mac/macosの内容**:

```bash
#!/bin/bash

# ============================================
# macOS設定スクリプト
# ============================================

echo "Configuring macOS settings..."

# Dockを自動非表示
defaults write com.apple.dock autohide -bool true

# Dockのアニメーション速度を上げる
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.3

# キーリピートを高速化
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15

# スクリーンショットの保存先をDownloadsに
defaults write com.apple.screencapture location ~/Downloads

# Finderで隠しファイルを表示
defaults write com.apple.finder AppleShowAllFiles -bool true

# 拡張子を常に表示
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# 設定を反映
killall Dock
killall Finder

echo "macOS settings applied!"
```

## Windows用dotfilesの作成

### Step 1: PowerShellプロファイル作成

```powershell
vim ~/dotfiles/windows/profile.ps1
```

**windows/profile.ps1の内容**:

```powershell
# ============================================
# モジュール
# ============================================
# PSReadLine（入力補完）
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward

# ZLocation（z コマンド）
Import-Module ZLocation

# ============================================
# エイリアス
# ============================================
Set-Alias ll Get-ChildItem
Set-Alias g git
Set-Alias code cursor
Set-Alias which Get-Command

function gs { git status }
function gp { git push }
function gc { git commit $args }
function gd { git diff $args }
function ga { git add $args }
function gl { git log --oneline -10 }
function dc { docker compose $args }

# ディレクトリ移動
function .. { Set-Location .. }
function ... { Set-Location ..\.. }
function .... { Set-Location ..\..\.. }

# よく使うディレクトリ
function dev { Set-Location ~/Developer }
function dl { Set-Location ~/Downloads }

# ============================================
# 関数
# ============================================
# mkdirしてcd
function mkcd {
    param([string]$path)
    New-Item -ItemType Directory -Path $path -Force | Out-Null
    Set-Location $path
}

# Ctrl+Rでfzf履歴検索
Set-PSReadLineKeyHandler -Key Ctrl+r -ScriptBlock {
    $command = Get-Content (Get-PSReadLineOption).HistorySavePath | fzf --tac
    if ($command) {
        [Microsoft.PowerShell.PSConsoleReadLine]::Insert($command)
    }
}

# ============================================
# 環境変数
# ============================================
$env:EDITOR = "code"

# fnm（Node.jsバージョン管理）
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression

# Starship（プロンプト）
Invoke-Expression (&starship init powershell)

# ============================================
# 起動メッセージ
# ============================================
Write-Host "PowerShell $($PSVersionTable.PSVersion)" -ForegroundColor Cyan
```

### Step 2: packages.json作成

```powershell
vim ~/dotfiles/packages.json
```

**packages.jsonの内容**:

```json
{
  "$schema": "https://aka.ms/winget-packages.schema.2.0.json",
  "Sources": [
    {
      "Packages": [
        { "PackageIdentifier": "Microsoft.PowerShell" },
        { "PackageIdentifier": "Microsoft.WindowsTerminal" },
        { "PackageIdentifier": "Microsoft.PowerToys" },
        { "PackageIdentifier": "Git.Git" },
        { "PackageIdentifier": "GitHub.cli" },
        { "PackageIdentifier": "OpenJS.NodeJS.LTS" },
        { "PackageIdentifier": "Schniz.fnm" },
        { "PackageIdentifier": "junegunn.fzf" },
        { "PackageIdentifier": "BurntSushi.ripgrep.MSVC" },
        { "PackageIdentifier": "sharkdp.bat" },
        { "PackageIdentifier": "stedolan.jq" },
        { "PackageIdentifier": "Starship.Starship" },
        { "PackageIdentifier": "Google.Chrome" },
        { "PackageIdentifier": "Anysphere.Cursor" },
        { "PackageIdentifier": "SlackTechnologies.Slack" },
        { "PackageIdentifier": "Discord.Discord" },
        { "PackageIdentifier": "Docker.DockerDesktop" },
        { "PackageIdentifier": "Notion.Notion" },
        { "PackageIdentifier": "AgileBits.1Password" },
        { "PackageIdentifier": "wez.wezterm" }
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

### Step 3: install.ps1作成

```powershell
vim ~/dotfiles/install.ps1
```

**install.ps1の内容**:

```powershell
#Requires -RunAsAdministrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

$DOTFILES_DIR = "$env:USERPROFILE\dotfiles"

Write-Host "🚀 Starting dotfiles setup..." -ForegroundColor Cyan

# ============================================
# wingetパッケージインストール
# ============================================
Write-Host "📦 Installing packages from packages.json..." -ForegroundColor Yellow
winget import -i "$DOTFILES_DIR\packages.json" --accept-package-agreements --accept-source-agreements

# ============================================
# PowerShellモジュールインストール
# ============================================
Write-Host "📦 Installing PowerShell modules..." -ForegroundColor Yellow
Install-Module -Name PSReadLine -Force -SkipPublisherCheck
Install-Module -Name ZLocation -Scope CurrentUser -Force

# ============================================
# シンボリックリンク作成
# ============================================
Write-Host "🔗 Creating symbolic links..." -ForegroundColor Yellow

# PowerShellプロファイル
$profileDir = Split-Path $PROFILE
if (!(Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force
}
New-Item -ItemType SymbolicLink -Path $PROFILE -Target "$DOTFILES_DIR\windows\profile.ps1" -Force

# Gitconfig
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.gitconfig" -Target "$DOTFILES_DIR\git\gitconfig" -Force

# Starship
$configDir = "$env:USERPROFILE\.config"
if (!(Test-Path $configDir)) {
    New-Item -ItemType Directory -Path $configDir -Force
}
New-Item -ItemType SymbolicLink -Path "$configDir\starship.toml" -Target "$DOTFILES_DIR\config\starship.toml" -Force

# WezTerm
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.wezterm.lua" -Target "$DOTFILES_DIR\config\wezterm.lua" -Force

# ============================================
# Nerd Fontインストール
# ============================================
Write-Host "🔤 Installing Nerd Font..." -ForegroundColor Yellow
oh-my-posh font install Meslo

# ============================================
# 完了
# ============================================
Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Restart your terminal"
Write-Host "  2. Configure SSH keys for GitHub"
Write-Host "  3. Set Windows Terminal font to 'MesloLGM Nerd Font'"
Write-Host ""
```

## 共通設定ファイル

### Starship（プロンプト）

```bash
vim ~/dotfiles/config/starship.toml
```

**config/starship.tomlの内容**:

```toml
# Starshipプロンプト設定
# https://starship.rs/config/

# プロンプトの形式
format = """
$directory\
$git_branch\
$git_status\
$nodejs\
$python\
$cmd_duration\
$line_break\
$character"""

# ディレクトリ
[directory]
truncation_length = 3
truncate_to_repo = true
style = "bold cyan"

# Gitブランチ
[git_branch]
symbol = " "
style = "bold purple"

# Gitステータス
[git_status]
style = "bold red"
ahead = "⇡${count}"
behind = "⇣${count}"
diverged = "⇕⇡${ahead_count}⇣${behind_count}"
modified = "!${count}"
staged = "+${count}"
untracked = "?${count}"

# Node.js
[nodejs]
symbol = " "
style = "bold green"

# Python
[python]
symbol = " "
style = "bold yellow"

# コマンド実行時間
[cmd_duration]
min_time = 2_000
style = "bold yellow"

# プロンプト文字
[character]
success_symbol = "[❯](bold green)"
error_symbol = "[❯](bold red)"
```

### WezTerm

```bash
vim ~/dotfiles/config/wezterm.lua
```

**config/wezterm.luaの内容**:

```lua
local wezterm = require 'wezterm'
local config = wezterm.config_builder()

-- ============================================
-- 外観
-- ============================================
config.color_scheme = 'Tokyo Night'
config.font = wezterm.font('JetBrainsMono Nerd Font', { weight = 'Medium' })
config.font_size = 14.0

-- ウィンドウ
config.window_decorations = "RESIZE"
config.window_padding = {
  left = 10,
  right = 10,
  top = 10,
  bottom = 10,
}

-- タブバー
config.hide_tab_bar_if_only_one_tab = true
config.use_fancy_tab_bar = false

-- ============================================
-- キーバインド
-- ============================================
config.keys = {
  -- ペイン分割
  {
    key = 'd',
    mods = 'CMD',
    action = wezterm.action.SplitHorizontal { domain = 'CurrentPaneDomain' },
  },
  {
    key = 'd',
    mods = 'CMD|SHIFT',
    action = wezterm.action.SplitVertical { domain = 'CurrentPaneDomain' },
  },
  -- ペイン間移動
  {
    key = 'h',
    mods = 'CMD',
    action = wezterm.action.ActivatePaneDirection 'Left',
  },
  {
    key = 'l',
    mods = 'CMD',
    action = wezterm.action.ActivatePaneDirection 'Right',
  },
  {
    key = 'k',
    mods = 'CMD',
    action = wezterm.action.ActivatePaneDirection 'Up',
  },
  {
    key = 'j',
    mods = 'CMD',
    action = wezterm.action.ActivatePaneDirection 'Down',
  },
}

return config
```

## GitHubにプッシュ

### Step 1: .gitignoreの作成

```bash
vim ~/dotfiles/.gitignore
```

```
.DS_Store
*.log
*.swp
.env
.env.local
```

### Step 2: READMEの作成

```bash
vim ~/dotfiles/README.md
```

**README.mdの内容**:

```markdown
# dotfiles

My personal dotfiles for Mac and Windows.

## Quick Start

### Mac

```bash
git clone https://github.com/yourusername/dotfiles.git ~/dotfiles
cd ~/dotfiles
./install.sh
```

### Windows (PowerShell as Admin)

```powershell
git clone https://github.com/yourusername/dotfiles.git ~/dotfiles
cd ~/dotfiles
.\install.ps1
```

## What's Included

### Mac
- zsh configuration with Zinit
- Homebrew packages (Brewfile)
- macOS system preferences

### Windows
- PowerShell profile with PSReadLine
- winget packages (packages.json)

### Shared
- Git configuration
- Starship prompt
- WezTerm configuration

## Manual Steps After Install

1. Configure SSH keys for GitHub
2. Sign in to apps (1Password, Slack, etc.)
3. Configure editor settings
```

### Step 3: GitHubにプッシュ

```bash
cd ~/dotfiles
git add .
git commit -m "Initial dotfiles"
git remote add origin git@github.com:yourusername/dotfiles.git
git push -u origin main
```

## 新しいPCでのセットアップ

### Mac

```bash
# Xcodeコマンドラインツール（Gitに必要）
xcode-select --install

# dotfilesをクローン
git clone https://github.com/yourusername/dotfiles.git ~/dotfiles

# インストール実行
cd ~/dotfiles
./install.sh
```

### Windows

```powershell
# PowerShellを管理者として実行
git clone https://github.com/yourusername/dotfiles.git ~/dotfiles
cd ~/dotfiles
.\install.ps1
```

## メンテナンスのコツ

### 1. 変更したらすぐコミット

```bash
cd ~/dotfiles
git add .
git commit -m "Add new alias"
git push
```

### 2. 定期的にパッケージリストを更新

**Mac**:

```bash
brew bundle dump --file=~/dotfiles/Brewfile --force
```

**Windows**:

```powershell
winget export -o ~/dotfiles/packages.json
```

### 3. 新しいツールを追加したら

1. 設定ファイルをdotfilesに追加
2. install.shにシンボリックリンク追加
3. コミット＆プッシュ

## トラブルシューティング

### シンボリックリンクが作成できない（Windows）

開発者モードを有効にしてください：

設定 > プライバシーとセキュリティ > 開発者向け > 開発者モード

### Homebrewが見つからない（Mac）

Apple Siliconの場合、PATHを通す必要があります：

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### PowerShellスクリプトが実行できない

実行ポリシーを変更：

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## まとめ

dotfilesリポジトリを作成すれば：

1. **新しいPC**: コマンド1つで環境構築完了
2. **バックアップ**: 設定ファイルを安全に保管
3. **同期**: 複数PCで同じ設定を共有
4. **履歴**: 変更を追跡・ロールバック可能

初期構築に2-3時間かかりますが、その後は新しいPCでも30分で環境構築が完了します。

ぜひ今日からdotfilesを始めてみてください。

---

**関連記事**:
- [Macをエンジニアとして使いこなす完全ガイド【2026年版】](/blog/mac-engineer-guide)
- [Windowsをエンジニアとして使いこなす完全ガイド【2026年版】](/blog/windows-engineer-guide)
- [スタートアップの技術選定：2026年版最強スタック](/blog/startup-tech-stack)
- [Claude APIを活用した業務自動化【Python実践ガイド】](/blog/claude-api-automation)
