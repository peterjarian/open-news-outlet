import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader, AdminPageHeaderContent } from '@/components/admin/page-header';
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
      <AdminPageHeader className="space-x-2">
        <AdminPageHeaderContent>
          {createBreadcrumb([{ label: 'Articles', isCurrent: true }])}
          <CreateArticleWrapper />
        </AdminPageHeaderContent>
      </AdminPageHeader>
      <AdminPageContainer>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {!articles.length ? (
            <li className="col-span-2 flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-muted-foreground text-lg font-medium">No articles here</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Create your first article to get started
                </p>
              </div>
            </li>
          ) : (
            articles.map((article) => (
              <li key={article.id}>
                <AdminArticleCard article={article} />
              </li>
            ))
          )}
        </ul>
      </AdminPageContainer>
    </>
  );
}
