import z from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;
