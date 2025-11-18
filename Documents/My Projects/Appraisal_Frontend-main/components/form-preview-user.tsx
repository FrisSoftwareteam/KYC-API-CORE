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

import { useQuery } from "@tanstack/react-query";
import ScorecardRingProgress from "./score-card-progressbar/scoreCardProgressBar";
import axios from "axios";

import { SortableFieldPreviewConfirmation } from "./sortable-field-preview-confirmation";
import { usePDF } from "react-to-pdf";
import moment from "moment";
import Image from "next/image";
import { ReasonDialog } from "./dialog-reason";
import { Toaster } from "./ui/toaster";
import { Loader2 } from "lucide-react";
import { useGetUserProfile } from "@/zustand/store";
import { ReasonDialog2 } from "./dialog-accept";
import { useRouter } from "next/navigation";

export function FormPreviewUser({ id }: any) {
  // const { formstate, updateFormState } = useFormState();
  //const clearFormFields = useFormStore((state) => state.clearFormFields);

  const { profile, getUserData, isloading, page, role } = useGetUserProfile();

  // console.log(id);
  const { user } = useUser();

  const [show, setShow] = React.useState(true);
  const [disabledBtn, setDisableBtn] = React.useState(false);
  // const [imageShow, setImageShow] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const { push } = useRouter();

  const { toPDF, targetRef } = usePDF({
    filename: `${user?.firstName + " " + user?.lastName}_report.pdf`,
  });

  // const { data } = useQuery({
  //   queryKey: ["form_answer"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(`/api/get-answer/${+id}`)
  //         .then((res: any) => res.json())
  //         .then((data: any) => {
  //           //  console.log(data.data.users_answered);
  //           return data?.data?.users_answered;
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  const { data, isLoading, isError, error } = useQuery({
    // IMPORTANT: The query key MUST include the dynamic `id`.
    // This ensures that if the `id` prop changes, react-query will
    // fetch the new data for that specific ID.
    queryKey: ["formAnswer_view", id],

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
        return result?.data?.users_answered;
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

  const score_log = useQuery({
    queryKey: ["score_logs"],
    queryFn: async () => {
      try {
        return await fetch(`/api/getScoreLog/${+id}`)
          .then((res: any) => res.json())
          .then((data: any) => data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // console.log(score_log.data.score);

  // let form_fields: any = [];

  // console.log(form_fields);

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

      console.log(values);
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

  const accept = async () => {
    //console.log(`Accepted ${profile.email}`);
    return await axios
      .post(`/api/accept-result/${id}`, {
        value: true,
        user: `${profile?.email}`,
      })
      .then((res: any) => {
        //console.log(res.data);
        setDisableBtn(true);
      });
  };

  const handleReasonSubmit2 = async (reason: string) => {
    setDisableBtn(true);
    // console.log("Submitted reason:", reason);

    return await axios
      .post(`/api/accept-result/${id}`, {
        value: reason,
        user: `${profile?.email}`,
      })
      .then((res: any) => {
        //console.log(res.data);
        setTimeout(() => {
          push("/users");
        }, 9000);
        setDisableBtn(true);
      });
    // Here you can perform any action with the submitted reason,
    // such as sending it to an API or updating the application state
  };

  const handleReasonSubmit = async (reason: string) => {
    setDisableBtn(true);
    //  console.log("Submitted reason:", reason);

    return await axios
      .post(`/api/reject-result/${id}`, {
        value: reason,
        user: user?.id,
      })
      .then((res: any) => {
        // console.log(res.data);
        setTimeout(() => {
          push("/users");
        }, 13000);
      });
    // Here you can perform any action with the submitted reason,
    // such as sending it to an API or updating the application state
  };

  // console.log();

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <>
        {" "}
        {show && (
          <>
            <div className="flex flex-col items-center justify-center h-50 w-auto  rounded-lg shadow-md bg-gray-100 p-4  ">
              <h1 className=" text-2xl font-bold text-gray-800 mb-1">
                Confirmation
              </h1>
              <p className="mb-3 px-9 items-center justify-center text-gray-800">
                <strong>{profile?.name}</strong>, You have been appraised by
                your appraisor and the rating shown below. Kindly accept or
                reject the review, as the case may be.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <ScorecardRingProgress
                  score={score_log?.data?.data?.score || 0}
                  total={100}
                  label="Overall Score"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-2">
              {/* <Button
                className="w-44 bg-lime-600 hover:bg-lime-800"
                onClick={accept}
                disabled={disabledBtn}>
                Accept
              </Button> */}

              <ReasonDialog2
                triggerText="Accept"
                disabled={disabledBtn}
                title="Provide a reason for the acceptance"
                description="Please state the reason for this action."
                onSubmit={handleReasonSubmit2}
              />
              {/* <Button
                className="w-44  bg-red-700 hover:bg-red-900"
                onClick={reject}
              >
                Reject
              </Button> */}

              <ReasonDialog
                triggerText="Reject"
                disabled={disabledBtn}
                title="Provide a Reason"
                description="Please state the reason for this action."
                onSubmit={handleReasonSubmit}
              />
              <Toaster />

              <Button
                onClick={async () => {
                  try {
                    // setImageShow(true);
                    toPDF();
                  } catch (error) {
                  } finally {
                    //setImageShow(false);
                  }
                }}>
                Download PDF
              </Button>
            </div>
          </>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-3/4 flex-col gap-6 p-4"
            ref={targetRef}>
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
            {/* 
            {imageShow && (
              <>
                {" "}
                <div className="flex flex-row space-x-4  mt-5 mb-7">
                  {" "}
                  <Image alt="Logo" src="/logo_bg.png" width={50} height={15} />
                  <div className="align-baseline">
                    {" "}
                    This a report of {user?.firstName} {user?.lastName} as at{" "}
                    {moment(new Date()).format("DD-MM-YYYY")}{" "}
                  </div>
                </div>{" "}
              </>
            )} */}

            <SortableContext
              items={formFields?.map(
                (formField: { name: any }) => formField.name
              )}
              strategy={verticalListSortingStrategy}>
              {/* {data?.map((formField: FormField) => (
                <SortableFieldPreviewConfirmation
                  formField={formField}
                  form={form}
                  key={formField.name}
                />
              ))} */}

              {isLoading ? (
                <Loader2 className="h-36 w-36 flex items-center justify-center mx-auto  animate-spin" />
              ) : (
                <>
                  {data?.map((formField: FormField) => (
                    <SortableFieldPreviewConfirmation
                      formField={formField}
                      form={form}
                      key={formField.name}
                    />
                  ))}
                </>
              )}

              {/* <Button type="submit" className="w-full">
                Save
              </Button> */}
            </SortableContext>
            {/* <DragOverlay className="bg-background">
              {activeFormField ? <Field formField={activeFormField} /> : <></>}
            </DragOverlay> */}
            {/* <Button type="submit">Save</Button> */}
          </form>
        </Form>
      </>
    </DndContext>
  );
}
