import z from 'zod';

export const paginationSchema = z.object({
  limit: z.coerce.number().default(10),
  offset: z.coerce.number().default(0),
});
