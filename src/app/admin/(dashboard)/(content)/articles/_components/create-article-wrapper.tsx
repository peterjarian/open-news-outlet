'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateArticleData } from '@/schemas/articles';
import { createArticle } from '@/actions/articles';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/common/loading-spinner';
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateArticleForm } from './create-article-form';

export function CreateArticleWrapper() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleCreateArticle(article: CreateArticleData) {
    setIsSubmitting(true);
    const res = await createArticle(article);

    if (res.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.push(`/admin/dashboard/articles/${res.data!.slug}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          <span>Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create article</DialogTitle>
        </DialogHeader>
        <CreateArticleForm onSubmit={handleCreateArticle} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="create-article-form" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
