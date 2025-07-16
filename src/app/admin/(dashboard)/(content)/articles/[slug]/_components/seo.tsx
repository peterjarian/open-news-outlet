'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { UpdateArticleData } from '@/schemas/articles';

export function SEO({ form }: { form: UseFormReturn<UpdateArticleData> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold md:text-2xl">SEO</h2>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="seoTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Title</FormLabel>
              <FormControl>
                <Input placeholder="SEO title for search engines" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SEO Description</FormLabel>
              <FormControl>
                <Textarea placeholder="SEO description for search engines" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
