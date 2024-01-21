import { generateSchema } from '@anatine/zod-openapi';
import { array, object, string, z } from 'zod';

export const appointmentSchema = object({
  body: object({
    patient_id: string({
      required_error: 'Patient ID is required',
      invalid_type_error: 'Patient ID must be a string',
    }),
    provider_id: string({
      required_error: 'Provider ID is required',
      invalid_type_error: 'Provider ID must be a string',
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

export const patientId = object({
  patient_id: string({
    required_error: 'Patient ID is required',
    invalid_type_error: 'Patient ID must be a string',
  }),
});

export const providerId = object({
  provider_id: string({
    required_error: 'Provider ID is required',
    invalid_type_error: 'Provider ID must be a string',
  }),
});

export const appointmentId = object({
  body: object({
    appointment_id: string({
      required_error: 'Appointment ID is required',
      invalid_type_error: 'Appointment ID must be a string',
    }),
  }),
});

export type appointmentInput = {
  patient_id: string;
  provider_id: string;
  start_time: string;
  end_time: string;
  reason_for_visit: Array<string[]>;
  remark: string | null;
};

export type appointmentType = z.infer<typeof appointmentSchema>;
export const createAppointmentSchema = generateSchema(appointmentSchema);
