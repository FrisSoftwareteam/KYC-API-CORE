import React from "react";
import { FormChoice } from "./FormQuestionTypes";

import { Input } from "@/components/ui/input";
import { RadioCardGroupComp } from "./RadioButton";

type FormQuestionInputProp = {
  questionType: FormChoice;
};

const inputType = {
  text: <Input type="text" placeholder="text" />,
  "multiple-choice": <RadioCardGroupComp />,
} as Record<FormChoice, JSX.Element>;

const FormQuestionInput = ({ questionType }: FormQuestionInputProp) => {
  return inputType[questionType];
};

export default FormQuestionInput;
