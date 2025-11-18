"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "./FormRadioGroupUI";

type RadioGroupProps = {
  label: string;
  value: string;
};

export const RadioCardGroupComp = () => {
  const [options, setOptions] = useState<RadioGroupProps[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const convertStringToSlug = (text: string) => {
    return text.toLowerCase();
  };

  const handleAddOption = () => {
    const currentValue = ref.current?.value;

    if (typeof currentValue === "string" && currentValue.length > 0) {
      const option = {
        value: convertStringToSlug(currentValue),
        label: currentValue,
      };

      setOptions((pre) => [...pre, option]);
      ref.current!.value = "";
    }
  };
  return (
    <div>
      <RadioCardGroup defaultValue="1" className="text-sm">
        {options.map(({ label, value }) => (
          <RadioCardItem
            value={value}
            className="flex items-center gap-3"
            key={value}
          >
            <RadioCardIndicator />
            <span>{label}</span>
          </RadioCardItem>
        ))}

        {/* <RadioCardItem value="2" className="flex items-center gap-3">
        <RadioCardIndicator />
        <span>Plarform Engineer</span>
      </RadioCardItem>
      <RadioCardItem value="3" className="flex items-center gap-3">
        <RadioCardIndicator />
        <span>Hardware Engineer</span>
      </RadioCardItem> */}
      </RadioCardGroup>
      <div className="flex flex-row mt-3  gap-1">
        <div>
          <Input
            //className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm/6"
            placeholder="option"
            className="w-full"
            ref={ref}
          />
        </div>
        <Button type="button" onClick={handleAddOption}>
          Add options{" "}
        </Button>
      </div>
    </div>
  );
};
