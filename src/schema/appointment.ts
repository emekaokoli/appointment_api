import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const appointmentSchema = z.object({
  body: z.object({
    patient_id: z.string({
      required_error: 'Patient ID is required',
      invalid_type_error: 'Patient ID must be a string',
    }),
    provider_id: z.string({
      required_error: 'Provider ID is required',
      invalid_type_error: 'Provider ID must be a string',
    }),
    start_time: z.string({
      required_error: 'Start time is required',
      invalid_type_error: 'Start time must be a string',
    }),
    end_time: z.string({
      required_error: 'End time is required',
      invalid_type_error: 'End time must be a string',
    }),

    reason_for_visit: z
      .array(
        z.string({
          required_error: 'Reason for visit is required',
          invalid_type_error: 'Reason for visit must be a string',
        })
      )
      .default(['General Checkup', 'Blood test']),
    remark: z.string().nullable(),
  }),
});

export type appointmentType = z.infer<typeof appointmentSchema>;
export const createAppointmentSchema = generateSchema(appointmentSchema);
