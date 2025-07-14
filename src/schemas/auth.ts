import z from 'zod';

export const loginSchema = z.object({
  email: z.email(),
});

export type LoginData = z.infer<typeof loginSchema>;
