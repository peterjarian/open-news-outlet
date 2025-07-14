'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateArticleDialog } from './create-article-dialog';
import { CreateArticleData } from '@/schemas/articles';
import { createArticle } from '@/actions/articles';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    <CreateArticleDialog onSubmit={handleCreateArticle} isSubmitting={isSubmitting}>
      <Button size="sm">
        <Plus />
        <span>Create</span>
      </Button>
    </CreateArticleDialog>
  );
}
