import axios from 'axios';
import { useState, type SyntheticEvent } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { HealthCheckRating, type Diagnosis, type Entry, type HealthCheckRating as HealthCheckRatingValue } from '../../types';

type NewEntry = Entry extends infer EntryType
  ? EntryType extends Entry
    ? Omit<EntryType, 'id'>
    : never
  : never;

interface Props {
  onCancel: () => void;
  onSubmit: (entry: NewEntry) => Promise<void>;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<Entry['type']>('HealthCheck');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(String(HealthCheckRating.Healthy));
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(undefined);

    const commonFields = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    let entry: NewEntry;
    switch (type) {
      case 'HealthCheck':
        entry = {
          ...commonFields,
          type,
          healthCheckRating: Number(healthCheckRating) as HealthCheckRatingValue,
        };
        break;
      case 'Hospital':
        entry = {
          ...commonFields,
          type,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        break;
      case 'OccupationalHealthcare':
        entry = {
          ...commonFields,
          type,
          employerName,
          sickLeave: sickLeaveStart || sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined,
        };
        break;
      default:
        return;
    }

    try {
      await onSubmit(entry);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.error;
        let details: string;
        if (Array.isArray(serverError)) {
          details = serverError.map((issue: { message?: string }) => issue.message ?? 'Invalid value').join(', ');
        } else if (typeof serverError === 'string') {
          details = serverError;
        } else {
          details = error.message;
        }
        setErrorMessage(details);
      } else {
        setErrorMessage('Could not add the entry.');
      }
    }
  };

  return (
    <form onSubmit={(event) => void addEntry(event)}>
      {errorMessage && <Typography color="error" role="alert">{errorMessage}</Typography>}
      <Select fullWidth value={type} onChange={(event) => setType(event.target.value as Entry['type'])}>
        <MenuItem value="HealthCheck">Health check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">Occupational healthcare</MenuItem>
      </Select>
      <TextField required label="Date" type="date" fullWidth value={date} onChange={({ target }) => setDate(target.value)} />
      <TextField required label="Description" fullWidth value={description} onChange={({ target }) => setDescription(target.value)} />
      <TextField required label="Specialist" fullWidth value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
      <FormControl fullWidth>
        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
        <Select<string[]>
          labelId="diagnosis-codes-label"
          multiple
          value={diagnosisCodes}
          label="Diagnosis codes"
          onChange={(event: SelectChangeEvent<string[]>) => setDiagnosisCodes(event.target.value as string[])}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} - {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {type === 'HealthCheck' && (
        <FormControl required fullWidth>
          <InputLabel id="health-check-rating-label">Health check rating</InputLabel>
          <Select
            labelId="health-check-rating-label"
            value={healthCheckRating}
            label="Health check rating"
            onChange={(event) => setHealthCheckRating(event.target.value)}
          >
            {Object.entries(HealthCheckRating).map(([label, rating]) => (
              <MenuItem key={rating} value={rating}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {type === 'Hospital' && (
        <>
          <TextField required label="Discharge date" type="date" fullWidth value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)} />
          <TextField required label="Discharge criteria" fullWidth value={dischargeCriteria} onChange={({ target }) => setDischargeCriteria(target.value)} />
        </>
      )}
      {type === 'OccupationalHealthcare' && (
        <>
          <TextField required label="Employer name" fullWidth value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
          <TextField label="Sick leave start" type="date" fullWidth value={sickLeaveStart} onChange={({ target }) => setSickLeaveStart(target.value)} />
          <TextField label="Sick leave end" type="date"  fullWidth value={sickLeaveEnd} onChange={({ target }) => setSickLeaveEnd(target.value)} />
        </>
      )}
      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Button color="secondary" variant="contained" type="button" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained">Add</Button>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
