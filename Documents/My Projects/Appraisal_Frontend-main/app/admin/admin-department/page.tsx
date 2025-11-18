"use client";

import AdminDepartmentLog from "@/components/admin-page-ui/admin-department-log/admin-department-log";
import AddDepartmentForm from "@/components/admin-page-ui/admin-department/admin-department";
import { ClearForm } from "@/components/clear-form";

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

export default function Page() {
  // const { formstate } = useFormState();

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    HR Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {/* Body  */}
        <div className="flex w-full flex-col gap-4 p-4 mt-4">
          <Tabs defaultValue="preview" className="flex-1">
            <div className="mx-auto flex w-full  flex-col gap-4 rounded-md border shadow-sm">
              <div className="flex items-center gap-1.5 border-b p-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                <ClearForm />
              </div>

              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-1">
                <TabsTrigger
                  value="preview"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Create Department
                </TabsTrigger>

                <TabsTrigger
                  value="department"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Deapartment Log(s)
                </TabsTrigger>
                {/* <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger> */}
              </TabsList>
              <TabsContent value="preview">
                {" "}
                <AddDepartmentForm />
              </TabsContent>
              <TabsContent value="department">
                {" "}
                <AdminDepartmentLog />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
