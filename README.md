# チームIT  /  公式Webサイト

中小企業のための、やさしいデジタル化支援チーム「チームIT」の公式Webサイトです。

Googleフォーム + Googleスプレッドシート + 静的HTMLサイトの構成で、
RepStyle様の運用作業を最小限にしつつ、低コストで運用できる設計になっています。

## デザインの特徴

- **落ち着いたブルー系のメインカラー** — 信頼感を演出
- **温かみのテラコッタを差し色** — 「ITっぽくない、親しみやすさ」を表現
- **ファーストビューに自作SVGイラスト** — 家＋4人のキャラクターで「相談窓口」と「チーム」を象徴
- **やさしいアニメーション** — 人物の呼吸、点線の流れ、フローティングカードの浮遊感
- **丸みのあるゴシック書体（Zen Maru Gothic）** — 読みやすさと優しさの両立
- **紙のような背景色** — IT特有の冷たさを排除

---

## ディレクトリ構成

```
teamit-starter/
├── index.html          ... トップページ
├── list.html           ... メンバー一覧
├── member.html         ... メンバー詳細
├── contact.html        ... お問い合わせ
├── css/
│   └── style.css       ... 全ページ共通スタイル
├── js/
│   ├── data.js         ... データ取得モジュール（要設定）
│   ├── list.js         ... 一覧ページのロジック
│   └── member.js       ... 詳細ページのロジック
├── img/                ... 画像置き場（必要に応じて）
└── README.md           ... このファイル
```

---

## クイックスタート（とりあえず動かしてみる）

### 1. ローカルで動作確認

ブラウザでHTMLファイルを直接ダブルクリックすると、CORSエラーで動かない可能性があります。
簡易サーバーを起動してアクセスしてください。

**Python が入っている場合:**
```bash
cd teamit-starter
python3 -m http.server 8000
```

**Node.js が入っている場合:**
```bash
npx serve teamit-starter
```

その後、ブラウザで `http://localhost:8000` を開きます。

### 2. 動作モードの確認

`js/data.js` の冒頭に動作モードの設定があります。

```javascript
const DATA_MODE = 'sample';  // ← 初期値
```

| 値 | 動作 |
|---|---|
| `'sample'` | 内蔵のサンプルデータで動く（デフォルト） |
| `'sheet'` | Googleスプレッドシートからデータ取得 |

最初は `'sample'` のままで問題ありません。サンプルデータで6名のメンバーが表示されます。

---

## 本番データ（Googleスプレッドシート）に切り替える手順

### STEP 1: スプレッドシートに「公開用」シートを作る

1. Googleフォームの編集画面を開く
2. 「回答」タブをクリック
3. 右上の緑のスプレッドシートアイコンから、回答用スプレッドシートを開く
4. 左下の「+」ボタンで新しいシートを追加
5. シート名を `公開用` に変更
6. 1行目に以下のヘッダーを入力する

| 列 | ヘッダー名 | 内容 |
|---|---|---|
| A | id | 一意の識別子 (例: 001, 002) |
| B | 公開フラグ | TRUE / FALSE |
| C | 会社名 | 会社名・屋号 |
| D | URL | WebサイトのURL |
| E | ロゴ画像URL | Googleドライブの共有URL |
| F | カテゴリー | 提供カテゴリー（カンマ区切り可） |
| G | 所在地 | 都道府県 |
| H | 特徴強み | 特徴・強みの簡潔な説明 |
| I | 特徴画像URL | 特徴の補足画像URL |
| J | 事業内容 | 具体的な事業内容 |
| K | 事業内容画像URL | 事業内容の補足画像URL |
| L | アピール | アピールポイント・差別化要因 |
| M | アピール画像URL | アピールの補足画像URL |

**重要**: ヘッダー名は `js/data.js` で参照されているので、上記と完全に一致させてください。

### STEP 2: 回答シートから公開用シートへ反映

1. 「フォームの回答 1」シート（自動生成される）を開く
2. 公開してよい行を選択してコピー
3. 「公開用」シートに貼り付け
4. B列（公開フラグ）に `TRUE` と入力

### STEP 3: スプレッドシートを「ウェブに公開」する

1. メニュー: ファイル → 共有 → ウェブに公開
2. 公開対象タブで「公開用」シートを選択
3. 形式: 「カンマ区切り形式 (.csv)」
4. 「公開」ボタンをクリック
5. 発行されたURLをコピー

### STEP 4: data.jsの設定を切り替える

`js/data.js` を編集します。

```javascript
// 動作モードを 'sheet' に変更
const DATA_MODE = 'sheet';

// コピーしたURLをここに貼り付け
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/.../pub?output=csv';
```

これで、サイトはスプレッドシートからデータを読むようになります。

### STEP 5: 画像の公開設定

Googleドライブの画像は、デフォルトでは「リンクを知っている人のみ閲覧可」になっていません。

1. Googleドライブで画像ファイルを右クリック
2. 「共有」を選択
3. 「リンクを知っている全員」に変更
4. 共有URLをコピー
5. スプレッドシートの該当列に貼り付け

URL形式は自動変換されるので、`https://drive.google.com/file/d/XXX/view` のままで貼り付けてOKです。

---

## GitHub & Cloudflare Pages で公開する手順

### STEP 1: ローカルで Git リポジトリ初期化

```bash
cd teamit-starter
git init
git add .
git commit -m "first commit"
```

### STEP 2: GitHub にリポジトリ作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `teamit-site`）
3. Public または Private を選択
4. 「Create repository」をクリック
5. 表示される手順に従ってローカルリポジトリと連携:

```bash
git remote add origin https://github.com/YOUR_USERNAME/teamit-site.git
git branch -M main
git push -u origin main
```

### STEP 3: Cloudflare Pages にデプロイ

1. https://pages.cloudflare.com にアクセス
2. アカウント作成（メールアドレスまたはGoogleアカウント連携）
3. 「Create a project」→「Connect to Git」を選択
4. GitHubアカウントを連携
5. 先ほど作成したリポジトリを選択
6. ビルド設定:
   - **Framework preset**: None
   - **Build command**: 空欄でOK
   - **Build output directory**: `/`（ルート）
7. 「Save and Deploy」をクリック
8. 数分でデプロイが完了し、`xxxxx.pages.dev` 形式のURLが発行されます

### STEP 4: 独自ドメインの設定（任意）

1. Cloudflare Pages のプロジェクトページで「Custom domains」タブを開く
2. 「Set up a custom domain」をクリック
3. 用意したドメイン（例: `teamit.example.jp`）を入力
4. ドメイン管理画面の指示に従ってDNS設定（CNAMEレコード追加）
5. 数分〜数時間でSSL証明書が自動発行され、HTTPSで公開されます

### STEP 5: 更新フロー

サイトの更新は、ローカルでファイルを編集してgit pushするだけです。

```bash
# ファイルを編集後
git add .
git commit -m "更新内容のメモ"
git push
```

数十秒で本番サイトに反映されます。

---

## RepStyle様の運用フロー（公開後）

メンバー情報を追加・編集する場合、RepStyle様の作業はこれだけです。

### 新規メンバー追加

1. メンバーがGoogleフォームから情報を送信
2. 「フォームの回答 1」シートに自動的に追加される
3. 内容を確認し、必要に応じて整形
4. 「公開用」シートにコピー＆ペースト
5. id（連番）と公開フラグ（TRUE）を入力
6. 数分後、サイトに反映される

### メンバー情報の修正

1. 「公開用」シートで該当行を編集
2. 数分後、サイトに反映される

### メンバーを非公開に

1. 「公開用」シートで公開フラグ列を `FALSE` に変更
2. 数分後、サイトから非表示になる

---

## トラブルシューティング

| 症状 | 対処法 |
|---|---|
| データが表示されない | `js/data.js` の `DATA_MODE` と `SHEET_URL` を確認 |
| 「読み込み中...」のまま止まる | スプレッドシートの公開URLが正しいか、ブラウザのDevTools(F12)でエラーを確認 |
| 画像が表示されない | Googleドライブの共有設定が「リンクを知っている全員」になっているか確認 |
| ローカルでCORSエラー | `python3 -m http.server` などの簡易サーバー経由でアクセス |
| 更新が即時反映されない | スプレッドシートの公開キャッシュ。数分待つか、ブラウザのキャッシュをクリア |
| 文字化け | `js/data.js` の `Papa.parse` でUTF-8を指定済み。スプレッドシート側のエンコードを確認 |

---

## 連絡先

制作: (屋号 / チーム名)  
担当: (担当者名)  
Mail: (メールアドレス)

運営: RepStyle株式会社  
Mail: tsumura.takeshi@repstyle.co.jp
