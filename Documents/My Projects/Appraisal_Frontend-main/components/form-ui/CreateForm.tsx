"use client";

import { Card } from "@/components/ui/card";
import FormHeader from "./FormHeader";

import FormQuestion from "./FormQuestion";
// import { Switch } from "@/components/ui/switch";

type CardProps = React.ComponentProps<typeof Card>;

export function CreateForm({}: CardProps) {
  // const [form, setForm] = useState({});

  return (
    <>
      <div className="flex flex-col gap-3">
        <FormHeader
          value={{
            title: "Untitled Form",
            description: "",
          }}
          onChange={() => {}}
        />
        <FormQuestion />
        <FormQuestion />
      </div>
    </>
  );
}
