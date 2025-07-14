import { articleTable } from '@/lib/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImagePlaceholder } from '@/components/common/image-placeholder';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

type ArticleCardProps = {
  article: InferSelectModel<typeof articleTable>;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const publishedDate = article.publishedAt
    ? formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })
    : 'Draft';

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <Card className="cursor-pointer overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder className="rounded-none" size={60} />
          )}

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors duration-200">
            {article.title}
          </CardTitle>

          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <time dateTime={article.publishedAt?.toISOString()}>{publishedDate}</time>
            {article.status && article.status !== 'published' && (
              <>
                <span>•</span>
                <span className="text-amber-600 capitalize dark:text-amber-400">
                  {article.status}
                </span>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {article.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
