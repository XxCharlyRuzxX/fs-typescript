import { Box, Paper, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import type { ReactNode } from 'react';

import type { Diagnosis, Entry } from '../../types';
import HealthCheckEntryDetails from './components/HealthCheckEntryDetails';
import HospitalEntryDetails from './components/HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './components/OccupationalHealthcareEntryDetails';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (entry: never): never => {
  throw new Error(`Unsupported entry type: ${JSON.stringify(entry)}`);
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  let details: ReactNode;
  let Icon: typeof LocalHospitalIcon;

  switch (entry.type) {
    case 'Hospital':
      Icon = LocalHospitalIcon;
      details = <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
      break;
    case 'OccupationalHealthcare':
      Icon = WorkIcon;
      details = <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
      break;
    case 'HealthCheck':
      Icon = MedicalServicesIcon;
      details = <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
      break;
    default:
      return assertNever(entry);
  }

  return (
    <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon />
        <Typography variant="h6">{entry.type}</Typography>
      </Box>
      <Typography variant="body2">Date: {entry.date}</Typography>
      <Typography>{entry.description}</Typography>
      <Typography variant="body2">Specialist: {entry.specialist}</Typography>
      {details}
    </Paper>
  );
};

export default EntryDetails;
