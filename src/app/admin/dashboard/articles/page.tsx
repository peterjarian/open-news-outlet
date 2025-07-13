import { AdminPageContainer } from '@/components/admin/container';
import { AdminPageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { createBreadcrumb } from '@/components/ui/breadcrumb';
import { Plus } from 'lucide-react';
import { HoverPrefetchLink } from '@/components/common/hover-prefetch-link';

export default function Page() {
  return (
    <>
      <AdminPageHeader className="justify-between">
        {createBreadcrumb([{ label: 'Articles', isCurrent: true }])}
        <Button size="sm" asChild>
          <HoverPrefetchLink href="/admin/dashboard/articles/create">
            <Plus />
            <span>Create</span>
          </HoverPrefetchLink>
        </Button>
      </AdminPageHeader>
      <AdminPageContainer>
        <p>Hello</p>
      </AdminPageContainer>
    </>
  );
}
