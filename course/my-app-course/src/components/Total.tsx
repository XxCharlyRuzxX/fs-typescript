export const Total = ({ courseParts }: { courseParts: { name: string; exerciseCount: number }[] }) => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
      <p>
        Number of exercises: {totalExercises}
      </p>
  );
}