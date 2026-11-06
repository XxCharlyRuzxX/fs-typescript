import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartSpecial extends CoursePartBase , CoursePartWithDescription {
  requirements: ["nodejs", "jest"],
  kind: "special"
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBase ,CoursePartWithDescription{
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase ,CoursePartWithDescription{
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";


const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};


export default App;