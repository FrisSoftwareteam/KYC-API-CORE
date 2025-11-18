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
import { Badge } from "@mantine/core";

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

export function renderFormFieldComponentViewers({
  formField,
  field,
}: RenderFormFieldComponentProps) {
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
                    value={formField.comments}
                    disabled
                    // onChange={(e) => {
                    //   // console.log(e.target.value);
                    //   formField.comments = e.target.value;
                    // }}
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
            disabled
            value={String(formField.default)}
          />
          <div className="flex items-end justify-end border-dotted ">
            <Card className="w-1/4 p-2">
              <CardContent>
                <div>You: {String(formField.default)}</div>
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
                  onValueChange={(e) => {
                    console.log("changed", e);
                    formField.hodInput = e;
                    field.onChange(e);
                  }}
                  //  defaultValue={formField?.hodInput as string}
                  defaultValue={formField?.hodInput as string}
                  // value={formField?.hodInput?.toString() as string}
                  disabled
                  // onChange={(e: any) => {
                  //   //  console.log(e.target?.value);
                  //   formField.hodInput = e.target?.value;
                  // }}
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
                    <Card className="h-full mt-6 bg-slate-600/65">
                      <CardContent className="p-4 h-full">
                        <div>
                          YOU: <strong>{String(formField.default)}</strong>
                          {/* <Badge color="dark">
                            {String(formField.default)}
                          </Badge> */}
                        </div>
                        <div>
                          HOD: <strong>{String(formField.hodInput)}</strong>
                          {/* <Badge color="lime"></Badge> */}
                        </div>
                      </CardContent>
                    </Card>
                    <div>
                      <Label>Comments</Label>
                      <Textarea
                        placeholder="Enter text here..."
                        className="w-full h-full resize"
                        defaultValue={""}
                        disabled

                        // onChange={(e) => {
                        //   // console.log(e.target.value);
                        //   formField.comments = e.target.value;
                        // }}
                      />
                    </div>
                  </div>
                </div>
                {formField.comments ? (
                  <div className="m-4 mt-5 flex flex-col p-3 w-full rounded-lg bg-black text-white font-bold">
                    HOD's Comment: {formField.comments}
                  </div>
                ) : null}
              </>
            </FormControl>
            <FormMessage />
          </FormItem>
        </>
      );
  }
}
