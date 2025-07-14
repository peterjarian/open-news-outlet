import { AdminPageContainer } from '@/components/admin/container';
import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArticlePageClient } from './page-client';
import { AdminPageHeader } from '@/components/admin/page-header';
import { BreadcrumbItem, createBreadcrumb } from '@/components/ui/breadcrumb';

const getBreadcrumbs: (articletitle: string) => BreadcrumbItem[] = (articleTitle: string) => [
  { label: 'Articles', href: '/admin/dashboard/articles' },
  { label: articleTitle, isCurrent: true },
];

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
    <>
      <AdminPageHeader className="justify-between">
        {createBreadcrumb(getBreadcrumbs(article.title))}
      </AdminPageHeader>
      <AdminPageContainer>
        <ArticlePageClient article={article} />
      </AdminPageContainer>
    </>
  );
}
