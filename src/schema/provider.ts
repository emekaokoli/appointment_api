import { object, string, z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const validateProviders = object({
  name: string({ required_error: 'name is required' }),
  bio: string({
    required_error: 'bio is required',
  }),
  title: string({
    required_error: 'title is required',
  }),
}).openapi({
  example: {
    name: 'John Doe',
    bio: 'I am a software developer',
    title: 'Software Engineer',
  },
  description: 'Provider fields',
});

export type providerInput = {
  name: string;
  title: string;
  bio: string;
};

export type providerType = z.infer<typeof validateProviders>;
