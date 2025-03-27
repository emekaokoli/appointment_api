import moment from 'moment';
import { date, number, object, string, z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const registerUser = z.object({
  email: z.string().email().openapi({
    description: 'user email field',
    example: 'user@gmail.com',
  }),
  date_of_birth: z
    .string()
    .refine(
      (value) => {
        const parsedDate = moment(value, 'MM/DD/YYYY', true);
        return parsedDate.isValid();
      },
      { message: 'Invalid date format' }
    )
    .or(
      z.instanceof(Date).refine((value) => moment(value).isValid(), {
        message: 'Invalid date format',
      })
    )
    .openapi({
      description: 'user date of birth field',
      example: '01/01/1990',
    }),
  password: z.string().openapi({
    description: 'user password field',
    example: 'password123',
  }),
});

export const user = z.object({
  email: z.string().email().openapi({
    description: 'user email field',
    example: 'user@gmail.com',
  }),
  password: z.string().openapi({
    description: 'user password field',
    example: 'password123',
  }),
  user_id: z.number().openapi({
    description: 'user ID',
    example: 12345,
  }),
  date_of_birth: string().openapi({
    description: 'user date of birth field',
    example: '01/01/1990',
  }),
  created_at: z.string().openapi({
    description: 'user created at',
    example: '01/01/1990',
  }),
});
export const Omiteduser = z.object({
  email: z.string().email(),
  user_id: z.number(),
  date_of_birth: string(),
  created_at: z.string(),
});

export const LoginSchema = z
  .object({
    email: z.string().email().openapi({
      example: 'user@gmail.com',
      description: 'user email field',
    }),
    password: z.string().openapi({
      example: 'password123',
      description: 'user password field',
    }),
  })
  .openapi({
    example: {
      email: 'user@gmail.com',
      password: 'password123',
    },
    description: 'user login fields',
  });

const token = z.object({
  accessToken: z.string(),
});

export const providerResponse = object({
  provider_id: number(),
  name: string(),
  bio: string(),
  title: string(),
});

export const appointmentResponseSchema = object({
  appointment_id: number(),
  provider_id: number(),
  user_id: number(),
  start_time: string(),
  end_time: string(),
  reason_for_visit: string(),
  remark: string().optional(),
});

export const bookedSchema = object({
  appointment_id: number(),
  user_id: number(),
  start_time: string() || date(),
  end_time: string() || date(),
  reason_for_visit: string(),
});

export type Token = z.infer<typeof token>;
export type Registeration = z.infer<typeof registerUser>;
export type User = z.infer<typeof user>;
export type omittedUser = z.infer<typeof Omiteduser>;
export type loginUserType = z.infer<typeof LoginSchema>;
export type Appointment = z.infer<typeof appointmentResponseSchema>;
export type Provider = z.infer<typeof providerResponse>;
export type Booked = z.infer<typeof bookedSchema>;

export const RegisterResponseSchema = z.object({
  data: z.object({ user: Omiteduser }).openapi({
    example: {
      user: {
        email: 'user@example.com',
        user_id: 1,
        date_of_birth: '01/01/1990',
        created_at: '01/01/1990 ',
      },
    },
  }),
});

export const loginResponseSchema = z.object({
  data: z.object({ accessToken: string() }),
});
