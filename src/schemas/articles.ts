import { ArticleStatus } from '@/lib/drizzle/schema';
import { JSONContent } from '@tiptap/core';
import z from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  content: z.custom<JSONContent>().optional(),
  status: z.enum([...(Object.values(ArticleStatus) as string[])]).optional(),
});

export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
