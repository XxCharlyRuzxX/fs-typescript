import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService.ts';
import type { Entry, NonSensitivePatient, Patient } from '../types.ts';
import { type NewEntry, type NewPatient, newEntrySchema, newPatientSchema } from '../utils.ts';

const router = express.Router();

const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
  }
);

router.post(
  '/:id/entries',
  (req: Request<{ id: string }, unknown, NewEntry>, _res, next) => {
    try {
      newEntrySchema.parse(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  },
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry | { error: string }>) => {
    const entry = patientsService.addEntry(req.params.id, req.body);
    if (!entry) {
      res.status(404).send({ error: 'Patient not found' });
      return;
    }
    res.status(201).json(entry);
  }
);

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    res.json(
      patientsService.addPatient({
        ...req.body,
        entries: (req.body.entries ?? []) as Entry[]
      })
    );
  }
);

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
    return;
  }

  next(error);
};

router.use(errorMiddleware);

export default router;
