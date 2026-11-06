import { z } from 'zod';
import { HealthCheckRating } from './types.ts';

const baseEntrySchema = z.object({
  description: z.string().min(1),
  date: z.string().date(),
  specialist: z.string().min(1),
  diagnosisCodes: z.array(z.string()).optional()
});

export const newEntrySchema = z.discriminatedUnion('type', [
  baseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
  }),
  baseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({
      date: z.string().date(),
      criteria: z.string().min(1)
    })
  }),
  baseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string().min(1),
    sickLeave: z.object({
      startDate: z.string().date(),
      endDate: z.string().date()
    }).optional()
  })
]);

export const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(1),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.string().min(1),
  entries: z.array(z.object({
    id: z.string().min(1),
    description: z.string().min(1),
    date: z.string().date(),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional()
  })).optional()
});

export type NewPatient = z.infer<typeof newPatientSchema>;
export type NewEntry = z.infer<typeof newEntrySchema>;
