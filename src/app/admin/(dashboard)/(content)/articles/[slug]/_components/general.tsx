'use client';

import { UpdateArticleData } from '@/schemas/articles';
import { TextEditor } from '@/components/admin/text-editor';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useArticle } from '@/hooks/use-article';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
export function General({ form }: { form: UseFormReturn<UpdateArticleData> }) {
  const { article, setChanged, setArticle } = useArticle();

  useEffect(() => {
    const subscription = form.watch((data) => {
      setChanged(true);

      setArticle({
        ...article,
        title: data.title ?? '',
        description: data.description ?? '',
        // @ts-expect-error: zod messes with the types
        content: data.content ?? null,
      });
    });

    return () => subscription.unsubscribe();
  }, [article, form, setArticle, setChanged]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold md:text-2xl">General</h2>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief summary of your article that will appear in previews and search results. Keep it concise and engaging to draw readers in."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <TextEditor content={article.content ?? undefined} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </div>
  );
}
