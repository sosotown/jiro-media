import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPublishedArticles, getArticleBySlug } from "@/lib/supacms";
import { excerptFromRichText, extractPlainText } from "@/lib/richText";
import { resolveAuthor } from "@/lib/author";
import { shouldShowMedicalDisclaimer } from "@/lib/medicalDisclaimer";
import ArticleBody from "@/components/ArticleBody";
import AuthorBio from "@/components/AuthorBio";
import MedicalDisclaimer from "@/components/MedicalDisclaimer";

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
  const description = excerptFromRichText(body, 120);

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

  return (
    <article>
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
        <h1 className="font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {title}
        </h1>

        <div className="mt-5 border-b border-border pb-6">
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
