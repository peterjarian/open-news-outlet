import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
});

export type LoginData = z.infer<typeof loginSchema>;

export const inviteUserSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export type InviteUserData = z.infer<typeof inviteUserSchema>;
