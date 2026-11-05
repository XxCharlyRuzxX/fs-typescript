import type { Patient , newPatient} from '../types.ts';
import patientsData from '../data/patients.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patientsData.map(({ ssn: _ssn, ...patient }) => patient);
};

const addPatient = (newPatient: newPatient): Patient => {
  const id = uuid();
  const patient = { ...newPatient, id };
  patientsData.push(patient);
  return patient;
};

export default {
  getPatients,
  addPatient
};