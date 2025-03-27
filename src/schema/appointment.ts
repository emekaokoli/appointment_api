import { array, number, object, string, z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const appointmentSchema = object({
  user_id: number().openapi({
    example: 1,
    description: 'The ID of the user making the appointment',
  }),
  provider_id: number().openapi({
    example: 1,
    description: 'The ID of the provider for the appointment',
  }),
  start_time: string().openapi({
    example: '2022-01-01T10:00:00Z',
    description: 'The start time of the appointment',
  }),
  end_time: string({
    required_error: 'End time is required',
    invalid_type_error: 'End time must be a string',
  }).openapi({
    example: '2022-01-01T11:00:00Z',
    description: 'The end time of the appointment',
  }),

  reason_for_visit: array(string()).openapi({
    example: ['General Checkup', 'Blood test'],
    description: 'The reason for the appointment',
  }),
  remark: string().nullable().openapi({
    example: 'Patient is feeling fine',
    description: 'Any additional remarks for the appointment',
  }),
}).openapi({
  example: {
    user_id: 1,
    provider_id: 2,
    start_time: '2023-04-10T10:00:00',
    end_time: '2023-04-10T11:00:00',
    reason_for_visit: ['General Checkup', 'Blood test'],
    remark: 'Patient is feeling fine',
  },
});

export const usertId = object({
  user_id: number(),
});

export const providerId = object({
  provider_id: number(),
});

export const appointmentId = object({
  appointment_id: string(),
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
