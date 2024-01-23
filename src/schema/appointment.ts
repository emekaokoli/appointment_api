import { generateSchema } from '@anatine/zod-openapi';
import { array, number, object, string, z } from 'zod';

export const appointmentSchema = object({
  body: object({
    user_id: number({
      required_error: 'Patient ID is required',
      invalid_type_error: 'Patient ID must be a number',
    }),
    provider_id: number({
      required_error: 'Provider ID is required',
      invalid_type_error: 'Provider ID must be a number',
    }),
    start_time: string({
      required_error: 'Start time is required',
      invalid_type_error: 'Start time must be a string',
    }),
    end_time: string({
      required_error: 'End time is required',
      invalid_type_error: 'End time must be a string',
    }),

    reason_for_visit: array(
      string({
        required_error: 'Reason for visit is required',
        invalid_type_error: 'Reason for visit must be a string',
      })
    ).default(['General Checkup', 'Blood test']),
    remark: string().nullable(),
  }),
});

export const usertId = object({
  user_id: number(),
});

export const providerId = object({
  provider_id: number(),
});

export const appointmentId = object({
  appointment_id: number(),
});

export type appointmentInput = {
  user_id: number;
  provider_id: number;
  start_time: string;
  end_time: string;
  reason_for_visit: Array<string[]>;
  remark: string | null;
};

export type appointmentType = z.infer<typeof appointmentSchema>;
export const createAppointmentSchema = generateSchema(appointmentSchema);
