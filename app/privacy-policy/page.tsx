import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteUrl";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { name: "二郎系マガジン", href: "/" },
          { name: "プライバシーポリシー" },
        ]}
      />

      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        プライバシーポリシー
      </h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted">
        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            アクセス解析ツールについて
          </h2>
          <p className="mt-2">
            当サイトでは、サイトの利用状況を把握するためにCloudflare
            Web Analyticsを利用しています。このツールはCookieを使用せず、個人を特定する情報を収集することなくトラフィックデータを計測します。収集したデータは匿名で、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            広告について
          </h2>
          <p className="mt-2">
            当サイトでは、現在第三者配信の広告サービスを利用していません。今後導入する場合は、本ページにて内容を更新し、利用者にお知らせします。
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            コメントについて
          </h2>
          <p className="mt-2">
            当サイトはコメント機能を提供していません。
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            免責事項
          </h2>
          <p className="mt-2">
            当サイトに掲載する情報については、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていたりする場合がございます。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、ご了承ください。
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            著作権について
          </h2>
          <p className="mt-2">
            当サイトで掲載している文章や画像等の著作権は、当サイトに帰属します。無断転載・無断使用はご遠慮ください。
          </p>
        </section>

        <section>
          <h2 className="font-heading text-lg font-bold text-muted-strong">
            プライバシーポリシーの変更について
          </h2>
          <p className="mt-2">
            当サイトは、必要に応じて本ポリシーの内容を予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}
