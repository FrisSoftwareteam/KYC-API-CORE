"use client";

// import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";

import { useFormState, useFormId } from "@/zustand/store";
import axios from "axios";

const formSchema = z.object({
  form_title: z.string(),
  form_description: z.string(),
  department: z.string(),
  expiration: z.coerce.date(),
});

export default function FormTitle() {
  const { formstate, updateFormState } = useFormState();

  const { formId, getFormId } = useFormId();

  console.log(formstate, formId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name_8933316088: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      updateFormState();

      axios
        .post(`/api/create-form`, {
          values,
        })
        .then(async (res: any) => {
          // console.log(res.data);
          const form_id = res.data;
          await getFormId(form_id);
          //  setisLoading(true);
          //  fetchData();
          //  push("/frontdesk/jobs");
          //  toast(" 🤖 Task completed !");
        });
    } catch (error) {
      console.error("Form submission error", error);
      //  toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-3/4 flex-col gap-6 p-4"
      >
        <FormField
          control={form.control}
          name="form_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-slate-700">
                Form Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  className="w-full h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="form_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-slate-700">
                Form Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  {...field}
                  className="w-full min-h-[140px] resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6 mt-2">
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiration</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
