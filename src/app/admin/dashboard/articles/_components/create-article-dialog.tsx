import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateArticleData } from '@/schemas/articles';
import { ReactNode } from 'react';
import { CreateArticleForm } from './create-article-form';
import { LoadingSpinner } from '@/components/common/loading-spinner';

type CreateArticleDialogProps = {
  onSubmit(values: CreateArticleData): void;
  children: ReactNode;
  isSubmitting: boolean;
};

export function CreateArticleDialog({
  onSubmit,
  children,
  isSubmitting,
}: CreateArticleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create article</DialogTitle>
        </DialogHeader>
        <CreateArticleForm onSubmit={onSubmit} />
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
