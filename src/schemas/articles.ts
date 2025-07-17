import { ArticleStatus } from '@/types';
import { JSONContent } from '@tiptap/core';
import z from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.custom<JSONContent>().optional(),
  seoTitle: z.string().min(1, 'Title is required').optional(),
  seoDescription: z.string().min(1, 'Description is required').optional(),
  status: z.enum([...(Object.values(ArticleStatus) as string[])]).optional(),
  featuredImage: z.instanceof(File).optional().nullable(),
});

export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
