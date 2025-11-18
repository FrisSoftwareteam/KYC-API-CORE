"use client";

import AdminFlowLog from "@/components/admin-page-ui/admin-flow-log/admin-flow.log";
import { WorkFlow } from "@/components/admin-page-ui/admin-workflow/admin-workflow";
import { UserAvatarMenu } from "@/components/Avatar/AvatarHeader";
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

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 p-2 shrink-0 items-center gap-2 bg-background">
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
          <UserAvatarMenu />
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
                  <div>Create WorkFlow</div>
                </TabsTrigger>

                <TabsTrigger
                  value="logs"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <div>WorkFlow Log(s)</div>
                </TabsTrigger>
                {/* <TabsTrigger
                  value="code"
                  className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger> */}
              </TabsList>
              <TabsContent value="preview" className="m-4 p-2">
                {" "}
                <WorkFlow />
              </TabsContent>
              <TabsContent value="logs" className="m-4 p-2">
                {" "}
                <AdminFlowLog />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
