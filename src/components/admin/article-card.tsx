import { articleTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/common/image-placeholder';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { HoverPrefetchLink } from '../common/hover-prefetch-link';

type AdminArticleCardProps = {
  article: InferSelectModel<typeof articleTable>;
};

function getStatusStyle(status: string) {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'draft':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    case 'concept':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
  }
}

export function AdminArticleCard({ article }: AdminArticleCardProps) {
  const updatedDate = article.updatedAt
    ? formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })
    : 'Never';

  return (
    <HoverPrefetchLink href={`/admin/articles/${article.slug}`}>
      <Card className="h-full cursor-pointer transition hover:scale-102 hover:shadow-md">
        {/* Featured Image */}
        <div className="relative aspect-video">
          {article.featuredImage ? (
            <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
          ) : (
            <ImagePlaceholder className="aspect-video" size={48} />
          )}

          {/* Status Badge */}
          <span
            className={cn(
              'absolute top-2 right-2 rounded px-2 text-xs font-medium capitalize',
              getStatusStyle(article.status),
            )}
          >
            {article.status || 'draft'}
          </span>
        </div>

        <CardHeader className="pb-1">
          <CardTitle className="line-clamp-2 text-base">{article.title}</CardTitle>
          <div className="text-muted-foreground text-xs">
            <span>Updated {updatedDate}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className="line-clamp-2 text-xs">{article.description}</CardDescription>
        </CardContent>
      </Card>
    </HoverPrefetchLink>
  );
}
