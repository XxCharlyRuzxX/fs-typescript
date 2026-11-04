import { isNegativeNumber, isNotNumber } from "./utils.ts";

interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateRating = (average: number, target: number): number => {
  if (average >= target) {
    return 3;
  }
  if (average >= target / 2) {
    return 2;
  }
  return 1;
};

const getRatingDescription = (rating: number): string => {
  if (rating === 3) {
    return "Good";
  }
  if (rating === 2) {
    return "Not too bad but could be better";
  }
  return "Bad";
};

export function calculateExercises(
  target: number,
  exercisesDays: number[],
): ExercisesResult {
  const periodLength = exercisesDays.length;
  const average =
    exercisesDays.reduce((acc, hours) => acc + hours, 0) / periodLength;
  const rating = calculateRating(average, target);

  return {
    periodLength,
    trainingDays: exercisesDays.filter((hours) => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription: getRatingDescription(rating),
    target,
    average,
  };
}

if (process.argv[1] === import.meta.filename) {
  const targetArgument = process.argv[2];
  const exercisesArguments = process.argv.slice(3);

  if (targetArgument === undefined || exercisesArguments.length === 0) {
    throw new Error("Target and exercise hours are required");
  }

  if (isNotNumber(targetArgument) || exercisesArguments.some(isNotNumber)) {
    throw new Error("All arguments must be numbers");
  }

  const target = Number(targetArgument);
  const exercisesDays = exercisesArguments.map(Number);

  if (isNegativeNumber(target) || target === 0) {
    throw new Error("Target must be positive");
  }

  if (exercisesDays.some((exercisesDay) => isNegativeNumber(exercisesDay))) {
    throw new Error("Exercise hours cannot be negative");
  }

  console.log(calculateExercises(target, exercisesDays));
}
