import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPublishedArticles, getArticleBySlug } from "@/lib/supacms";
import { excerptFromRichText, extractPlainText } from "@/lib/richText";
import { resolveAuthor } from "@/lib/author";
import { shouldShowMedicalDisclaimer } from "@/lib/medicalDisclaimer";
import { formatDateJa } from "@/lib/date";
import { SITE_URL } from "@/lib/siteUrl";
import ArticleBody from "@/components/ArticleBody";
import AuthorBio from "@/components/AuthorBio";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const articles = await getAllPublishedArticles();
  return articles.map((entry) => ({ slug: entry.data.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "記事が見つかりません" };
  }

  const { title, body, featuredImage } = article.data;
  const author = resolveAuthor(article.data);
  const description = excerptFromRichText(body, 120);
  const publishedAt = article.publishedAt ?? article.createdAt;

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_URL}/articles/${slug}`,
      publishedTime: publishedAt,
      modifiedTime: article.updatedAt,
      authors: [author.name],
      images: featuredImage ? [{ url: featuredImage.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage ? [featuredImage.url] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { title, body, featuredImage } = article.data;
  const author = resolveAuthor(article.data);
  const showDisclaimer = shouldShowMedicalDisclaimer(title, extractPlainText(body));
  const publishedAt = article.publishedAt ?? article.createdAt;
  const updatedAt = article.updatedAt;
  const url = `${SITE_URL}/articles/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerptFromRichText(body, 120),
    image: featuredImage ? [featuredImage.url] : undefined,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "二郎系マガジン",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <article>
      <JsonLd data={articleJsonLd} />

      {featuredImage && (
        <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden bg-surface sm:aspect-[21/9]">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Breadcrumb items={[{ name: "二郎系マガジン", href: "/" }, { name: title }]} />

        <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          <span>
            投稿日: <time dateTime={publishedAt}>{formatDateJa(publishedAt)}</time>
          </span>
          {updatedAt !== publishedAt && (
            <span>
              更新日: <time dateTime={updatedAt}>{formatDateJa(updatedAt)}</time>
            </span>
          )}
        </div>

        <div className="mt-4 border-b border-border pb-6">
          <AuthorBio variant="byline" author={author} />
        </div>

        <div className="mt-8">
          <ArticleBody doc={body} />
        </div>

        {showDisclaimer && <MedicalDisclaimer />}

        <AuthorBio variant="full" author={author} />
      </div>
    </article>
  );
}
