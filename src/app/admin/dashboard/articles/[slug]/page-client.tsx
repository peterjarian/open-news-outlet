'use client';

import { ArticleInformation } from './_components/article-information';
import { AdminPageHeader } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Eye, Save } from 'lucide-react';
import { AdminPageContainer } from '@/components/admin/container';
import { useArticle } from '@/hooks/use-article';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { saveArticle } from '@/actions/articles';
import { toast } from 'sonner';
import { ArticleSidebar } from './_components/article-sidebar';

const getBreadcrumbs = (articleTitle: string) => [
  { label: 'Articles', href: '/admin/dashboard/articles' },
  { label: articleTitle, isCurrent: true },
];

export function ArticlePageClient() {
  const [savingArticle, setSavingArticle] = useState(false);
  const { article, setArticle, changed, setChanged } = useArticle();

  async function handleArticleSave() {
    setSavingArticle(true);

    const res = await saveArticle(article.id, {
      title: article.title,
      description: article.description,
      content: article.content ?? { type: 'doc', content: [] },
      status: article.status as string | undefined,
    });

    if (res.error) toast.error(res.error);
    else toast.success('Updates saved!');

    setArticle({ ...article, updatedAt: new Date() });
    setSavingArticle(false);
    setChanged(false);
  }

  return (
    <>
      <AdminPageHeader className="justify-between">
        <div className="min-w-0 flex-1">{createBreadcrumb(getBreadcrumbs(article.title))}</div>
        <div className="flex flex-shrink-0 items-center space-x-2">
          <Button size="sm" variant="secondary">
            <Eye />
            <span>Preview</span>
          </Button>
          <Button size="sm" disabled={!changed} onClick={handleArticleSave}>
            {savingArticle ? (
              <LoadingSpinner />
            ) : (
              <>
                <Save />
                <span>Save</span>
              </>
            )}
          </Button>
        </div>
      </AdminPageHeader>
      <AdminPageContainer>
        <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
          {/* Main content area */}
          <div className="min-w-0 flex-1">
            <ArticleInformation />
          </div>

          <div className="w-full flex-shrink-0 lg:w-80">
            <ArticleSidebar />
          </div>
        </div>
      </AdminPageContainer>
    </>
  );
}
