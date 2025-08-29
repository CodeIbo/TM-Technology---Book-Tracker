import { z } from 'zod';

export const BookCreate = z.object({
  title: z.string().min(1).max(200),
  author: z.string().min(1).max(200),
});

export const BookUpdateRead = z.object({
  read: z.boolean(),
});

export const BookRow = BookCreate.extend({
  id: z.number().int().positive(),
  read: z.boolean().default(false),
});

export type TBookCreate = z.infer<typeof BookCreate>;
export type TBookUpdateRead = z.infer<typeof BookUpdateRead>;
export type TBookRow = z.infer<typeof BookRow>;
