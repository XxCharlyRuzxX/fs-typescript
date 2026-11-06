import type { Entry, Patient , newPatient} from '../types.ts';
import patientsData from '../data/patients.ts';
import { v1 as uuid } from 'uuid';

type EntryWithoutId<T extends Entry = Entry> = T extends Entry ? Omit<T, 'id'> : never;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ ssn: _ssn, ...patient }) => patient);
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const addPatient = (newPatient: newPatient): Patient => {
  const id = uuid();
  const patient = { ...newPatient, id };
  patientsData.push(patient);
  return patient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
  const patient = patientsData.find(({ id }) => id === patientId);
  if (!patient) {
    return undefined;
  }
  const id = uuid();
  const newEntry: Entry = { ...entry, id };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
  addEntry
};