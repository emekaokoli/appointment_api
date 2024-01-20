import { string, z } from 'zod';

export const createUser = z.object({
  email: z.string({ required_error: 'email is required' }).email({
    message: 'invalid email address',
  }),
  date_of_birth: z
    .string({
      required_error: 'date_of_birth is required',
      invalid_type_error: 'date_of_birth must be a string',
    })
    .datetime({
      message: 'invalid date_of_birth',
    }),
  password: z.string({
    required_error: 'password is required',
  }),
});

export const user = z.object({
  email: z.string().email(),
  password: z.string(),
  user_id: z.string(),
  date_of_birth: string(),
  created_at: z.string(),
});

export type CreateUser = z.infer<typeof createUser>;
export type User = z.infer<typeof user>;
