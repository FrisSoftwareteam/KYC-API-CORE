import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormChoice, FormQuestionTypes } from "./FormQuestionTypes";

import FormQuestionInput from "./FormQuestionInput";

const FormQuestion = () => {
  const [questionType, setQuestionType] = useState<FormChoice>("text");

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {" "}
            <Input
              type="text"
              placeholder={"Questions"}
              className="!border-none hover:!border-none focus:!border-none"
              // onChange={handleChange}
              name="title"
            />
          </CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between gap-3">
            <div className="w-full">
              <FormQuestionInput questionType={questionType} />
            </div>

            <FormQuestionTypes
              value={questionType}
              onChange={setQuestionType}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default FormQuestion;
