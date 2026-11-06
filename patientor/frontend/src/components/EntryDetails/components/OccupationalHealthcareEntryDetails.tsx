import { Typography } from '@mui/material';

import type { Diagnosis, Entry } from '../../../types';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
  entry: Extract<Entry, { type: 'OccupationalHealthcare' }>;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: Props) => (
  <>
    <Typography>Employer: {entry.employerName}</Typography>
    {entry.sickLeave && (
      <Typography>
        Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </Typography>
    )}
    <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses} />
  </>
);

export default OccupationalHealthcareEntryDetails;
