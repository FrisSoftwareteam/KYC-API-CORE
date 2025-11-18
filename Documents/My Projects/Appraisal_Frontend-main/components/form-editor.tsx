"use client";

import * as React from "react";

import { useFormStore } from "@/zustand/form";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/shallow";

import { FormField } from "@/types/field";
import { FormState } from "@/types/form-store";
import { generateDefaultValues, generateZodSchema } from "@/lib/form-schema";
// import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { Field } from "@/components/field";
import { SortableField } from "@/components/sortable-field";
import { Form } from "@/components/ui/form";
import { EditFormField } from "@/components/edit-form-field";

import FormTitle from "./form-titile";

import { useFormId, useFormState } from "@/zustand/store";
import axios from "axios";

const selector = (state: FormState) => ({
  formFields: state.formFields,
  setFormFields: state.setFormFields,
});

export function FormEditor() {
  const { formstate } = useFormState();
  const clearFormFields = useFormStore((state) => state.clearFormFields);

  const { formId } = useFormId();

  // useEffect(() => {
  //   formstate;
  // });

  console.log(clearFormFields);

  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null);
  const { formFields, setFormFields } = useFormStore(useShallow(selector));

  const formSchema = React.useMemo(
    () => generateZodSchema(formFields),
    [formFields]
  );

  console.log(formSchema);

  const defaultValues = React.useMemo(
    () => generateDefaultValues(formFields),
    [formFields]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const onSubmit = async (values: z.infer<any>) => {
    // clearFormFields;
    console.log(formFields);

    try {
      console.log(values);
      //updateFormState();
      await axios
        .post(`/api/create-question`, {
          formFields,
          formId,
        })
        .then(async (res: any) => {
          // console.log(res.data);
          //  setisLoading(true);
          //  fetchData();
          //  push("/frontdesk/jobs");
          //  toast(" 🤖 Task completed !");
        });
    } catch (error) {
      console.log(error);
    }

    // if (formFields.length === 0) {
    //   console.log("No Inputs..");
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description:
    //       "There are no form inputs currently. Please add form inputs",
    //   });
    // }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] overflow-auto rounded-md bg-slate-950 p-4">
    //       <code className="overflow-auto text-white">
    //         {JSON.stringify(values, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = formFields.findIndex(
        (field) => field.name === active.id
      );
      const newIndex = formFields.findIndex((field) => field.name === over.id);

      setFormFields(arrayMove(formFields, oldIndex, newIndex));
    }
    setActiveFormField(null);
  }

  // useEffect(() => {
  //   clearFormFields;
  // },[]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!formstate ? (
        <>
          {/* <div className="p-10 w-11/12 mx-auto my-10 rounded-md border-dashed border-2 border-black bg-gray-400 text-white">
            <div className="flex items-center text-black justify-center">
              {" "}
              There are no form inputs. Please click the appropriate form fields
              on the right-side sidebar.{" "}
            </div>
          </div> */}

          <div className="w-full">
            <FormTitle />
          </div>
        </>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto flex w-3/4 flex-col gap-6 p-4">
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
              <EditFormField />
              <SortableContext
                items={formFields.map((formField) => formField.name)}
                strategy={verticalListSortingStrategy}>
                {formFields.map((formField) => (
                  <SortableField
                    formField={formField}
                    form={form}
                    key={formField.name}
                  />
                ))}
              </SortableContext>
              <DragOverlay className="bg-background">
                {activeFormField ? (
                  <Field formField={activeFormField} />
                ) : (
                  <></>
                )}
              </DragOverlay>
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </>
      )}
    </DndContext>
  );
}
