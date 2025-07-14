import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { CreateArticleWrapper } from './_components/create-article-wrapper';
import { db } from '@/lib/drizzle';
import { articleTable } from '@/lib/drizzle/schema';
import { tryCatch } from '@/lib/try-catch';
import { AdminArticleCard } from '@/components/admin/article-card';

export default async function Page() {
  const { data: articles, error } = await tryCatch(db.select().from(articleTable).limit(10));

  if (error) {
    console.log('[ARTICLES] Failed to get articles:', error);
    throw error;
  }

  return (
    <>
      <AdminPageHeader className="justify-between">
        {createBreadcrumb([{ label: 'Articles', isCurrent: true }])}
        <CreateArticleWrapper />
      </AdminPageHeader>
      <AdminPageContainer>
        <ul className="grid grid-cols-2 gap-4">
          {articles.map((article) => (
            <li key={article.id}>
              <AdminArticleCard article={article} />
            </li>
          ))}
        </ul>
      </AdminPageContainer>
    </>
  );
}
