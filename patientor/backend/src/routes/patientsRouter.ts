import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService.ts';
import type { Patient } from '../types.ts';
import { type NewPatient, newPatientSchema } from '../utils.ts';

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

router.get('/', (_req, res: Response<Omit<Patient, 'ssn'>[]>) => {
  res.send(patientsService.getPatients());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    res.json(patientsService.addPatient(req.body));
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
