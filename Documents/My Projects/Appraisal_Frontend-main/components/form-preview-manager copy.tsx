"use client";

import * as React from "react";

import { useFormStore } from "@/zustand/form";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/shallow";

import { FormField } from "@/types/field";
import { FormState } from "@/types/form-store";
import { generateDefaultValues, generateZodSchema } from "@/lib/form-schema";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { SortableFieldPreviewManager } from "./sortable-field-preview-manager";
import { useQuery } from "@tanstack/react-query";

export function FormPreviewManager({ id }: any) {
  // const { formstate, updateFormState } = useFormState();
  //const clearFormFields = useFormStore((state) => state.clearFormFields);

  // console.log(id);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["form_answers"],
    queryFn: async () => {
      try {
        return await fetch(`http://localhost:3000/operations/answer/${+id}`)
          .then((res: any) => res.json())
          .then((data: any) => data?.users_answered?.question);
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(data);

  let form_fields: any = [];

  console.log(form_fields);

  const selector = (state: FormState) => ({
    formFields: data || state.formFields,
    setFormFields: state.setFormFields,
  });

  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null);
  const { formFields, setFormFields } = useFormStore(useShallow(selector));

  console.log(activeFormField);

  const formSchema: any = React.useMemo(
    () => generateZodSchema(formFields || data),
    [formFields]
  );

  const defaultValues = React.useMemo(
    () => generateDefaultValues(formFields || data),
    [formFields]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  console.log(formSchema);

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const onSubmit = async (values: z.infer<any>) => {
    console.log({ data: values });

    // formFields.map((data) => {
    //   console.log(data);
    // });

    try {
      //console.log(values);
      //updateFormState();
      // await axios
      //   .post(`/api/submit-answers/${id}`, {
      //     values,
      //   })
      //   .then(async (res: any) => {
      //     // console.log(res.data);
      //     //  setisLoading(true);
      //     //  fetchData();
      //     //  push("/frontdesk/jobs");
      //     //  toast(" 🤖 Task completed !");
      //   });
    } catch (error) {
      console.log(error);
    }

    if (formFields.length === 0) {
      console.log("No Inputs..");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There are no form inputs currently. Please add form inputs",
      });
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-slate-950 p-4">
          <code className="overflow-auto text-white">
            {JSON.stringify(values, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formFields.findIndex(
        (field: { name: UniqueIdentifier }) => field.name === active.id
      );
      const newIndex = formFields.findIndex(
        (field: { name: UniqueIdentifier }) => field.name === over.id
      );

      setFormFields(arrayMove(formFields, oldIndex, newIndex));
    }
    setActiveFormField(null);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const formField = form_fields.find(
      (field: { name: UniqueIdentifier }) => field.name === active.id
    );
    if (formField) {
      setActiveFormField(formField);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <>
        {" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-3/4 flex-col gap-6 p-4"
          >
            {/* <Card >
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>
                      Deploy your new project in one-click.
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>
              </Card> */}

            <SortableContext
              items={formFields?.map(
                (formField: { name: any }) => formField.name
              )}
              strategy={verticalListSortingStrategy}
            >
              {data?.map((formField: FormField) => (
                <SortableFieldPreviewManager
                  formField={formField}
                  form={form}
                  key={formField.name}
                />
              ))}
            </SortableContext>
            {/* <DragOverlay className="bg-background">
              {activeFormField ? <Field formField={activeFormField} /> : <></>}
            </DragOverlay> */}
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </>
    </DndContext>
  );
}
