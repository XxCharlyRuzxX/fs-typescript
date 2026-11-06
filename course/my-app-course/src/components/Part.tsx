import type { CoursePart } from "../App";

interface PartProps {
  part: CoursePart;
}

export const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
