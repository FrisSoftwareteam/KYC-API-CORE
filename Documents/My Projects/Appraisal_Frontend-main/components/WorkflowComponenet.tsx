"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PlusCircle, Trash2, GripVertical, ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Sample data for the select options
const ALL_OPTIONS = [
  { id: "1", value: "Supervisor/ Unit Head", label: "Supervisor/ Unit Head" },
  { id: "2", value: "Departmental Head", label: "Departmental Head" },
  { id: "3", value: "Divisonal Head", label: "Divisonal Head" },
  { id: "4", value: "Group Head", label: "Group Head" },
  { id: "5", value: "Appraisal Committee", label: "Appraisal Committee" },
];

const ALL_LEVEL = [
  { id: "1", value: "1", label: "1" },
  { id: "2", value: "2", label: "2" },
  { id: "3", value: "3", label: "3" },
  { id: "4", value: "4", label: "4" },
  { id: "5", value: "5", label: "5" },
];

// Define Zod schema for validation
const fieldArraySchema = z.object({
  id: z.string(),
  level: z.string().min(1, "Level is required"),
  flowstructure: z.string().min(1, "Option selection is required"),
});

const formSchema = z.object({
  // title: z.string(),
  workflow: z.array(fieldArraySchema).min(1),
  title: z.string({ message: "Required !" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NestedFieldsForm() {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflow: [{ id: "1", level: "", flowstructure: "" }],
    },
  });

  // Use useFieldArray to handle the array of fields
  const { fields, append, remove, move, update } = useFieldArray({
    control: form.control,
    name: "workflow",
  });

  // Update selectedOptions whenever form values change
  useEffect(() => {
    const values = form.getValues().workflow || [];

    // const valuesLevel = form.getValues().workflow || [];

    const options = values
      .map((item) => item.flowstructure)
      .filter((option) => option !== "");
    setSelectedOptions(options);

    const optionsLevel = values
      .map((item) => item.level)
      .filter((option) => option !== "");
    setSelectedLevels(optionsLevel);
  }, [form.watch("workflow")]);

  const addFieldArray = () => {
    const newId = String(fields.length + 1);
    append({ id: newId, level: "", flowstructure: "" });
  };

  const removeFieldArray = (index: number) => {
    remove(index);
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverItem(index);
  };

  const handleDragEnd = () => {
    if (
      draggedItem !== null &&
      dragOverItem !== null &&
      draggedItem !== dragOverItem
    ) {
      move(draggedItem, dragOverItem);
    }

    // Reset drag state
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const { mutate } = useMutation({
    mutationFn: (newFlow) =>
      axios
        .post("/api/approval-flow", {
          newFlow,
        })
        .then((res: any) => res.json()),
  });

  const onSubmit = (data: FormValues) => {
    setIsConfirmDialogOpen(true);
    console.log(data);
  };

  const handleConfirmSubmit = () => {
    const data: any = form.getValues();
    console.log("Form submitted with data:", data);
    // Here you would typically send the data to your backend
    setIsConfirmDialogOpen(false);

    mutate(data);

    // You could add a success message or redirect here
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appraisal Workflow</CardTitle>
              <CardDescription>
                {" "}
                Sort items &apos; workflow in the vertical direction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name={"title"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workflow Title</FormLabel>
                    <FormControl>
                      <Input className="h-8" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {fields.map((field, index) => {
                // Get available options for this array by filtering out options already selected in other arrays
                // But allow the current array's selected option to remain available
                const currentValue =
                  form.getValues().workflow[index]?.flowstructure || "";
                const availableOptions = ALL_OPTIONS.filter(
                  (option) =>
                    !selectedOptions.includes(option.value) ||
                    option.value === currentValue
                );

                const currentValueLevel =
                  form.getValues().workflow[index]?.level || "";
                const availableOptionsLevel = ALL_LEVEL.filter(
                  (option) =>
                    !selectedLevels.includes(option.value) ||
                    option.value === currentValueLevel
                );

                // const availableOptionsLevel = ALL_LEVEL.filter(
                //   (option) =>
                //     !selectedOptions.includes(option.value) ||
                //     option.value === currentValue
                // );

                const isDragging = draggedItem === index;
                const isDragOver = dragOverItem === index;

                return (
                  <div
                    key={field.id}
                    className={`p-4 border rounded-md relative ${
                      isDragging ? "opacity-50" : ""
                    } ${isDragOver ? "border-dashed border-primary" : ""}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFieldArray(index)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-[auto_1fr] gap-4">
                      <div className="flex flex-col items-center justify-center cursor-move">
                        <GripVertical className="h-6 w-6 text-muted-foreground" />
                        {index < fields.length - 1 && (
                          <ArrowDown className="h-6 w-6 text-primary mt-2" />
                        )}
                      </div>

                      <div className="grid gap-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">
                            Workflows Chain of Command
                          </span>
                        </div>

                        {/* <FormField
                          control={form.control}
                          name={`workflow.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}

                        <FormField
                          control={form.control}
                          name={`workflow.${index}.level`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Level</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableOptionsLevel.length > 0 ? (
                                    availableOptionsLevel.map((option) => (
                                      <SelectItem
                                        key={option.id}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="no-options" disabled>
                                      No options available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`workflow.${index}.flowstructure`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select Designation</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableOptions.length > 0 ? (
                                    availableOptions.map((option) => (
                                      <SelectItem
                                        key={option.id}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="no-options" disabled>
                                      No options available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={addFieldArray}
                disabled={fields.length >= ALL_OPTIONS.length}
                className="flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Field Array
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this form? Please review your data
              before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[300px] overflow-y-auto border rounded-md p-4">
            <h4 className="font-medium mb-2">Form Data Summary:</h4>
            <ul className="space-y-2">
              {form.getValues().workflow.map((array, index) => (
                <li key={array.id} className="border-b pb-2 last:border-b-0">
                  <strong>Field Array {index + 1}:</strong>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Name:</span>
                    <span className="text-sm">{array.level}</span>
                    <span className="text-sm text-muted-foreground">
                      Selected Option:
                    </span>
                    <span className="text-sm">
                      {ALL_OPTIONS.find(
                        (opt) => opt.value === array.flowstructure
                      )?.label || array.flowstructure}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit}>Confirm Submission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
