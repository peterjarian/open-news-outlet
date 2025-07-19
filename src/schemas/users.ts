import z from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  bylineName: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
  isPublicProfile: z.boolean().optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
