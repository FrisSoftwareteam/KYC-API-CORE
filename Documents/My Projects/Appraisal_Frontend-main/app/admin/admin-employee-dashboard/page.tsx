"use client";

import AdminEmployeeDashboard from "@/components/admin-page-ui/admin-employee-dashboard/admin-employee-dashboard";
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

import { useFormState } from "@/zustand/store";
import { UserButton } from "@clerk/nextjs";
import HRDashboard from "./dashboard";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
import DataTable2 from "@/components/datatable/data-table copy";

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
        <div className="flex w-full flex-col min-h-screen ">
          <HRDashboard content="Employees Details">
            {" "}
            <DataTable2 />
          </HRDashboard>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
