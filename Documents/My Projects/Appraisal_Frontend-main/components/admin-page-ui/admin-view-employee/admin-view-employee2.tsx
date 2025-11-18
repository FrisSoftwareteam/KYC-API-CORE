"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Ambulance,
  Banknote,
  Contact,
  ContactRound,
  Gavel,
  GraduationCap,
  Library,
  PiggyBank,
} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import axios from "axios";

const FormSchema = z.object({
  workflow: z.string({
    required_error: "Please select a workflow",
  }),
  question: z.string({
    required_error: "Please select a workflow",
  }),
});

const ReadEmployee2 = ({ data }: any) => {
  // const { data } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(`/api/user/${cn}`)
  //         .then((res: any) => res.json())
  //         .then((data: any) => data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  // const flows = useQuery({
  //   queryKey: ["flow"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(`/api/get-flows`)
  //         .then((res: any) => res.json())
  //         .then((data: any) => {
  //           //  console.log(data);
  //           return data;
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  // console.log(flows);

  // const question = useQuery({
  //   queryKey: ["questionType"],
  //   queryFn: async () => {
  //     try {
  //       return await fetch(`/api/question-type`)
  //         .then((res: any) => res.json())
  //         .then((data: any) => {
  //           console.log(data.data);
  //           return data.data;
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  // });

  // const { mutate } = useMutation({
  //   mutationFn: (newFlow) =>
  //     axios
  //       .patch(`/api/submit-userflow/${cn}`, {
  //         newFlow,
  //       })
  //       .then((res: any) => res.json()),
  // });

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });

  // function onSubmit(data: any) {
  //   console.log(data);
  //   mutate(data);
  // }

  return (
    <>
      {" "}
      <Card className="w-auto">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          {" "}
          Employees Log(s)
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 flex flex-row text-gray-900">
                <Contact className="w-9 h-7" /> Employees Information.
              </h3>
              <p className="mt-1 max-w-2xl text-sm pb-4 leading-6 text-gray-500">
                The employees &apos; details are listed below.
              </p>
            </div>
            {/* <Form {...form}>
              <form onSubmit={form.handleSubmit()}> */}
            <ScrollArea className="h-[500px] border-t  border-blue-900">
              <Accordion type="single" collapsible className="w-full mt-2 p-4">
                <AccordionItem value="personal-info">
                  <AccordionTrigger>
                    {" "}
                    <div className="flex flex-row space-x-1 gap-2">
                      {" "}
                      <ContactRound /> Personal Information
                    </div>{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent>
                        <div className="mt-6 border-t border-gray-100">
                          <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-bold leading-6 text-gray-900">
                                ID
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.staff_id}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-bold leading-6 text-gray-900">
                                Full Name:
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {/* {data.nameonthedocument} */}
                                {data?.fullnames}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-bold leading-6 text-gray-900">
                                {" "}
                                Email Address
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.EmailAddress}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-bold leading-6 text-gray-900">
                                DOB
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.date_of_birth}
                              </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-bold leading-6 text-gray-900">
                                Gender
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.gender}
                              </dd>
                            </div>

                            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Attachments
                    </dt>
                  </div> */}
                          </dl>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="education">
                  <AccordionTrigger>
                    {" "}
                    <div className="flex flex-row space-x-1 gap-2">
                      {" "}
                      <Library /> Educational Information
                    </div>{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2  ">
                          <div className="mb-4 last:mb-0">
                            <div className="flex items-center mb-2">
                              <GraduationCap className="mr-2 h-4 w-4" />
                              <p className="font-semibold">
                                {data?.educational_qualification}
                              </p>
                            </div>

                            {/* <p className="text-sm text-muted-foreground">
                            {edu.year}
                          </p> */}
                          </div>

                          <div className="mb-4 last:mb-0">
                            <div className="flex items-center mb-2">
                              <GraduationCap className="mr-2 h-4 w-4" />
                              <p className="font-semibold">
                                {data?.additional_qualification}
                              </p>
                            </div>

                            {/* <p className="text-sm text-muted-foreground">
                            {edu.year}
                          </p> */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bank-info">
                  <AccordionTrigger>
                    {" "}
                    <div className="flex flex-row space-x-1 gap-2">
                      <Banknote />
                      Bank Information{" "}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-6 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            Bank Name :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* {data.nameonthedocument} */}
                            {data?.bank_name}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            {" "}
                            Account Number :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.bank_num}
                          </dd>
                        </div>

                        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Attachments
                    </dt>
                  </div> */}

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            {" "}
                            Pension Custodian :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.pfacustodian}
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            {" "}
                            Pension :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.pfa}
                          </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            {" "}
                            Pension Number:
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.pension_num}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* <Ambulance /> */}

                <AccordionItem value="health-info">
                  <AccordionTrigger>
                    {" "}
                    <div className="flex flex-row space-x-1 gap-2">
                      <Ambulance />
                      Health Information{" "}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-6 border-t border-gray-100">
                      <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            Genotype :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* {data.nameonthedocument} */}
                            {data?.genotype}
                          </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                          <dt className="text-sm font-bold leading-6 text-gray-900">
                            {" "}
                            Blood :
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.blood}
                          </dd>
                        </div>

                        {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-bold leading-6 text-gray-900">
                      Attachments
                    </dt>
                  </div> */}
                      </dl>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="appraial-info">
                  <AccordionTrigger>
                    {" "}
                    <div className="flex flex-row space-x-1 gap-2">
                      <Gavel />
                      Staff Promotion History{" "}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-6 border-t border-gray-100">
                      <Card className="border rounded-md p-5">
                        <CardDescription className="mb-5">
                          Please view below the records
                        </CardDescription>
                        {/* Table */}

                        {data?.lastdatepromoted}
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
            {/* </form>
            </Form> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReadEmployee2;
