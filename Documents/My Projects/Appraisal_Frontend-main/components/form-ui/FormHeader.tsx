"use client";
import React from "react";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormHeaderProps = {
  value: {
    title: string;
    description: string;
  };

  onChange: (value: FormHeaderProps["value"]) => void;
};

const FormHeader = ({ value, onChange }: FormHeaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>
            <Input
              type="text"
              placeholder={value.title}
              className="!border-none hover:!border-none focus:!border-none"
              onChange={handleChange}
              name="title"
            />
          </CardTitle>
          <CardDescription>
            <Input
              type="text"
              name="description"
              className="!border-none hover:!border-none focus:!border-none"
              placeholder="Form Description"
              onChange={handleChange}
            />
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="grid gap-4">Des</CardContent> */}
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default FormHeader;
