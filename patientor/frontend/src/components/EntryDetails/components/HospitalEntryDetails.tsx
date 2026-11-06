import { Typography } from '@mui/material';

import type { Diagnosis, Entry } from '../../../types';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
  entry: Extract<Entry, { type: 'Hospital' }>;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: Props) => (
  <>
    <Typography>Discharge date: {entry.discharge.date}</Typography>
    <Typography>Discharge criteria: {entry.discharge.criteria}</Typography>
    <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses} />
  </>
);

export default HospitalEntryDetails;
