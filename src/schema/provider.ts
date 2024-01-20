import { z } from 'zod';

export const validateProviders = z.object({
  name: z.string({ required_error: 'name is required' }),
  bio: z.string({
    required_error: 'bio is required',
  }),
  title: z.string({
    required_error: 'title is required',
  }),
});

export type providerType = z.infer<typeof validateProviders>;
