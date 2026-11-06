import { useEffect, useState } from 'react';
import { Button, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import patientService from '../../services/patients';
import type { Diagnosis, Entry, Patient } from '../../types';
import EntryDetails from '../EntryDetails';
import AddEntryForm from '../AddEntryForm';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientInfo = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      try {
        setPatient(await patientService.getById(id));
      } catch {
        console.error('Patient could not be found');
      }
    };

    void fetchPatient();
  }, [id]);

  const addEntry = async (entry: Omit<Entry, 'id'>): Promise<void> => {
    if (!id) {
      throw new Error('Patient id is missing');
    }

    const createdEntry = await patientService.createEntry(id, entry);
    setPatient((currentPatient) => currentPatient
      ? { ...currentPatient, entries: currentPatient.entries.concat(createdEntry) }
      : currentPatient);
    setFormOpen(false);
  };

  if (!patient) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {patient.name}
      </Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      {patient.dateOfBirth && <Typography>Date of birth: {patient.dateOfBirth}</Typography>}
      <Typography>SSN: {patient.ssn}</Typography>
      {formOpen ? (
        <AddEntryForm diagnoses={diagnoses} onCancel={() => setFormOpen(false)} onSubmit={addEntry} />
      ) : (
        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Add New Entry
        </Button>
      )}
      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Entries
      </Typography>
      <List>
        {patient.entries.map((entry) => (
          <ListItem key={entry.id} disableGutters sx={{ display: 'block' }}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PatientInfo;
