'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateArticleData, createArticleSchema } from '@/schemas/articles';

type CreateArticleFormProps = {
  onSubmit(data: CreateArticleData): void;
};

export function CreateArticleForm({ onSubmit }: CreateArticleFormProps) {
  const form = useForm<CreateArticleData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form id="create-article-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  className="min-h-64 sm:min-h-32 lg:min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
