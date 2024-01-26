import { generateSchema } from '@anatine/zod-openapi';
import moment from 'moment';
import { date, number, object, string, z } from 'zod';

export const registerUser = z.object({
  email: z.string().email(),
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
    ),
  password: z.string(),
});

export const user = z.object({
  email: z.string().email(),
  password: z.string(),
  user_id: z.number(),
  date_of_birth: string(),
  created_at: z.string(),
});
export const Omiteduser = z.object({
  email: z.string().email(),
  user_id: z.number(),
  date_of_birth: string(),
  created_at: z.string(),
});

export const login = z.object({
  email: z.string().email(),
  password: z.string(),
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
  reason_for_visit: string()
});

export type Token = z.infer<typeof token>;
export type Registeration = z.infer<typeof registerUser>;
export type User = z.infer<typeof user>;
export type omittedUser = z.infer<typeof Omiteduser>;
export type loginUserType = z.infer<typeof login>;
export type Appointment = z.infer<typeof appointmentResponseSchema>;
export type Provider = z.infer<typeof providerResponse>;
export type Booked = z.infer<typeof bookedSchema>;

export const RegisterResponseSchema = generateSchema(
  z.object({
    data: z.object({ user: Omiteduser }),
  })
);
export const ProviderReponseSchema = generateSchema(providerResponse);
export const RegisterSchema = generateSchema(registerUser);
export const AppointmentResponseSchema = generateSchema(
  appointmentResponseSchema
);
export const UserSchema = generateSchema(Omiteduser);
export const loginSchema = generateSchema(login);
export const loginResponseSchema = generateSchema(
  z.object({
    data: z.object({ token }),
  })
);
