import z from 'zod';
import { SocialAccount } from '@/types';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  bylineName: z.string().optional(),
  image: z.url().optional(),
  isPublicProfile: z.boolean().optional(),
  socialPlatforms: z
    .array(
      z.object({
        id: z.number().optional(),
        platform: z.enum(SocialAccount),
        userId: z.string(),
      }),
    )
    .optional(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
