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
import { TextEditor } from '@/components/admin/text-editor';

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
      <form id="article-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Local community launches innovative green space project"
                  {...field}
                />
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
                  placeholder="In a bid to enhance urban livability and foster environmental stewardship, the local community has unveiled an innovative green space project. The initiative aims to transform underutilized land into vibrant, eco-friendly areas that promote recreation, biodiversity, and social engagement among residents."
                  className="min-h-64 sm:min-h-32 lg:min-h-24"
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
                <TextEditor content={field.value || ''} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
