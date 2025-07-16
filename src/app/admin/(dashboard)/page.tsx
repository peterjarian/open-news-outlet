import { AdminPageHeader } from '@/components/admin/page-header';
import { createBreadcrumb } from '@/components/ui/breadcrumb';

export default function Page() {
  return (
    <AdminPageHeader>{createBreadcrumb([{ label: 'Overview', isCurrent: true }])}</AdminPageHeader>
  );
}
