import { Typography } from '@mui/material';

import type { Diagnosis, Entry } from '../../../types';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
  entry: Extract<Entry, { type: 'HealthCheck' }>;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnoses }: Props) => (
  <>
    <Typography>Health check rating: {entry.healthCheckRating}</Typography>
    <DiagnosisCodes codes={entry.diagnosisCodes} diagnoses={diagnoses} />
  </>
);

export default HealthCheckEntryDetails;
