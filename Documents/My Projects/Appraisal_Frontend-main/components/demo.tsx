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

import { useUser } from "@clerk/nextjs";

import { SortableFieldPreviewManager } from "./sortable-field-preview-manager";
import { useQuery } from "@tanstack/react-query";
import ScorecardRingProgress from "./score-card-progressbar/scoreCardProgressBar";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader2, ScrollText, Terminal } from "lucide-react";
import HorizontalLine from "./ui/horizontal";

interface FormPreviewManagerProps {
  id: string | number | {};
}

export function FormPreviewManager({ id }: any) {
  // const { formstate, updateFormState } = useFormState();
  //const clearFormFields = useFormStore((state) => state.clearFormFields);

  //console.log(id);

  const [show, setShow] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const { data, isLoading, isError, error } = useQuery({
    // IMPORTANT: The query key MUST include the dynamic `id`.
    // This ensures that if the `id` prop changes, react-query will
    // fetch the new data for that specific ID.
    queryKey: ["formAnswer", id],

    queryFn: async () => {
      // The `enabled` option below ensures this function only runs when `id` is truthy.
      try {
        const response = await fetch(`/api/get-answer/${+id}`);

        // Proper error handling: check if the network request itself failed.
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          );
        }

        const result = await response.json();

        // The query function should directly return the data you need.
        // react-query will handle the rest. This simplifies the logic.
        return result?.data?.users_answered?.question;
      } catch (err) {
        // Log the error for debugging and then re-throw it so that
        // react-query's `isError` and `error` states are correctly set.
        console.error(`Failed to fetch form answer for ID ${id}:`, err);
        throw err;
      }
    },
    // CRITICAL: This option prevents the query from running if `id` is null,
    // undefined, or an empty string, which avoids failed API calls.
    enabled: !!id,
    refetchInterval: 100,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  const reasonMessge = useQuery({
    queryKey: ["mesages"],
    queryFn: async () => {
      try {
        return await fetch(`/api/get-answer/${+id}`)
          .then((res: any) => res.json())
          .then((data: any) => {
            console.log(data.data);

            return data?.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
  // console.log(data);

  // let form_fields: any = [];

  // console.log(form_fields);

  const selector = (state: FormState) => ({
    formFields: (data as []) || state.formFields,
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
    //console.log({ data: values });

    //console.log(data);

    // formFields.map((data) => {
    //   console.log(data);
    // });

    try {
      setShow(true);
      // setScore(res.data.data);
      // scrollToElement();
      window.scroll(0, 0);

      //console.log(values);
      //updateFormState();

      await axios
        .post(`/api/submit-manager/${id}`, {
          values: data,
          result: values,
        })
        .then(async (res: any) => {
          console.log(res);
          // console.log(res.data);
          //  setisLoading(true);
          setShow(true);
          setScore(res.data.data);

          window.scroll(0, 0);
        });
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
    const formField = data.find(
      (field: { name: UniqueIdentifier }) => field.name === active.id
    );
    if (formField) {
      setActiveFormField(formField);
    }
  }

  const { user } = useUser();

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <>
        {" "}
        {show && (
          <div className="flex flex-col items-center justify-center h-50 w-auto  rounded-lg shadow-md bg-gray-100 p-4  ">
            <h1 className=" text-2xl font-bold text-gray-800 mb-1">
              Performance Scorecard
            </h1>
            <p className="mb-3 px-9 items-center justify-center text-gray-800">
              <strong>{user?.firstName}</strong>, You gave the appraisee the
              rating shown below. Please, the workflow has proceeded to the next
              authority for action.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <ScorecardRingProgress
                score={score}
                total={100}
                label="Overall Score"
              />
            </div>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-3/4 flex-col gap-6 p-4"
          >
            {reasonMessge?.data?.reasons && !show ? (
              <>
                {" "}
                <div>
                  <Alert variant="destructive">
                    <ScrollText className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      <div className="mb-3 mt-3">
                        {reasonMessge?.data?.appraisee_name} commented on your
                        last review to me and left the message below. Please
                        take action; else, resend the request.
                      </div>
                      <HorizontalLine />
                      <div className="bg-gray-500 rounded-md text-white p-2">
                        {" "}
                        {reasonMessge?.data?.reasons}{" "}
                      </div>
                      <HorizontalLine />
                    </AlertDescription>
                  </Alert>
                </div>
              </>
            ) : null}

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
              {isLoading ? (
                <Loader2 className="h-36 w-36 flex items-center justify-center mx-auto animate-spin" />
              ) : (
                <>
                  {data?.map((formField: FormField) => (
                    <SortableFieldPreviewManager
                      formField={formField}
                      form={form}
                      key={formField.name}
                    />
                  ))}
                </>
              )}

              <Button type="submit" className="w-full" disabled={show}>
                Submit
              </Button>
            </SortableContext>

            {/* <DragOverlay className="bg-background">
              {activeFormField ? <Field formField={activeFormField} /> : <></>}
            </DragOverlay> */}
          </form>
        </Form>
      </>
    </DndContext>
  );
}
