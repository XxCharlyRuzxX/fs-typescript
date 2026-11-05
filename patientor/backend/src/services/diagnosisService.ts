import type { Diagnosis } from '../types.ts';
import diagnosisData from '../data/diagnoses.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};