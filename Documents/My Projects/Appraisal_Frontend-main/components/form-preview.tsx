"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";

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

import { SortableFieldPreview } from "@/components/sortable-field-preview";
import { Form } from "@/components/ui/form";

import { useUser } from "@clerk/nextjs";
import io from "socket.io-client";

import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ScorecardRingProgress from "./score-card-progressbar/scoreCardProgressBar";
import { Loader2 } from "lucide-react";
import { useGetUserProfile } from "@/zustand/store";
import { useRouter } from "next/navigation";

export function FormPreview({ id }: any) {
  // const { formstate, updateFormState } = useFormState();
  // const [questionId, setQuestionId] = React.useState("");
  const [data2, setData2] = React.useState([]);
  const [itemId, setItemId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  // Get the query client instance
  const queryClient = useQueryClient();

  const [show, setShow] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const socketRef: any = useRef(null);
  const { profile, getUserData, isloading, page, role } = useGetUserProfile();
  const { user, isLoaded } = useUser();
  const userEmail = profile?.email;

  const router = useRouter();

  const { push } = useRouter();
  //console.log(user?.emailAddresses[0]?.emailAddress);

  // const { data: dataUsers } = useQuery({
  //   queryKey: ["clerk-users7"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(
  //         `/api/get-user-info/${user?.emailAddresses[0]?.emailAddress}`
  //       )
  //         .then((res: any) => res.json())
  //         .then((data: any) => {
  //           console.log(data);
  //           setQuestionId(data?.data?.questionsId);
  //           return data?.data?.questionsId;
  //         });
  //     } catch (error) {
  //       // console.log(error);
  //     }
  //   },
  //   refetchInterval: 10,
  //   refetchIntervalInBackground: true,
  //   refetchOnWindowFocus: true,
  // });

  const { data: userInfo, isLoading: isLoadingUser } = useQuery({
    // The query key now includes the user's email to ensure it's unique per user.
    queryKey: ["userInfo", userEmail],
    queryFn: async () => {
      if (!profile.email) return null; // Don't fetch if there's no email.

      try {
        const response = await fetch(`/api/get-user-info/${profile?.email}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // The query itself now returns the data, which includes the ID.
        //console.log(data);
        return data?.data;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Let react-query handle the error state.
        throw error;
      }
    },
    // The query will only run if `isUserLoaded` and `userEmail` are truthy.
    //enabled: isLoaded && !!userEmail,
    // Refetching every 10ms is extremely aggressive.
    // Increased to 10 seconds (10000ms). Adjust as needed.
    enabled: !!profile?.email,
    refetchInterval: 100,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  const questionId = userInfo?.questionsId;

  console.log("Question ID:", questionId);

  // Query 2: Fetch the form fields/questions based on the questionId.
  // This is a "dependent query" because it relies on data from the first one.
  const { data = [], isLoading } = useQuery({
    // The query key includes the `questionId` to make it unique and
    // to automatically refetch when the `questionId` changes.
    queryKey: ["formFields", questionId],
    queryFn: async () => {
      // The `enabled` option below ensures `questionId` is valid before this runs.
      try {
        const response = await fetch(`/api/questions/${questionId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        return data?.data?.form_fields?.formFields;
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        throw error;
      }
    },
    // CRITICAL: The `enabled` option prevents this query from running
    // until the `questionId` has been successfully fetched.
    enabled: !!questionId,
  });

  const selector = (state: FormState) => ({
    formFields: state.formFields,
    setFormFields: state.setFormFields,
  });

  // useEffect(() => {
  //   formstate;
  // });

  const [activeFormField, setActiveFormField] =
    React.useState<FormField | null>(null);
  const { formFields, setFormFields } = useFormStore(useShallow(selector));

  const formSchema = React.useMemo(
    () => generateZodSchema(formFields),
    [formFields]
  );

  console.log(activeFormField, formSchema);
  const defaultValues = React.useMemo(
    () => generateDefaultValues(formFields),
    [formFields]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  //Scroll

  // const geeksForGeeksRef: any = useRef(null);

  // const scrollToElement = () => {
  //   if (geeksForGeeksRef.current) {
  //     geeksForGeeksRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const onSubmit = async (values: z.infer<any>) => {
    let data = { ...values, id };

    try {
      // console.log(values);
      // updateFormState();
      await axios
        .post(`/api/submit-answers/${profile?.email}`, {
          ...values,
          user: profile.name,
        })
        .then(async (res: any) => {
          console.log(res.data);
          setShow(true);
          setScore(res.data.data);
          // scrollToElement();
          window.scroll(0, 0);
          // console.log(res.data);
          //  setisLoading(true);
          ////  fetchData();
          setTimeout(() => {
            push("/users");
          }, 13000);

          //  toast(" 🤖 Task completed !");
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
        (field) => field.name === active.id
      );
      const newIndex = formFields.findIndex((field) => field.name === over.id);

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

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <>
        {" "}
        {show && (
          <div className="flex flex-col items-center justify-center h-50 w-300 rounded-lg shadow-md bg-gray-100 p-4  ">
            <h1 className=" text-2xl font-bold text-gray-800 mb-1">
              Performance Scorecard
            </h1>
            <p className="mb-3 px-9 items-center justify-center text-gray-800">
              <strong>{user?.firstName}</strong>, here's your performance. Your
              assignment had been forwarded to your supervisor for action.
              Please check your mailbox for updates, or revisit the portal.
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

            <SortableContext
              items={formFields?.map(
                (formField: { name: any }) => formField.name
              )}
              strategy={verticalListSortingStrategy}>
              {isLoading ? (
                <Loader2 className="h-36 w-36 flex items-center justify-center mx-auto animate-spin" />
              ) : (
                <>
                  {data?.map((formField: FormField) => (
                    <SortableFieldPreview
                      formField={formField}
                      form={form}
                      key={formField.name}
                    />
                  ))}
                </>
              )}

              <Button type="submit" disabled={show}>
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
