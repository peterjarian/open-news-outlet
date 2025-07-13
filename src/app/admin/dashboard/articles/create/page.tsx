import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CreateArticleForm } from './article-form';

export default function CreateArticlePage() {
  return (
    <>
      <AdminPageHeader className="justify-between">
        {createBreadcrumb([
          { label: 'Articles', href: '/admin/dashboard/articles' },
          { label: 'Create', isCurrent: true },
        ])}
        <Button size="sm" asChild>
          <Link href="/admin/dashboard/articles/create">
            <Plus />
            <span>Create</span>
          </Link>
        </Button>
      </AdminPageHeader>
      <AdminPageContainer>
        <CreateArticleForm />
      </AdminPageContainer>
    </>
  );
}
