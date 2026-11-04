import { isNotNumber, isNegativeNumber, isZero } from "./utils.ts";

export function calculateBmi(height: number, weight: number) {
  const bmi = weight / (height / 100) ** 2;
  const clasification = () => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi <= 24.9) {
      return "Normal";
    } else if (bmi <= 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  };
  return `${clasification()} range`;
}

if (process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);

  if (!height || !weight) {
    throw new Error("Both height and weight are required");
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error("Height and weight must be numbers");
  }

  if (isNegativeNumber(Number(height)) || isZero(Number(height))) {
    throw new Error("Height must be a positive number");
  }

  if (isNegativeNumber(Number(weight)) || isZero(Number(weight))) {
    throw new Error("Weight must be a positive number");
  }

  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
}
