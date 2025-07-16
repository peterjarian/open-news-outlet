'use client';

import { useArticle } from '@/hooks/use-article';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserIcon, Trash2Icon, ChevronDownIcon, CalendarIcon, ArchiveIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { archiveArticle, deleteArticle } from '@/actions/articles';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getStatusColor, getWordCount, calculateReadTime } from '@/lib/article';
import { ArticleStatus } from '@/lib/drizzle/schema';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ArticleSidebar() {
  const { article, setArticle, setChanged } = useArticle();
  const { data: session } = authClient.useSession();
  const [wordCount, setWordCount] = useState<number>();
  const [minutesToRead, setMinutesToRead] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    if (article.content) setWordCount(getWordCount(article.content));
  }, [article.content]);

  useEffect(() => {
    if (wordCount !== undefined) setMinutesToRead(calculateReadTime(wordCount));
  }, [wordCount]);

  const deadline = 'Dec 15, 2024';
  const isOverdue = false;

  async function handleArchive() {
    const res = await archiveArticle(article.id);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success('Archived article!');
    router.push('/admin/dashboard/articles');
  }

  async function handleDelete() {
    const res = await deleteArticle(article.id);

    if (res.error) {
      toast.error(res.error);
      return;
    }

    toast.success('Deleted article!');
    router.push('/admin/dashboard/articles');
  }

  async function handleStatusChange(status: ArticleStatus) {
    if (article.status === status) return;
    setArticle({ ...article, status });
    setChanged(true);
  }

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4 dark:bg-gray-950">
      <div className="space-y-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <div
                  aria-hidden
                  className={cn('h-2 w-2 rounded-full', getStatusColor(article.status))}
                />
                <span className="capitalize">{article.status}</span>
              </div>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
            {Object.entries(ArticleStatus).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                className="flex items-center gap-2"
                onSelect={() => handleStatusChange(value)}
              >
                <div aria-hidden className={cn('h-2 w-2 rounded-full', getStatusColor(value))} />
                <span className="capitalize">{value}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {/* Content Metrics */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Content Quality</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded bg-gray-50 p-2 text-center dark:bg-gray-900">
            <div className="font-medium">
              {wordCount === undefined ? <Skeleton className="mx-auto h-4 w-8" /> : wordCount}
            </div>
            <div className="text-muted-foreground text-xs">words</div>
          </div>
          <div className="rounded bg-gray-50 p-2 text-center dark:bg-gray-900">
            <div className="font-medium">
              {minutesToRead === undefined ? (
                <Skeleton className="mx-auto h-4 w-8" />
              ) : (
                `${minutesToRead} min`
              )}
            </div>
            <div className="text-muted-foreground text-xs">read time</div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Deadline & Workflow */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground">Deadline:</span>
          <span className={isOverdue ? 'font-medium text-red-600' : ''}>{deadline}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="text-muted-foreground h-4 w-4" />
          <span>
            {session?.user.name ? (
              session.user.name
            ) : (
              <Skeleton className="inline-block h-4 w-16" />
            )}
          </span>
          <span className="rounded bg-blue-100 px-1 py-0.5 text-xs text-blue-800">Editor</span>
        </div>
      </div>

      <Separator />

      {/* Administrative Actions */}
      <div className="space-y-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900"
            >
              <ArchiveIcon />
              <span>Archive</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Are you sure? This article will be archived and will no longer be visible to
                readers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="outline"
                className="border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900"
                onClick={handleArchive}
              >
                Archive
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2Icon />
              <span>Delete</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                Are you sure? This article will be permanently deleted.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Archive
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
