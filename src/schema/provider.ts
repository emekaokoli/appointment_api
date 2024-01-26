import { generateSchema } from '@anatine/zod-openapi';
import { object, string, z } from 'zod';

export const validateProviders = object({
  name: string({ required_error: 'name is required' }),
  bio: string({
    required_error: 'bio is required',
  }),
  title: string({
    required_error: 'title is required',
  }),
});

export type providerInput = {
  name: string;
  title: string;
  bio: string;
};

export type providerType = z.infer<typeof validateProviders>;
export const ProviderSchema = generateSchema(validateProviders);
