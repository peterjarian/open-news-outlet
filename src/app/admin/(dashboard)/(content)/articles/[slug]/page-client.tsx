'use client';

import { General } from './_components/general';
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
import { useForm } from 'react-hook-form';
import { UpdateArticleData, updateArticleSchema } from '@/schemas/articles';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { SEO } from './_components/seo';

const getBreadcrumbs = (articleTitle: string) => [
  { label: 'Articles', href: '/admin/dashboard/articles' },
  { label: articleTitle, isCurrent: true },
];

export function ArticlePageClient() {
  const [savingArticle, setSavingArticle] = useState(false);
  const { article, setArticle, changed, setChanged } = useArticle();
  const form = useForm<UpdateArticleData>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: {
      title: article.title,
      description: article.description,
      content: article.content ?? undefined,
      status: article.status,
      seoTitle: article.seoTitle ?? undefined,
      seoDescription: article.seoDescription ?? undefined,
    },
  });

  async function handleArticleSave() {
    setSavingArticle(true);

    const data = form.getValues();

    const res = await saveArticle(article.id, data);

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
          <Button size="sm" disabled={!changed} onClick={form.handleSubmit(handleArticleSave)}>
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
        <Form {...form}>
          <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
            <div className="min-w-0 flex-1">
              <div className="space-y-8">
                <General form={form} />
                <SEO form={form} />
              </div>
            </div>
            <div className="w-full flex-shrink-0 lg:w-80">
              <ArticleSidebar />
            </div>
          </div>
        </Form>
      </AdminPageContainer>
    </>
  );
}
