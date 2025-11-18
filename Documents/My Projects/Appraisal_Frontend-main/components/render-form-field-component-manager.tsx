import type { ControllerRenderProps } from "react-hook-form";

import { FieldType, type FormField as FormFieldType } from "@/types/field";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Textarea } from "@/components/ui/textarea";
import { FormFieldWrapper } from "@/components/form-field-wrapper";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import HorizontalLine from "./ui/horizontal";
import { useState } from "react";
import { useAnswerStore, useGetAnswer } from "@/zustand/store";

interface RenderFormFieldComponentProps {
  formField: FormFieldType;
  field: ControllerRenderProps<
    {
      [x: string]: any;
    },
    string
  >;
}

// const data1 = { data: 4 };

export function renderFormFieldComponentManager({
  formField,
  field,
}: RenderFormFieldComponentProps) {
  const [getFieldId, setFieldId] = useState(0);
  const [getFieldAns, setFieldAns] = useState("");
  const { answer, getAnswers } = useGetAnswer();
  const { answers, addOrUpdateAnswer, clearAnswers } = useAnswerStore();

  switch (formField.type) {
    case FieldType.INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <>
            <Input
              placeholder={formField.placeholder}
              {...field}
              disabled
              value={String(formField.default)}
            />

            <div className="container mx-auto p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-1  flex-col-reverse">
                <div>
                  <Label>Comments</Label>
                  <Textarea
                    placeholder="Enter text here..."
                    className="w-full h-full resize"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      formField.comments = e.target.value;
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        </FormFieldWrapper>
      );
    case FieldType.TEXTAREA:
      return (
        <FormFieldWrapper {...formField}>
          <Textarea
            placeholder={formField.placeholder}
            className="resize-none"
            {...field}
            value={String(formField.default)}
          />
          <div className="flex items-end justify-end border-dotted ">
            <Card className="w-1/4 p-2">
              <CardContent>
                <div>User: {String(formField.default)}</div>
                <div>HOD: {String(formField.hodInput)}</div>
              </CardContent>
            </Card>
          </div>
        </FormFieldWrapper>
      );
    case FieldType.NUMBER_INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <Input placeholder={formField.placeholder} {...field} type="number" />
        </FormFieldWrapper>
      );

    case FieldType.RADIO_GROUP:
      return (
        <>
          <HorizontalLine className="mt-3" />

          <FormItem className="space-y-3">
            <FormLabel>{formField.label}</FormLabel>
            <FormControl>
              <>
                <RadioGroup
                  onValueChange={(e: any) => {
                    addOrUpdateAnswer({ id: formField.name, answer: e });
                    // getAnswers({ id: formField.name, answer: e });
                    formField.default = e;
                    field.onChange(e);
                  }}
                  defaultValue={formField?.default as string}
                  onChange={(e: any) => {
                    // setHodValue(e.target?.value);
                    //  formField.default = hodValue;
                    console.log(e);
                  }}
                  className="flex flex-col space-y-1">
                  {formField.choices.map((choice, idx) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
                      key={idx}>
                      <FormControl>
                        <RadioGroupItem value={choice.value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {choice.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
                {/* <HorizontalLine /> */}
                <div className="container mx-auto p-4 space-y-4 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Card className="h-full mt-6 bg-gradient-to-r from-green-400 to-blue-500">
                      <CardContent className="p-4 h-full">
                        <div className="font-bold">
                          User: {String(formField?.default)}
                        </div>
                        <div className="font-bold">HOD: {String("")}</div>
                      </CardContent>
                    </Card>
                    <div>
                      <Label>Comments</Label>
                      <Textarea
                        placeholder="Enter text here..."
                        className="w-full h-full resize"
                        onChange={(e) => {
                          // console.log(e.target.value);
                          formField.comments = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      );
  }
}
