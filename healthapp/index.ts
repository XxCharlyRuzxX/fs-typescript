import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import {
  isNegativeNumber,
  isNonPositiveNumber,
  isNotNumber,
  isZero,
} from "./utils.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  if (isNonPositiveNumber(Number(height)) || isZero(Number(height))) {
    return res.status(400).json({ error: "Height must be a positive number" });
  }

  if (isNonPositiveNumber(Number(weight)) || isZero(Number(weight))) {
    return res.status(400).json({ error: "Weight must be a positive number" });
  }

  return res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

interface ExercisesBody {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  const body = req.body as ExercisesBody;
  const dailyExercises = body?.daily_exercises;
  const target = body?.target;

  if (
    target === undefined ||
    dailyExercises === undefined ||
    dailyExercises.length === 0
  ) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNotNumber(target) || dailyExercises.some(isNotNumber)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  if (isNegativeNumber(target) || target === 0) {
    return res.status(400).json({
      error: "Target must be positive",
    });
  }

  if (dailyExercises.some((hours) => isNegativeNumber(hours))) {
    return res.status(400).json({
      error: "Exercise hours cannot be negative",
    });
  }

  return res.json(calculateExercises(target, dailyExercises));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
