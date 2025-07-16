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
  content: z.custom<JSONContent>(),
});

export type UpdateArticleData = z.infer<typeof updateArticleSchema>;
