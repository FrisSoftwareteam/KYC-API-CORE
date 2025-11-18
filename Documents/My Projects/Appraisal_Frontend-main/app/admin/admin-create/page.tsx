"use client";

import Admindatatable from "@/components/admin-page-ui/admin-datatable";
import { ClearForm } from "@/components/clear-form";
import { EditFormField } from "@/components/edit-form-field";
import { FormEditor } from "@/components/form-editor";
import { SidebarLeft } from "@/components/ui-form/sidebar-left";
import { SidebarRight } from "@/components/ui-form/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useFormState } from "@/zustand/store";
import { UserButton } from "@clerk/nextjs";
import HRDashboard from "../admin-employee-dashboard/dashboard";
import { Clock } from "lucide-react";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";

export default function Page() {
  const { formstate } = useFormState();

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 p-2 shrink-0 items-center gap-2 bg-background z-50">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    HR Project Management & Task
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* <UserButton /> */}
          <UserAvatarMenu />
        </header>
        {/* Body  */}

        <div className="flex w-full flex-col  mt">
          <HRDashboard content="Task for  Appriasal Form creation">
            {/* <div className="flex flex-1 flex-col gap-4 p-4 mt-4">
              <Tabs defaultValue="preview" className="flex-1">
                <div className="mx-auto flex w-full  flex-col gap-4 rounded-md border shadow-sm">
                  <div className="flex items-center gap-1.5 border-b p-4">
                    <ClearForm />
                  </div>
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-1">
                    <TabsTrigger
                      value="preview"
                      className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                      {formstate ? (
                        <>Preview</>
                      ) : (
                        <>Create</>
                        // <div className="flex  flex-row gap-2">
                        //   {" "}
                        //   <NotebookPen className="size-5" /> <div>Form </div>
                        // </div>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="formlog"
                      className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                      Appraisal Form Log(s)
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview">
                    {" "}
                    <FormEditor />{" "}
                  </TabsContent>

                  <TabsContent value="formlog">
                    {" "}
                    <Admindatatable />{" "}
                  </TabsContent>
                </div>
              </Tabs>
              <EditFormField />
            </div> */}

            <Tabs defaultValue="create" className="w-full p-8">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 bg-slate-100 p-1">
                <TabsTrigger
                  value="create"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Create Appraisal Form
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Appraisal Form Log(s)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="mt-8">
                <div className="w-auto">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 mb-8">
                    <p className="text-slate-700 text-lg">
                      Please provide the form/appraisal description and assign
                      it to the appropriate department.
                    </p>
                  </div>
                  <FormEditor />{" "}
                  {/* <div className="space-y-8">
                    <div className="space-y-3">
                      <Label
                        htmlFor="form-title"
                        className="text-base font-semibold text-slate-700"
                      >
                        Form Title
                      </Label>
                      <Input
                        id="form-title"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Enter form title"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="form-description"
                        className="text-base font-semibold text-slate-700"
                      >
                        Form Description
                      </Label>
                      <Textarea
                        id="form-description"
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full min-h-[140px] resize-none border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        placeholder="Enter form description"
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label
                          htmlFor="department"
                          className="text-base font-semibold text-slate-700"
                        >
                          Department
                        </Label>
                        <Select
                          value={department}
                          onValueChange={setDepartment}
                        >
                          <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hr" className="hover:bg-blue-50">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                Human Resources
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="engineering"
                              className="hover:bg-emerald-50"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                Engineering
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="marketing"
                              className="hover:bg-purple-50"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                Marketing
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="sales"
                              className="hover:bg-orange-50"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                Sales
                              </div>
                            </SelectItem>
                            <SelectItem
                              value="finance"
                              className="hover:bg-red-50"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                Finance
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-700">
                          Expiration
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-12 justify-start text-left font-normal border-slate-200 hover:bg-slate-50",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-3 h-5 w-5 text-blue-500" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                      >
                        Submit Form
                      </Button>
                    </div>
                  </div> */}
                </div>
              </TabsContent>

              <TabsContent value="logs" className="mt-8">
                <div className="text-center py-16 bg-gradient-to-br from-slate-50 rounded-xl border border-slate-200">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-slate-600 text-lg">
                    Appraisal form logs will be displayed here.
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    <Admindatatable />{" "}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </HRDashboard>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
