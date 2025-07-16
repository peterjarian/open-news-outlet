import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArticlePageClient } from './page-client';
import { ArticleProvider } from '@/providers/article';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const { data, error } = await tryCatch(
    db.select().from(articleTable).where(eq(articleTable.slug, slug)).limit(1),
  );

  if (error) {
    console.log('[ARTICLES] Failed to fetch article', error);
    throw error;
  }

  const article = data[0];

  if (!article) {
    console.log('[ARTICLES] Article not found for slug:', slug);
    notFound();
  }

  return (
    <ArticleProvider initialArticle={article}>
      <ArticlePageClient />
    </ArticleProvider>
  );
}
