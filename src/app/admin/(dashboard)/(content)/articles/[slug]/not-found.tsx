import { HoverPrefetchLink } from '@/components/common/hover-prefetch-link';
import {
  NotFoundLayout,
  NotFoundLayoutActions,
  NotFoundLayoutDescription,
  NotFoundLayoutHeader,
} from '@/components/layout/not-found';
import { Button } from '@/components/ui/button';

export default function ArticleNotFound() {
  return (
    <NotFoundLayout>
      <NotFoundLayoutHeader>Article not found</NotFoundLayoutHeader>
      <NotFoundLayoutDescription>
        The article you&apos;re looking for doesn&apos;t exist.
      </NotFoundLayoutDescription>
      <NotFoundLayoutActions>
        <Button asChild>
          <HoverPrefetchLink href="/admin/articles">Go back</HoverPrefetchLink>
        </Button>
      </NotFoundLayoutActions>
    </NotFoundLayout>
  );
}
