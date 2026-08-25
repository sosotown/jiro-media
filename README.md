# ジロラーメン (ziroramen media)

二郎系ラーメンの食べ歩き記事を配信する公開フロントエンド。記事データは
[supacms](https://cms.supa.dev) 上の org `sosotown` / project `jiroramen`
から取得する。

## セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local に SUPACMS_API_KEY を設定
npm run dev
```

## 環境変数

| 変数名 | 必須 | 説明 |
|---|---|---|
| `SUPACMS_API_KEY` | ✅ | supacms APIの認証キー。**サーバーサイドのみ**で使用され、クライアントバンドルには含まれない。 |
| `NEXT_PUBLIC_SITE_URL` | 任意(本番では推奨) | canonical / OGP / sitemap 生成に使う本番URL。未設定時はダミー値になる。 |

## データ取得の仕組み

- `lib/supacms.ts` が supacms REST APIをサーバーサイドのみで呼び出す。
  - `getAllPublishedArticles()`: `status=published` の記事を全件ページネーション取得(一覧・generateStaticParams・sitemap で共用)。
  - `getArticleBySlug(slug)`: 一覧からslug→entryIdを解決し、詳細エンドポイントを取得。
- 記事本文(リッチテキストHTML)は `lib/html.ts` の `sanitizeArticleBody` で許可タグ・許可属性方式でサニタイズしてから描画する(`<script>` 等は常に除去、`<iframe>` はYouTube/Vimeoのみ許可)。

## デプロイ(Cloudflare Pages / 完全静的サイト)

`next.config.ts` で `output: "export"` を指定しており、`npm run build` は
サーバーレス実行環境を必要としない完全な静的HTML(`out/`)を生成する。

- Cloudflare Pagesの設定: ビルドコマンド `npm run build`、出力ディレクトリ `out`。
- 記事詳細・ページネーションは全てビルド時に `generateStaticParams` で確定するため、
  ISR(再検証)やオンデマンド生成は行わない。**CMS側で記事を追加・更新した場合は
  再ビルド+再デプロイが必要**(Cloudflare Pagesのデプロイフック等での運用を推奨)。
- `next/image` は最適化サーバーに依存しないよう `images.unoptimized: true` にしている。

## 著者表示に関する方針

CMSの `authorName` / `authorBio` は実在の資格者を示すものではない前提で扱う。

- フロント側で医療・栄養・元二郎系スタッフ等の資格・経歴を保証する表現(認証バッジ風デザイン等)は付与しない。
- 記事タイトル・本文に健康関連キーワード(カロリー・妊娠・アレルギー等)が含まれる場合、記事下部に「医療的助言ではない」旨の注記を自動表示する(`lib/medicalDisclaimer.ts`)。
- `authorName` / `authorBio` が未設定の記事には、汎用的な編集部プロフィール(`lib/constants.ts`)を表示する。

## ページ構成

- `/` — 記事一覧 1ページ目(12件/ページ)
- `/page/[page]` — 記事一覧 2ページ目以降
- `/articles/[slug]` — 記事詳細(OGP・canonical・著者バイライン付き)
- 404 — スラッグ不一致時に表示
- `/sitemap.xml`, `/robots.txt` — 自動生成
