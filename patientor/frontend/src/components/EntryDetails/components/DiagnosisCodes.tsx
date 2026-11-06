import { Typography } from '@mui/material';

import type { Diagnosis } from '../../../types';

interface Props {
  codes?: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisCodes = ({ codes, diagnoses }: Props) => {
  if (!codes || codes.length === 0) {
    return null;
  }

  return (
    <Typography variant="body2">
      Diagnosis codes:{' '}
      {codes.map((code) => {
        const diagnosis = diagnoses.find(({ code: diagnosisCode }) => diagnosisCode === code);
        return `${code} ${diagnosis?.name ?? 'Unknown diagnosis'}`;
      }).join(', ')}
    </Typography>
  );
};

export default DiagnosisCodes;
