"use client";

import AdminAppraisalLog from "@/components/admin-page-ui/admin-appraisal-log/admin-appraisal-log";
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
import { UserButton } from "@clerk/nextjs";
import HRDashboard from "../admin-employee-dashboard/dashboard";
import AppraisalLogStatus from "./apprasialLogs";

export default function Page() {
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
        </header>
        {/* Body  */}

        <div className="flex w-full flex-col gap-4 p-4 mt-4">
          <HRDashboard>
            {/* <AppraisalLogStatus /> */}
            <AdminAppraisalLog />
          </HRDashboard>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
