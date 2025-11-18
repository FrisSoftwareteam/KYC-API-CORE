"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "../ui/card";
import axios from "axios";

const formSchema = z.object({
  feedback: z.string(),
});

export default function FeedbackFrom({ id }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values, id);

      await axios
        .post(`/api/submit-manager-final/${id}`, {
          values: values,
          // result: values,
        })
        .then(async (res: any) => {
          console.log(res);
          // console.log(res.data);
          //  setisLoading(true);
          // setShow(true);
          //   setScore(res.data.data);
          window.scroll(0, 0);
        });
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <Card className="p-10">
          <CardContent>
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Recommendation for the employee</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex flex-col space-y-1"
                    >
                      {[
                        ["Promotion", "Promotion"],
                        [
                          "Salary Increase or Bonus",
                          "Salary Increase or Bonus",
                        ],
                        [
                          "Leadership Development Program/Training",
                          "Leadership Development Program",
                        ],
                      ].map((option, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem value={option[1]} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option[0]}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-7">
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
