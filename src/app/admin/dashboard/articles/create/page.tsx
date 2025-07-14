'use client';

import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { Send, Eye } from 'lucide-react';
import Link from 'next/link';
import { CreateArticleForm } from './article-form';
import { createArticle } from '@/actions/articles';
import { toast } from 'sonner';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import { CreateArticleData } from '@/schemas/articles';

export default function CreateArticlePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFormSubmit(data: CreateArticleData) {
    console.log(data);

    setIsSubmitting(true);
    const res = await createArticle(data);

    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    toast.success(res.data);
    setIsSubmitting(false);
  }

  return (
    <>
      <AdminPageHeader className="justify-between">
        {createBreadcrumb([
          { label: 'Articles', href: '/admin/dashboard/articles' },
          { label: 'Create', isCurrent: true },
        ])}
        <div className="space-x-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/admin/dashboard/articles/create">
              <Eye />
              <span>Preview</span>
            </Link>
          </Button>
          <Button size="sm" type="submit" form="article-form" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <>
                <Send />
                <span>Publish</span>
              </>
            )}
          </Button>
        </div>
      </AdminPageHeader>
      <AdminPageContainer className="space-y-4">
        <CreateArticleForm onSubmit={handleFormSubmit} />
      </AdminPageContainer>
    </>
  );
}
