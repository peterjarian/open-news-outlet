import z from 'zod';

export const updateUserSchema = z.object({
  bylineName: z.string().optional(),
  image: z.instanceof(File).optional(),
  isPublicProfile: z.boolean().optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
