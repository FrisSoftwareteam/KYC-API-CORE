"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import NestedFieldsForm from "@/components/WorkflowComponenet";

export function WorkFlow() {
  const [show, setShow] = useState(false);
  const [disabledBttn, setDisableBtn] = useState(true);

  const schema = z.object({
    workflow: z
      .array(
        z.object({
          flowstructure: z.string({ message: "Required !" }),
          level: z.string({ message: "Required !" }),
        })
      )
      .min(1, { message: "Required !" }),
    title: z.string({ message: "Required !" }),
  });

  type Schema = z.infer<typeof schema>;

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      //   workflow: [
      //     {
      //       flowstructure: "",
      //       level: "",
      //     },
      //   ],
    },
  });

  const { mutate } = useMutation({
    mutationFn: (newFlow) =>
      axios
        .post("/api/approval-flow", {
          newFlow,
        })
        .then((res: any) => res.json()),
  });

  //   function onSubmit(input: Schema) {
  //     console.log(input);
  //     axios.post("/api/approval-flow", {
  //       input,
  //     });
  //   }

  function onSubmit(input: any) {
    console.log(input);
    // console.log(input.workflow.length);

    // let data = {
    //   input: input.workflow,
    // };

    // console.log(data);

    // for (const [key, value] of Object.entries(input.workflow)) {
    //   console.log(`${key}: ${value}`);
    // }

    // input.workflow.map((values: any) => {
    //   console.log(values);
    // });

    mutate(input);
  }

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "workflow",
  });

  const MIN = 1;
  const MAX = 5;

  return (
    <NestedFieldsForm />
    // <Card className="">
    //   <div className="flex flex-col items-center gap-4 sm:flex-row">
    //     <CardHeader className="w-full flex-col gap-4 space-y-0 sm:flex-row">
    //       <div className="flex flex-1 flex-col gap-1.5">
    //         <CardTitle>Appraisal Workflow </CardTitle>
    //         <CardDescription>
    //           Sort items &apos; workflow in the vertical direction.
    //         </CardDescription>
    //       </div>
    //       {fields.length < MAX ? (
    //         <Button
    //           type="button"
    //           variant="outline"
    //           size="sm"
    //           className="w-fit"
    //           onClick={() => {
    //             setShow(true);
    //             setDisableBtn(false);
    //             append({ flowstructure: "", level: "" });
    //           }}
    //         >
    //           Add workflow
    //         </Button>
    //       ) : (
    //         <Button
    //           type="button"
    //           variant="outline"
    //           size="sm"
    //           className="w-fit"
    //           disabled
    //         >
    //           Add workflow
    //         </Button>
    //       )}
    //     </CardHeader>
    //   </div>
    //   <CardContent>
    //     <NestedFieldsForm />

    //   </CardContent>
    // </Card>
  );
}
