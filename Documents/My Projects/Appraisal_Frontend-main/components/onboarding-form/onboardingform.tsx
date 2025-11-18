"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
// import { CardWithForm } from "./profileForm";
// import { useMaskito } from "@maskito/react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { MaskitoOptions } from "@maskito/core";

// import { Label as Labels } from "@/components/ui/label";

import { Avatar as Avatars, Text, Group } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

import classes from "./profileUser.module.css";
import "./profileuser.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import ShadcnDatePicker from "@/components/ui/calendar-picker/shadcn-date-picker";
//import { PhoneInput, getActiveFormattingMask } from "react-international-phone";
//import "react-international-phone/style.css";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { useFetchLga, useFetchState } from "@/zustand/store";
import { Ellipsis } from "lucide-react";

type Inputs = z.infer<typeof formSchema>;

// const FormDataSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   email: z.string().min(1, "Email is required").email("Invalid email address"),
//   country: z.string().min(1, "Country is required"),
//   street: z.string().min(1, "Street is required"),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   zip: z.string().min(1, "Zip is required"),

// });

//const MAX_FILE_SIZE = 5000000;

// function checkFileType(file: any) {
//   if (file?.name) {
//     const fileType = file.name.split(".").pop();
//     if (fileType === "docx" || fileType === "pdf") return true;
//   }
//   return false;
// }

const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
  religion: z.string(),
  martial: z.string(),
  gender: z.string(),
  datePicker: z.string().optional(),
  surname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  state: z.string(),
  lga: z.string(),
  othername: z.string().min(2, {
    message: "Please other name must be at least 2 characters.",
  }),
  // mobile: z.string().min(11, {
  //   message: "Username must be at least 2 characters.",
  // }),
  // address: z.string().min(1, {
  //   message: "no data",
  // }),

  // //       .transform((value, ctx) => {
  // //   const digitsOnlyMask: MaskitoOptions = {
  // //     mask: [
  // //       "+",
  // //       "2",
  // //       "3",
  // //       "4",
  // //       " ",
  // //       "(",
  // //       /\d/,
  // //       /\d/,
  // //       /\d/,
  // //       ")",
  // //       " ",
  // //       /\d/,
  // //       /\d/,
  // //       /\d/,
  // //       "-",
  // //       /\d/,
  // //       /\d/,
  // //       /\d/,
  // //       /\d/,
  // //       /\d/,
  // //     ],
  // //   };

  // //   const inputRef = useMaskito({ options: digitsOnlyMask });

  // //   //   const phoneNumber = parsePhoneNumber(value, {
  // //   //     defaultCountry: "NG",
  // //   //   });
  // //   //   if (!phoneNumber?.isValid()) {
  // //   //     ctx.addIssue({
  // //   //       code: z.ZodIssueCode.custom,
  // //   //       message: "Invalid phone number",
  // //   //     });
  // //   //     return z.NEVER;
  // //   //   }
  // //   //   return phoneNumber.formatInternational();
  // // }),
  // department: z.string({
  //   required_error: "Please select an email to display.",
  // }),
  // designation: z.string({
  //   required_error: "Please select an email to display.",
  // }),
  file: z.any().refine((file: any) => file?.length !== 0, "File is required"),
  //.refine((file: any) => file?.size < MAX_FILE_SIZE, "Max size is 5MB."),
  //.refine(
  // (file: any) => checkFileType(file),
  //  "Only .pdf, .docx formats are supported."
  // ),
});

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["firstName", "lastName", "email"],
  },
  {
    id: "Step 2",
    name: "Department",
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: "Step 3",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: "Step 4",
    name: "Address",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 5", name: "Complete" },
];

export default function FormDialog() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [preview, setPreview] = useState("");
  const [value, setValue] = useState<any>("");
  // const [stateOfOrigin, setStateOrigin] = useState("");
  // const [phone, _] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const delta = currentStep - previousStep;

  const { states, isloading, fetchData } = useFetchState();

  const { lgaData, fetchDataLga, isloadingLga } = useFetchLga();

  useEffect(() => {
    fetchData();

    // console.log(stateOfOrigin);
  }, []);

  // useEffect(() => {
  //   fetchDataLga(stateOfOrigin);
  // }, [stateOfOrigin]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // shouldFocusError: true,
    defaultValues: {
      religion: "",
      //address: "",
      file: "",
    },
  });
  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    form.reset();
  };

  // type FieldName = keyof Inputs;

  const next = async () => {
    // const fields = steps[currentStep].fields;
    // const output = await form.trigger(fields as FieldName[], {
    //   shouldFocus: true,
    // });

    //  if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  // interface PlaceAutocompleteProps {
  //   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  // }

  //const MAX_FILE_SIZE = 5000000;

  // function checkFileType(file: any) {
  //   if (file?.name) {
  //     const fileType = file.name.split(".").pop();
  //     if (fileType === "docx" || fileType === "pdf") return true;
  //   }
  //   return false;
  // }

  const chartData = [
    { browser: "safari", visitors: 10, fill: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       username: "",
  //       file: "",
  //       address: "",
  //       religion: "",
  //     },
  //   });

  //const fileRef = form.register("file");

  function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

  function onSubmit() {
    // function closeDialog() {}
    // let obj_1 = e;
    // let address = value;
    // let phones = phone;
    // let dob = date.toDateString();
    // // console.log({ ...e }, { address: value });
    // // console.log(e);
    // console.log({ ...obj_1, address, phones, dob });
    // const submitData = async (e: any) => {
    //   console.log(e);
    // };
    // I use sonner for toasts
  }

  //Place Autocomplete

  //   useEffect(() => {
  //     console.log(value);
  //   });

  //   parseAddress(value.label, function (err: any, addressObj: any) {
  //     console.log("Street: ", addressObj.street_address1);
  //     console.log("City: ", addressObj.city);
  //     console.log("State: ", addressObj.state);
  //     console.log("Zip: ", addressObj.postal_code);
  //     console.log("Country: ", addressObj.country);
  //   });

  // const digitsOnlyMask: MaskitoOptions = {
  //   mask: [
  //     "+",
  //     "2",
  //     "3",
  //     "4",
  //     " ",
  //     "(",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     ")",
  //     " ",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     "-",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //   ],
  // };

  // const inputRef = useMaskito({ options: digitsOnlyMask });

  // const GooglePlacesAutocompleteComponent = ({ ...field }) => {
  //   return (
  //     <div>
  //       <GooglePlacesAutocomplete
  //         apiKey="AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg"
  //         selectProps={{
  //           ...field,
  //           isClearable: true,
  //           defaultOptions: [{ value: "chocolate", label: "Chocolate" }],
  //         }}
  //       />
  //       {/* {error && <div style={{ color: "red" }}>{error.message}</div>} */}
  //     </div>
  //   );
  // };

  const fileRef = form.register("file");

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-10">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-1 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={index} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}

      <Form {...form}>
        <Card className="w-full border-none -mt-11 shadow-none">
          <ScrollArea className="h-[350px]  -mt-20 rounded-md ">
            <CardHeader>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide your personal details.
              </p>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              > */}

                {currentStep === 0 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <Group wrap="nowrap">
                        <Avatars
                          src={
                            preview
                              ? preview
                              : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                          }
                          size={200}
                          radius="md"
                        />
                        <div>
                          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                            Software engineer
                          </Text>

                          <Text fz="lg" fw={500} className={classes.name}>
                            ABIODUN SHEBU
                          </Text>

                          <Group wrap="nowrap" gap={10} mt={3}>
                            <IconAt
                              stroke={1.5}
                              size="1rem"
                              className={classes.icon}
                            />
                            <Text fz="xs" c="dimmed">
                              abiodun@firstregistrarsnigeria.com
                            </Text>
                          </Group>

                          {/* <Group wrap="nowrap" gap={10} mt={5}>
                            <IconPhoneCall
                              stroke={1.5}
                              size="1rem"
                              className={classes.icon}
                            />
                            {/* <Text fz="xs" c="dimmed">
                              +11 (876) 890 56 23
                            </Text> */}
                          {/* </Group> */}
                        </div>
                      </Group>
                      <div className="flex flex-1 justify-end">
                        {" "}
                        <ChartContainer
                          config={chartConfig}
                          className="mx-auto aspect-square max-h-[250px]"
                        >
                          <RadialBarChart
                            data={chartData}
                            endAngle={100}
                            innerRadius={80}
                            outerRadius={140}
                          >
                            <PolarGrid
                              gridType="circle"
                              radialLines={false}
                              stroke="none"
                              className="first:fill-muted last:fill-background"
                              polarRadius={[86, 74]}
                            />
                            <RadialBar dataKey="visitors" background />
                            <PolarRadiusAxis
                              tick={false}
                              tickLine={false}
                              axisLine={false}
                            >
                              <Label
                                content={({ viewBox }) => {
                                  if (
                                    viewBox &&
                                    "cx" in viewBox &&
                                    "cy" in viewBox
                                  ) {
                                    return (
                                      <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                      >
                                        <tspan
                                          x={viewBox.cx}
                                          y={viewBox.cy}
                                          className="fill-foreground text-4xl font-bold"
                                        >
                                          {chartData[0].visitors.toLocaleString()}
                                        </tspan>
                                        <tspan
                                          x={viewBox.cx}
                                          y={(viewBox.cy || 0) + 24}
                                          className="fill-muted-foreground"
                                        >
                                          Completed
                                        </tspan>
                                      </text>
                                    );
                                  }
                                }}
                              />
                            </PolarRadiusAxis>
                          </RadialBarChart>
                        </ChartContainer>
                      </div>
                    </div>

                    {/* <div className="flex flex-row justify-between">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={preview} />
                        <AvatarFallback>BU</AvatarFallback>
                      </Avatar>
                      <div> </div>
                    </div> */}

                    <div className="mt-3"></div>

                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field: { onChange } }) => {
                        return (
                          <FormItem>
                            <FormLabel required>Upload</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                placeholder="photo"
                                className="w-50 rounded-md"
                                {...fileRef}
                                onChange={(event: any) => {
                                  const { files, displayUrl } =
                                    getImageData(event);
                                  setPreview(displayUrl);
                                  onChange(files);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <div className="mt-7"></div>

                    <div className="mt-8"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Surname</FormLabel>

                            <FormControl>
                              <Input placeholder="surname" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>First Name</FormLabel>

                            <FormControl>
                              <Input placeholder="first name " {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="othername"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Other Name</FormLabel>

                            <FormControl>
                              <Input placeholder="othername" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-8"></div>
                    <div className="flex flex-col gap-2">
                      <div
                        className={cn(
                          false && "text-destructive mt-3",
                          true &&
                            'after:ml-0.5 after:text-destructive after:content-["*"]'
                        )}
                      >
                        Residential Address
                      </div>
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyCHs4Jwbs2CoI7u8NujfRVr4GkWR7cSPbg"
                        autocompletionRequest={{
                          componentRestrictions: {
                            country: ["ng"], //to set the specific country
                          },
                        }}
                        selectProps={{
                          //inputValue: ,
                          // val: `${value ? value : ""}`,

                          // onChange(newValue: any, actionMeta) {
                          //   setValue(newValue);

                          // },
                          isClearable: true,
                          defaultOptions: [
                            { value: "nigeria", label: "Nigeria" },
                          ],
                          // onChange(e) {
                          //   // console.log(e);
                          //   setValue(e?.label);
                          // },

                          defaultInputValue: value, //set default value
                          // onInputChange: (newVal: any) => {
                          //   setValue(newVal?.label);
                          //   console.log(value?.label);
                          // },
                          onChange: (e) => {
                            setValue(e?.label);
                          }, //save the value gotten from google
                          placeholder: "Input your Full Address",
                          // inputValue: `${value && value}`,
                          //value: value?.label,
                          styles: {
                            input: (provided) => ({
                              ...provided,
                              color: "black",
                            }),
                            option: (provided) => ({
                              ...provided,
                              color: "black",
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "black",
                            }),
                          },
                        }}
                      />
                    </div>

                    <div className="mt-8"></div>

                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="datePicker"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required className="text-md font-normal">
                              Date of Birth
                            </FormLabel>
                            <FormControl className="">
                              <ShadcnDatePicker
                                startYear={1930}
                                endYear={2030}
                                selected={date}
                                onSelect={setDate}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-1">
                        <div
                          className={cn(
                            false && "text-destructive mt-3 ",
                            true &&
                              'after:ml-0.5 after:text-destructive after:content-["*"]'
                          )}
                        >
                          Phone Number
                        </div>
                        {/* <PhoneInput
                          defaultCountry="ng"
                          defaultMask=".........."
                          value={phone}
                          onChange={(phone: any) => setPhone(phone)}
                        /> */}
                      </div>
                    </div>

                    <div className="mt-8"></div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="religion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Religion</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your religion" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Christianity">
                                  Christianity
                                </SelectItem>
                                <SelectItem value="Islam">Islam</SelectItem>
                                <SelectItem value="Hinduism">
                                  Hinduism
                                </SelectItem>
                                <SelectItem value="Buddhism">
                                  Buddhism
                                </SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Gender</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Others">Others</SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-9"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="martial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Martial Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your martial status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="window">Window</SelectItem>
                                <SelectItem value="windower">
                                  Windower
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>State of Origin</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                //field.onChange;
                                return fetchDataLga(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your states" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isloading ? (
                                  <div className="flex flex-row text-sm items-center">
                                    <Ellipsis className="size-9 animate-pulse" />{" "}
                                    <div>Loading</div>
                                  </div>
                                ) : (
                                  <>
                                    {states.map((item: any) => (
                                      <SelectItem
                                        value={item.state}
                                        key={item.id}
                                      >
                                        {item.state.toUpperCase()}
                                      </SelectItem>
                                    ))}
                                  </>
                                )}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lga"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Home Town(LGA)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your home town (LGA)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <>
                                  {isloadingLga ? (
                                    <div className="flex flex-row text-sm items-center">
                                      <Ellipsis className="size-9 animate-pulse" />{" "}
                                      <div>Loading</div>
                                    </div>
                                  ) : (
                                    <>
                                      {lgaData?.lga?.map((item: any) => (
                                        <SelectItem
                                          value={item.lga}
                                          key={item.id}
                                        >
                                          {item.lga.toUpperCase()}
                                        </SelectItem>
                                      ))}
                                    </>
                                  )}
                                </>
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FormField
                      control={form.control}
                      name="religion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Religion</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a the your religion" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Christianity">
                                Christianity
                              </SelectItem>
                              <SelectItem value="Islam">Islam</SelectItem>
                              <SelectItem value="Hinduism">Hinduism</SelectItem>
                              <SelectItem value="Buddhism">Buddhism</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-3"></div>

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel required>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mt-3"></div>

                    <div className="grid grid-cols-2 gap-1">
                      <div
                        className={cn(
                          false && "text-destructive mt-3",
                          true &&
                            'after:ml-0.5 after:text-destructive after:content-["*"]'
                        )}
                      >
                        Phone Number
                      </div>
                      {/* <PhoneInput
                        defaultCountry="ng"
                        defaultMask=".........."
                        value={phone}
                        onChange={(phone: any) => setPhone(phone)}
                      /> */}
                    </div>

                    <div className="grid grid-cols-2 gap-3 flex-grow"></div>

                    <Button type="submit">Submit</Button>
                  </motion.div>
                )}

                {/* <Controller
                  name="address"
                  rules={{
                    required: "This is a required field",
                  }}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <GooglePlacesAutocompleteComponent
                      {...field}
                      error={fieldState.error}
                    />
                  )}
                /> */}

                {/* </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                <div className="mt-3"></div>

                {/* <div className="grid grid-cols-3 gap-3 flex-grow">
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
                              <SelectValue placeholder="Select the department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}

                {/* </motion.div> */}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </ScrollArea>
        </Card>
      </Form>

      {/* <form className="-mt-8 py-2 " onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your personal details.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.street?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form> */}

      {/* Navigation */}
      <div className="mt-1 pt-1">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
