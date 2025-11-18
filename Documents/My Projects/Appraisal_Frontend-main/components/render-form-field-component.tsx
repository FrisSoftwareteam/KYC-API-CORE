// import { format } from "date-fns";
// import { CalendarIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

import { FieldType, type FormField as FormFieldType } from "@/types/field";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldWrapper } from "@/components/form-field-wrapper";

interface RenderFormFieldComponentProps {
  formField: FormFieldType;
  field: ControllerRenderProps<
    {
      [x: string]: any;
    },
    string
  >;
}

export function renderFormFieldComponent({
  formField,
  field,
}: RenderFormFieldComponentProps) {
  switch (formField.type) {
    case FieldType.INPUT:
      return (
        <FormFieldWrapper {...formField}>
          <Input
            placeholder={formField.placeholder}
            {...field}
            // onChange={(e) => {
            //   formField.default = e.target.value;
            //   console.log(formField.default, "Hello");
            // }}
            // onChange={(e) =>}
          />
        </FormFieldWrapper>
      );
    case FieldType.TEXTAREA:
      return (
        <FormFieldWrapper {...formField}>
          <Textarea
            placeholder={formField.placeholder}
            className="resize-none"
            {...field}
          />
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
        <FormItem className="space-y-3">
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={formField?.default?.toString() as string}
              //value={String(formField?.default)}
              //disabled
              className="flex flex-col space-y-1"
            >
              {formField.choices.map((choice, idx) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={idx}
                >
                  <FormControl>
                    <RadioGroupItem value={choice.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{choice.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      );
  }
}
