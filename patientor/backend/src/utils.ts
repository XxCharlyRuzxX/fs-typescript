import { z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.string().min(1)
});

export type NewPatient = z.infer<typeof newPatientSchema>;
