import z from 'zod';
import { SocialAccount } from '@/types';

export const updateUserSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim() !== '', {
      message: 'Name cannot be empty',
    }),
  bylineName: z.string().nonempty().optional(),
  image: z.instanceof(File).optional(),
  isPublicProfile: z.boolean().optional(),
  socialPlatforms: z
    .array(
      z.object({
        id: z.number().optional(),
        platform: z.enum(SocialAccount),
        userId: z.string(),
      }),
    )
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: 'Social platforms cannot be an empty array',
    }),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
